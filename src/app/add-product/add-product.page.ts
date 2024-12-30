import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product.model'; 
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../Services/category.service';
import { Category } from '../models/Category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;  // Przechowujemy wybraną kategorię
  product: Product = {
    name: '',
    categoryId: 0, // Domyślnie brak kategorii
    quantity: 0,
    unit: '',
  };
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertController: AlertController,
    private http: HttpClient,

  ) {}

  ngOnInit(): void {
    // Pobranie dostępnych kategorii z serwisu
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  addProduct(): void {
    if (!this.product.categoryId) {
      alert('Kategoria jest wymagana');
      return;
    }

    // Jeśli plik jest wybrany, dodaj go do form data
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('quantity', this.product.quantity.toString());
    formData.append('unit', this.product.unit);
    formData.append('categoryId', this.product.categoryId.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Wysyłanie produktu do backendu
    this.productService.createProduct(formData).subscribe({
      next: (newProduct) => {
        console.log('Produkt został dodany:', newProduct);
        // Można tutaj przekierować lub wyczyścić formularz
      },
      error: (err) => {
        console.error('Błąd przy tworzeniu produktu:', err);
      }
    });
  }

}