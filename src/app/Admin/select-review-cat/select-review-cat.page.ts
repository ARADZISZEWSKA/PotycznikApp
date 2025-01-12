import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-select-review-cat',
  templateUrl: './select-review-cat.page.html',
  styleUrls: ['./select-review-cat.page.scss'],
})
export class SelectReviewCatPage implements OnInit {
@ViewChild('modal', { static: true }) modal: IonModal | undefined;
@ViewChild('productModal', { static: true }) productModal: IonModal | undefined;

  selectedCategory: string | null = null;
  expandedOption: string | null = null;
  products: any[] = []; 
  selectedProduct: any = null;  
  noProductsMessage: string = '';
  isInventoryMode: boolean = false; 

  // Mapowanie nazw kategorii na ID kategorii
  categoryMapping: { [key: string]: number } = {
    'alkohol bar': 7,
    'butelki': 8,
    'piwo': 9,
    'owoce': 5,
    'suche': 6
  };
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);
    this.selectedCategory = option;

    if (option === 'BAR') {
      this.openModal();
    }
    if(option === 'ZACZNIJ INWENTARYZACJĘ'){
      this.router.navigate(['/edit-product']);
    } 
  
  }

  onBackClick() {
    console.log('Wróć kliknięty!');

    this.router.navigate(['/home-admin'])
  }

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  toggleSubOptions(option: string) {
    if (this.expandedOption === option) {
      this.expandedOption = null;
    } else {
      this.expandedOption = option;
    }
  }

  loadProducts(category: string) {
    const categoryId = this.categoryMapping[category]; // Pobieranie ID kategorii
    if (categoryId) {
      // Resetowanie listy produktów i komunikatu o braku produktów
      this.products = [];
      this.noProductsMessage = ''; // Przypisanie pustego komunikatu
  
      this.productService.getProductsByCategory(categoryId).subscribe(
        (products) => {
          console.log('Otrzymane produkty:', products);  // Logowanie otrzymanych produktów
          this.products = products;
          
          if (this.products.length === 0) {
            // Komunikat, jeśli w kategorii nie ma produktów
            this.noProductsMessage = `Brak produktów w kategorii: ${category}`;
          }
        },
        (error) => {
          console.error('Błąd podczas ładowania produktów:', error);  // Logowanie szczegółów błędu
          if (error.status === 404) {
            // Jeśli 404, traktujemy to jako brak produktów w danej kategorii
            this.noProductsMessage = `Brak produktów w tej kategorii.`;
          } else {
            // Inny błąd
            this.noProductsMessage = 'Wystąpił problem podczas ładowania produktów. Spróbuj ponownie później.';
          }
        }
      );
  
      if (this.productModal) {
        this.productModal.present();
      }
    } else {
      console.error('Nie znaleziono odpowiedniego ID dla kategorii:', category);
    }
  }

  goBackToCategories() {
    if (this.productModal) {
      this.productModal.dismiss();
    }
      if (this.modal) {
      this.modal.present();
    }
  }

  viewProductDetails(product: any) {
    this.selectedProduct = product;
    console.log('Szczegóły produktu:', product);
  }
}
