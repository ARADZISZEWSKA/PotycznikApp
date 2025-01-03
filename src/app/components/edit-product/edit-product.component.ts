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
        console.log('Załadowane kategorie:', this.categories); // Dodaj logowanie
        if (Array.isArray(this.categories)) {
        } else {
          console.error('Odpowiedź nie jest tablicą:', this.categories);
        }
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
    console.log('ID kategorii:', categoryId);
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
    console.log('Szukam kategorii o nazwie:', categoryName);
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
    // Pobieramy ID usuniętych produktów
    const deletedProductIds = this.productService.getDeletedProductIds();
  
    // Pobieramy edytowane produkty (filtrujemy, by uwzględnić tylko te, które nie są usunięte)
    const editedProducts = this.productService.getTemporaryProducts().filter(product => product.id && !deletedProductIds.includes(product.id!));
  
    // Jeśli nie ma żadnych produktów do zapisania (ani usuniętych, ani edytowanych)
    if (deletedProductIds.length === 0 && editedProducts.length === 0) {
      this.showAlert('Brak produktów do zapisania lub edycji.', 'Informacja');
      return;
    }
  
    // Zapisujemy edytowane produkty w pamięci (bez wywoływania backendu)
    // Tutaj nie wykonujemy zapisu do bazy danych
    if (editedProducts.length > 0) {
      console.log('Edytowane produkty zapisane w pamięci:', editedProducts);
    }
  
    // Usuwamy produkty w pamięci (bez wywoływania backendu)
    if (deletedProductIds.length > 0) {
      console.log('Produkty usunięte w pamięci:', deletedProductIds);
    }
  
    // Zamknięcie modal po zapisaniu edytowanych lub usuniętych produktów
    if (this.productModal) {
      this.productModal.dismiss();
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
  
    // Podzielmy produkty na te, które muszą zostać zaktualizowane i usunięte
    const inventoryRecords: InventoryRecordRequest[] = [];
    const productsToDelete: number[] = [];  // Produkty oznaczone do usunięcia
  
    temporaryProducts.forEach(product => {
      if (product.id !== undefined) {
        if (product.quantity != null && !product.isDeleted) {  // Produkty do edycji
          inventoryRecords.push({
            productId: product.id!,
            quantity: product.quantity != null ? Number(product.quantity) : 0,
          });
        }
  
        // Sprawdzamy, czy produkt jest oznaczony do usunięcia
        if (product.isDeleted) {
          productsToDelete.push(product.id!);  // Produkt do usunięcia
        }
      }
    });
  
    // Przekazujemy inventoryRecords i produkty do usunięcia
    this.productService.endInventory(inventoryRecords, productsToDelete).subscribe(
      (response) => {
        console.log('Odpowiedź z backendu:', response);
        console.log('Produkty zapisane do bazy:', response);
  
        // Zamknięcie modala
        if (this.finishModal) {
          this.finishModal.dismiss();
        }
  
        // Przekierowanie po zapisaniu
        this.router.navigate(['/select-inv-cat']);
        this.productService.clearTemporaryProducts();  // Czyszczenie danych po zakończeniu
      },
      (error) => {
        console.error('Błąd podczas zapisywania produktów:', error);
        this.showAlert('Nie udało się zapisać produktów.', 'Błąd');
      }
    );
  }
  
  deleteProduct() {
    if (this.selectedProduct) {
      // Oznaczenie produktu jako usuniętego
      this.selectedProduct.isDeleted = true;
  
      // Aktualizujemy tymczasowe produkty
      this.productService.addTemporaryProduct(this.selectedProduct);
  
      // Usuwamy produkt z listy wyświetlanych produktów
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== this.selectedProduct!.id);
  
      // Zamykamy modal
      this.closeProductDetailsModal();
      this.showAlert('Produkt został oznaczony do usunięcia.', 'Sukces');
    }
  }
  
  
  // Otwieranie formularza dodawania produktu
  openAddProductForm(categoryId: number) {
    if (this.productModal) {
      this.productModal.dismiss();
    }
    this.router.navigate(['/add-product'], { queryParams: { categoryId: categoryId } });
  
    // Po dodaniu produktu, zaktualizuj listę produktów w tej kategorii
    this.productService.getProductsByCategory(categoryId).subscribe(
      (products) => {
        this.selectedProducts = products; // Zaktualizuj produkty po dodaniu
      },
      (error) => {
        console.error('Błąd podczas pobierania produktów po dodaniu:', error);
      }
    );
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