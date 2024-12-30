import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { InventoryRecordRequest } from 'src/app/models/inventoryRecordRequest.model';
import { AlertController } from '@ionic/angular';
import { Category } from '../../models/Category.model';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @ViewChild('cancelModal') cancelModal: IonModal | undefined;
  @ViewChild('finishModal') finishModal: IonModal | undefined;
  @ViewChild('productModal') productModal: IonModal | undefined;
  @ViewChild('productDetailsModal') productDetailsModal: IonModal | undefined; 
  @ViewChild('deleteProductModal') deleteProductModal: IonModal | undefined; 

  expandedOption: string | null = null;
  selectedProducts: Product[] = [];
  selectedProduct: Product | null = null;
  categories: Category[] = [];
  noProductsMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertController: AlertController,
    private categoryService: CategoryService,

  ) {}

  
  ngOnInit() {
    this.selectedProducts = this.productService.getTemporaryProducts();

    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log('Załadowane kategorie:', this.categories.map(cat => cat.name)); 
      },
      (error) => {
        console.error('Błąd ładowania kategorii:', error);
        this.showAlert('Nie udało się załadować kategorii.', 'Błąd');
      }
    );
  }

  toggleSubOptions(option: string) {
    this.expandedOption = this.expandedOption === option ? null : option;
  }

  openProductModal(category: string) {
    const categoryId = this.getCategoryIdByName(category);
    if (categoryId === undefined) {
      this.showAlert('Nieprawidłowa kategoria.', 'Brak produktów');
      return;
    }
  
    this.productService.getProductsByCategory(categoryId).subscribe(
      (products) => {
        const cachedProducts = this.productService.getTemporaryProducts();
  
        // Połącz dane z pamięci podręcznej z produktami pobranymi z API
        this.selectedProducts = products.map(product => {
          const cachedProduct = cachedProducts.find(p => p.id === product.id);
          return cachedProduct ? { ...cachedProduct } : product;
        });
  
        if (this.selectedProducts.length > 0) {
          this.productModal?.present();
        } else {
          this.showAlert('Brak produktów w tej kategorii.', 'Informacja');
        }
      },
      (error) => {
        console.error('Błąd ładowania produktów:', error);
        this.showAlert('Nie udało się załadować produktów.', 'Błąd');
      }
    );
  }
  
  
  
  
  // Metoda do pobierania ID kategorii na podstawie jej nazwy
  getCategoryIdByName(categoryName: string): number | undefined {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.id : undefined;
  }

  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }

  saveProducts() {
    const productsToSave = this.productService.getTemporaryProducts(); // Pobranie tymczasowych produktów
    
    console.log('Produkty do zapisania:', productsToSave);
  
    if (productsToSave.length === 0) {
      this.showAlert('Brak produktów do zapisania.', 'Informacja');
      return;
    }
  
    // Dodajemy wszystkie produkty do pamięci, aby były gotowe do zapisania
    this.productService.addTemporaryProducts(productsToSave); // Przekazujemy całą tablicę produktów
  
    console.log('Produkty zapisane w pamięci podręcznej:', productsToSave);
  
    // Zamknięcie modala, jeśli istnieje
    if (this.productModal) {
      this.productModal.dismiss();
    } else {
      console.warn('Modal nie został zainicjalizowany.');
    }
  }
  
  openProductDetailsModal(product: Product) {
    this.selectedProduct = product; 
    if (this.productDetailsModal) {
      this.productDetailsModal.present();
    }
  }

  closeProductDetailsModal() {
    this.selectedProduct = null; 
    if (this.productDetailsModal) {
      this.productDetailsModal.dismiss();
    }
  }

  confirmDeleteProduct() {
    if (this.selectedProduct) {
      const alert = this.alertController.create({
        header: 'Potwierdź',
        message: `Czy na pewno chcesz usunąć produkt "${this.selectedProduct.name}"?`,
        buttons: [
          {
            text: 'Anuluj',
            role: 'cancel',
          },
          {
            text: 'Usuń',
            handler: () => this.deleteProduct(),
          },
        ],
      });
      alert.then(a => a.present());
    }
  }

  deleteProduct() {
    if (this.selectedProduct) {
      const index = this.selectedProducts.findIndex(p => p.id === this.selectedProduct!.id);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
      this.closeProductDetailsModal();
      this.showAlert('Produkt został usunięty.', 'Sukces');
    }
  }

  closeDeleteProductModal() {
    if (this.deleteProductModal) {
      this.deleteProductModal.dismiss();
    }
  }

  // Funkcje związane z anulowaniem inwentaryzacji
  confirmCancelInventory() {
    if (this.cancelModal) {
      this.cancelModal.present();
    }
  }

  cancelInventory() {
    this.selectedProducts = [];
    this.router.navigate(['/select-inv-cat']);
    if (this.cancelModal) {
      this.cancelModal.dismiss();
    }
  }

  // Funkcje związane z zakończeniem inwentaryzacji
  confirmFinishInventory() {
    if (this.finishModal) {
      this.finishModal.present();
    }
  }

  finishInventory() {
    const temporaryProducts = this.productService.getTemporaryProducts();
  
    if (temporaryProducts.length === 0) {
      this.showAlert('Brak produktów do zapisania.', 'Błąd');
      return;
    }
    const uniqueProducts = temporaryProducts.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id && t.unit === value.unit
      ))
    );
    // Mapowanie produktów do formatu InventoryRecordRequest[]
    const inventoryRecords: InventoryRecordRequest[] = temporaryProducts
      .filter(product => product.id !== undefined)  // Filtrujemy produkty, które mają id
      .map(product => ({
        productId: product.id!,  // Używamy operatora '!' aby powiedzieć, że id na pewno istnieje
        quantity: product.quantity != null ? Number(product.quantity) : 0,  // Ustawiamy domyślną wartość 0, jeśli quantity jest null
        unit: product.unit
      }));
  
    // Przekazujemy inventoryRecords do metody endInventory
    this.productService.endInventory(inventoryRecords).subscribe(
      (response) => {
        console.log('Produkty zapisane do bazy:', response);
  
        // Zamknięcie modala
        if (this.finishModal) {
          this.finishModal.dismiss();
        }
  
        // Przekierowanie po zapisaniu
        this.router.navigate(['/select-inv-cat']);
        this.productService.clearTemporaryProducts();  // Czyszczenie danych po zakończeniu
        // Przekierowanie po zapisaniu
      },
      (error) => {
        console.error('Błąd podczas zapisywania produktów:', error);
        console.error('Pełny błąd:', error); // Dodajemy pełny błąd, aby uzyskać więcej informacji
        this.showAlert('Nie udało się zapisać produktów.', 'Błąd');
      }
    );
  }
  
  
  // Otwieranie formularza dodawania produktu
  openAddProductForm(categoryId: number) {
    if (this.productModal) {
      this.productModal.dismiss();
    }
    this.router.navigate(['/add-product'], { queryParams: { categoryId: categoryId } });
  }

  //dodane 
  updateProductLocally(product: Product) {
    this.productService.addTemporaryProduct(product);
  
    // Zaktualizuj `selectedProducts`, aby widok był spójny
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.selectedProducts[index] = { ...product };
    } else {
      this.selectedProducts.push(product);
    }
  
    console.log('Produkt zaktualizowany lokalnie:', product);
    console.log('Obecna lista produktów:', this.selectedProducts);
  }
  
  
  showTemporaryProducts() {
    const products = this.productService.getTemporaryProducts();
    console.log('Tymczasowe produkty:', products);
  }
  onQuantityChange(product: Product) {
    console.log('Zmiana ilości produktu:', product);
    this.productService.addTemporaryProduct(product);  // Upewnij się, że produkt jest aktualizowany w pamięci
  }
  
}