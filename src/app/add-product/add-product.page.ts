import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  categories: Category[] = [];
  selectedCategoryId: number | null = null;  
  product: Product = {
    name: '',
    categoryId: 0, 
    quantity: 0,
    unit: '',
    image: '',
    barcode: undefined,
    expiryDate: undefined
  };
  selectedFile: File | null = null;
  showDatePicker: boolean = false;
  showAdditionalInfo = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertController: AlertController,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    
    // Pobranie dostępnych kategorii
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.filter(category => 
          ![1, 2, 3, 4].includes(category.id));
      },
      error: (err) => {
        console.error('Błąd przy ładowaniu kategorii:', err);
      },
    });
  }

  // Obsługuje wybranie pliku (obrazu)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Wybrano plik:', file.name);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  
  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  // Funkcja dodawania produktu
  addProduct(): void {
    if (!this.product.categoryId) {
      alert('Kategoria jest wymagana');
      return;
    }
  
    // Tworzymy obiekt FormData do wysłania na serwer
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('unit', this.product.unit);
    formData.append('categoryId', this.product.categoryId.toString());
  
    // Dodatkowe właściwości
    if (this.product.barcode) {
      formData.append('barcode', this.product.barcode);
    }
    if (this.product.expiryDate) {
      formData.append('expiryDate', this.product.expiryDate.toString());
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Produkt został dodany:', response);
        this.router.navigate(['/edit-product'], {
          queryParams: { 
            categoryId: this.product.categoryId, 
            openModal: 'true', 
            modalId: 'productModal'  // Parametr wskazujący, który modal otworzyć
          },
        });
      },
      error: (err) => {
        console.error('Błąd przy tworzeniu produktu:', err);
        alert('Błąd przy tworzeniu produktu: ' + err.message);
      },
    });
  }
  
}  
