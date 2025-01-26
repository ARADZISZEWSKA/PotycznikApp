import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ProductService } from 'src/app/Services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Dodane dla formularza
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/models/Category.model';
import { LossesService } from 'src/app/Services/losses.service';

@Component({
  selector: 'app-losses',
  templateUrl: './losses.page.html',
  styleUrls: ['./losses.page.scss'],
})
export class LossesPage implements OnInit {
  @ViewChild('productModal', { static: false }) productModal!: IonModal;

  products: any[] = []; 
  productCategories: any[] = [];  
  selectedProduct: any;
  noProductsMessage: string = '';
  lossForm: FormGroup;  
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private lossesService: LossesService,
    private router: Router,
    private fb: FormBuilder 
  ) {
    // Inicjalizacja formularza
    this.lossForm = this.fb.group({
      productId: ['', Validators.required], 
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]], // Ilość
      reason: ['', Validators.required], 
      categoryId: ['', Validators.required]    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories; 
      console.log('Załadowane kategorie:', this.categories);
  
      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
        console.log('Załadowane produkty:', this.products);
  
        this.groupProductsByCategory(); 
      });
    });
  }
  
  groupProductsByCategory() {
    console.log('Produkty przed grupowaniem:', this.products);
  
    // Mapowanie produktów na kategorie
    const categoriesMap: { [key: string]: any[] } = {};
  
    this.products.forEach((product) => {
      const category = this.categories.find((cat) => cat.id === product.categoryId);
  
      const categoryName = category ? category.name : 'Brak kategorii'; // Domyślna nazwa, jeśli brak kategorii
  
      if (!categoriesMap[categoryName]) {
        categoriesMap[categoryName] = [];
      }
      categoriesMap[categoryName].push(product);
    });
  
    // Przekształcenie mapy w tablicę kategorii
    this.productCategories = Object.keys(categoriesMap).map((categoryName) => ({
      category: categoryName,
      products: categoriesMap[categoryName],
    }));
  
    console.log('Zgrupowane kategorie:', this.productCategories);
  }

  openProductModal() {
    if (this.productModal) {
      this.productModal.present();
    }
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.lossForm.patchValue({
      productId: product.id,
      productName: product.name, 
      categoryId: product.categoryId || '' 
    });
    this.closeModal();
  }

  closeModal() {
    if (this.productModal) {
      this.productModal.dismiss();
    }
  }

  onSubmit() {
    if (this.lossForm.valid) {
      const lossData = {
        ...this.lossForm.value,
        categoryId: this.selectedProduct ? this.selectedProduct.categoryId : ''  
      };
  
      this.lossesService.createLoss(lossData).subscribe(
        (response) => {
          console.log('Strata dodana:', response);
          this.showConfirmationAlert();
        },
        (error) => {
          console.error('Błąd podczas dodawania straty:', error);
        }
      );
    } else {
      console.log('Formularz jest niepoprawny');
    }
  }

  showConfirmationAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Sukces!';
    alert.message = 'Czy chcesz dodać kolejną stratę?';
    alert.buttons = [
      {
        text: 'Tak',
        handler: () => {
          this.lossForm.reset(); 
        }
      },
      {
        text: 'Nie',
        handler: () => {
          this.router.navigate(['/home-user']);
        }
      }
    ];
    document.body.appendChild(alert);
    alert.present();
  }

  goBack() {
    this.router.navigate(['/home-user']);
  }
}