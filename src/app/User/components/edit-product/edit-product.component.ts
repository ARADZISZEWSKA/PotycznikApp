import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ProductService } from '../../../Services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { InventoryRecordRequest } from 'src/app/models/inventoryRecordRequest.model';
import { AlertController } from '@ionic/angular';
import { Category } from '../../../models/Category.model';
import { CategoryService } from 'src/app/Services/category.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InventoryService } from 'src/app/Services/inventory.service';

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
  modalId: string | null = null;
  productImagePath: string | null = 'images/example.jpg';

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer,
    private inventoryService: InventoryService

  ) {}

  
  ngOnInit() {
    this.selectedProducts = this.productService.getTemporaryProducts().filter(product => !product.isDeleted);
    console.log('Produkty załadowane na starcie:', this.selectedProduct);
    
    // Ładuj kategorie (przy pierwszym otwarciu)
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log('Załadowane kategorie:', this.categories); // Dodaj logowanie
      },
      (error) => {
        console.error('Błąd ładowania kategorii:', error);
        this.showAlert('Nie udało się załadować kategorii.', 'Błąd');
      }
    );
    
    // Obsługa queryParams dla przekazywania categoryId
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('Query Params:', params); 
      const categoryId = params['categoryId'];
      const openModal = params['openModal'];
      const modalId = params['modalId'];
  
      if (categoryId === '0' || !categoryId) {
        // Jeśli categoryId = 0, wracamy do głównego widoku edit-product
        // Nie wykonujemy żadnych prób ładowania produktów
        this.productModal?.dismiss();
        return;
      }
  
      if (openModal && modalId === 'productModal' && categoryId) {
        this.openProductModalByCategoryId(+categoryId);  // Otwórz modal dla konkretnej kategorii
      }
    });
  }

  
  toggleSubOptions(option: string) {
    this.expandedOption = this.expandedOption === option ? null : option;
  }

  getFullImageUrl(relativePath: string | undefined | null): string {
    return this.productService.getImageUrl(relativePath || null);
  }

  openProductModalByCategoryId(categoryId: number) {
    if (categoryId === 0) {
      // Jeśli kategoria to 0, nie próbuj ładować produktów, po prostu wróć do głównego widoku
      console.log('Brak wybranej kategorii (categoryId = 0), wracamy do głównego widoku.');
      this.productModal?.dismiss();  // Zamknij modal
      this.router.navigate(['/edit-product']);  // Przekierowanie do głównej strony
      return;
    }
  
    // W przypadku, gdy kategoria jest poprawna (inne niż 0)
    this.productService.getProductsByCategory(categoryId).subscribe(
      (products) => {
        this.selectedProducts = products.filter(product => !product.isDeleted);
  
        if (this.selectedProducts.length > 0) {
          this.productModal?.present();  // Otwórz modal, jeśli są produkty
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
  
  openProductModal(category: string) {
    const categoryId = this.getCategoryIdByName(category);
  
    if (categoryId === undefined) {
      this.showAlert('Nieprawidłowa kategoria.', 'Brak produktów');
      return;
    }
  
    // Wyświetl loader lub stan wczytywania przed załadowaniem danych
    this.selectedProducts = []; // Wyczyść poprzednie produkty, aby uniknąć migotania
  
    this.productService.getProductsByCategory(categoryId).subscribe(
      (products) => {
        const cachedProducts = this.productService.getTemporaryProducts();
  
        // Połącz dane z pamięci podręcznej z produktami pobranymi z API
        this.selectedProducts = products.map(product => {
          const cachedProduct = cachedProducts.find(p => p.id === product.id);
          return cachedProduct ? { ...cachedProduct } : product;
        });
  
        // Filtrowanie produktów oznaczonych jako usunięte
        this.selectedProducts = this.selectedProducts.filter(product => !product.isDeleted);
  
        if (this.selectedProducts.length > 0) {
          this.productModal?.present(); // Otwórz modal tylko, gdy są produkty
        } else {
          this.noProductsMessage = 'Brak produktów w tej kategorii.';
          console.warn(this.noProductsMessage);
        }
      },
      (error) => {
        console.error('Błąd ładowania produktów:', error);
        this.showAlert('Nie udało się załadować produktów.', 'Błąd');
      }
    );
  }
  
  
  
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

  confirmCancelInventory() {
    if (this.cancelModal) {
      this.cancelModal.present();
    }
  }

  cancelInventory() {
    this.selectedProducts = [];
    this.router.navigate(['/home-user']);
    if (this.cancelModal) {
      this.cancelModal.dismiss();
    }
  }

  confirmFinishInventory() {
    if (this.finishModal) {
      this.finishModal.present();
    }
  }

  openAddProductForm(categoryId: number) {
    console.log('Przekazuję categoryId:', categoryId); 
  if (this.productModal) {
    this.productModal.dismiss();
  }
  this.router.navigate(['/add-product'], { queryParams: { categoryId: categoryId } });
  }

  finishInventory() {
    const temporaryProducts = this.productService.getTemporaryProducts();
  
    if (temporaryProducts.length === 0) {
      this.showAlert('Brak produktów do zapisania.', 'Błąd');
      return;
    }
  
    const inventoryRecords: InventoryRecordRequest[] = [];
    const productsToDelete: number[] = [];
  
    temporaryProducts.forEach(product => {
      if (product.id !== undefined) {
        const previousQuantity = this.productService.getPreviousQuantity(product.id!);
  
        if (product.quantity != null && !product.isDeleted) {
          inventoryRecords.push({
            productId: product.id!,
            quantity: product.quantity != null ? Number(product.quantity) : 0,
            previousQuantity: previousQuantity,
            categoryId: product.categoryId
          });
        }
  
        if (product.isDeleted) {
          productsToDelete.push(product.id!);
        }
      }
    });
  
    this.productService.endInventory(inventoryRecords, productsToDelete).subscribe({
      next: (response) => {
        console.log('Odpowiedź z backendu:', response);
  
        // Grupa rekordów PO zakończeniu inwentaryzacji
        this.inventoryService.groupRecordsByDate().subscribe({
          next: (groupedResponse: any) => {
            if (groupedResponse && groupedResponse.groupedDates.length > 0) {
              console.log('Grupowanie rekordów zakończone:', groupedResponse.groupedDates);
            } else {
              console.error('Grupowanie nie zwróciło wyników:', groupedResponse);
            }
          },
          error: (groupingError) => {
            console.error('Błąd podczas grupowania rekordów:', groupingError);
          }
        });
  
        // Zamknij modal i przekieruj
        if (this.finishModal) {
          this.finishModal.dismiss();
        }
  
        this.router.navigate(['/home-user']);
        this.productService.clearTemporaryProducts();
        this.productService.clearPreviousQuantities();
      },
      error: (error) => {
        console.error('Błąd podczas zapisywania produktów:', error);
        this.showAlert('Nie udało się zapisać produktów.', 'Błąd');
      }
    });
  }
  
  deleteProduct() {
    if (this.selectedProduct) {
      console.log('Wybrany produkt do usunięcia:', this.selectedProduct);
  
      const currentQuantity = this.selectedProduct.quantity ?? 0;
      this.productService.setPreviousQuantity(this.selectedProduct.id!, currentQuantity);
  
      // Oznaczenie produktu jako usuniętego
      this.selectedProduct.isDeleted = true;
      this.productService.addTemporaryProduct(this.selectedProduct);

      // Aktualizujemy tymczasowe produkty
      this.productService.addDeletedProduct(this.selectedProduct.id!);
  
      // Usuwamy produkt z listy wyświetlanych produktów
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== this.selectedProduct!.id);
  
      // Zamykamy modal
      this.closeProductDetailsModal();
      this.showAlert('Produkt został oznaczony do usunięcia.', 'Sukces');
    } else {
      console.warn('Nie wybrano produktu do usunięcia.');
    }
  }
  
  onQuantityChange(product: Product) {
    console.log('Zmiana ilości produktu:', product);
    this.productService.addTemporaryProduct(product);  // Upewnij się, że produkt jest aktualizowany w pamięci
  }

  updateProductLocally(product: Product) {
    this.productService.addTemporaryProduct(product);
    this.selectedProducts = this.productService.getTemporaryProducts()
    .filter(p => !p.isDeleted);
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

}