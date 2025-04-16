import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model'; 
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../models/Category.model';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

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
    minimalQuantity: 0,
    unit: '',
    image: '',
    barcode: undefined,
    expiryDate: undefined
  };
  selectedFile: File | null = null;
  showDatePicker: boolean = false;
  showAdditionalInfo = false;
  scannedBarcodes: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertController: AlertController,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      console.log('Otrzymany categoryId z URL:', categoryId); 
    });
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

  async scanBarcode() {
    try {
      // Sprawdzenie i uzyskanie uprawnień do kamery
      const permission = await BarcodeScanner.checkPermissions();
      if (permission.camera !== 'granted') {
        await BarcodeScanner.requestPermissions();
      }
  
      // Skanowanie kodu kreskowego
      const { barcodes } = await BarcodeScanner.scan({
        formats: [
          BarcodeFormat.Ean13,
          BarcodeFormat.Ean8,
          BarcodeFormat.UpcA,
          BarcodeFormat.UpcE
        ]
      });
  
      // Jeśli zeskanowano kod
      if (barcodes.length > 0) {
        this.product.barcode = barcodes[0].rawValue;
        console.log('Zeskanowany kod:', this.product.barcode);
      } else {
        await this.showAlert('Błąd', 'Nie zeskanowano kodu kreskowego');
      }
    } catch (error) {
      console.error('Błąd podczas skanowania:', error);
      await this.showAlert('Błąd', 'Wystąpił problem podczas skanowania kodu kreskowego');
    }
  }
  
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

  async addProduct() {
    if (!this.product.categoryId) {
      await this.showAlert('Błąd', 'Kategoria jest wymagana');
      return;
    }

    if (this.product.minimalQuantity < 0) {
      await this.showAlert('Błąd', 'Minimalna ilość nie może być ujemna');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('unit', this.product.unit);
    formData.append('categoryId', this.product.categoryId.toString());
    formData.append('minQuantity', this.product.minimalQuantity.toString());
  
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
            modalId: 'productModal'
          },
        });
      },
      error: (err) => {
        console.error('Błąd przy tworzeniu produktu:', err);
        this.showAlert('Błąd', 'Błąd przy tworzeniu produktu: ' + err.message);
      },
    });
  }
  
  closeCard(): void {
    this.router.navigate(['/edit-product'], {
      queryParams: {
        categoryId: this.product.categoryId,
        openModal: 'true',
        modalId: 'productModal',
      },
    });
  }

  async validateBarcodeUniqueness(barcode: string): Promise<boolean> {
    try {
      const existingProduct = await this.productService.getProductByBarcode(barcode).toPromise();
      console.log('Odpowiedź z API:', existingProduct);
  
      // Sprawdzamy, czy odpowiedź zawiera dane produktu
      if (existingProduct && existingProduct.id) {  // Zakładając, że odpowiedź zawiera id produktu
        console.log('Kod kreskowy istnieje w bazie');
        return false;  // Produkt istnieje, zwróć false
      } else {
        console.log('Kod kreskowy jest unikalny');
        return true; 
      }
    } catch (error) {
      console.error('Błąd przy sprawdzaniu unikalności:', error);
      return false;
    }
  }
   

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
