import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';  // Zaimportuj model Product
import { InventoryRecordRequest } from 'src/app/models/inventoryRecordRequest.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @ViewChild('cancelModal') cancelModal: IonModal | undefined;
  @ViewChild('finishModal') finishModal: IonModal | undefined;
  @ViewChild('productModal') productModal: IonModal | undefined;  // Modal dla produktów

  expandedOption: string | null = null; // Która kategoria jest rozwinięta
  selectedProducts: Product[] = []; // Produkty do edycji
  noProductsMessage: string | null = null;

  // Mapowanie kategorii na ID
  categoryMap: { [key: string]: number } = {
    'alkohol bar': 7,
    'butelki': 8,
    'piwo': 9,
    'owoce': 5,
    'suche': 6
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  toggleSubOptions(option: string) {
    this.expandedOption = this.expandedOption === option ? null : option;
  }

  openProductModal(category: string) {
    const categoryId = this.categoryMap[category];
    if (categoryId === undefined) {
      console.error('Nieprawidłowa kategoria:', category);
      this.showAlert('Nieprawidłowa kategoria.', 'Brak produktów');
      return;
    }
  
    this.productService.getProductsByCategory(categoryId).subscribe(
      (products) => {
        console.log('Zapytanie dla kategorii ID:', categoryId, 'Produkty:', products); // Debugowanie
        if (products && products.length > 0) {
          this.selectedProducts = products;
          if (this.productModal) {
            this.productModal.present();
          }
        } else {
          console.log('Brak produktów w kategorii:', category);
          this.showAlert('Brak produktów w tej kategorii.', 'Informacja');
        }
      },
      (error) => {
        console.error('Błąd ładowania produktów:', error);
        this.showAlert('Nie udało się załadować produktów.', 'Coś poszło nie tak:(');
      }
    );
  }
  
  
  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'], // Przycisk zamykający alert
      cssClass: 'custom-alert', // Opcjonalna klasa dla dodatkowego stylowania
    });
  
    await alert.present();
  }
  

  saveProducts() {
    // Funkcja zapisu produktów
    console.log('Zapisano produkty', this.selectedProducts);
    if (this.productModal) {
      this.productModal.dismiss();
    }
  }

  confirmCancelInventory() {
    if (this.cancelModal) {
      this.cancelModal.present();
    }
  }

  confirmFinishInventory() {
    if (this.finishModal) {
      this.finishModal.present();
    }
  }

  cancelInventory() {
    this.selectedProducts = [];
    this.router.navigate(['/select-inv-cat']);
    if (this.cancelModal) {
      this.cancelModal.dismiss();
    }
  }


  finishInventory() {
    const inventoryRecords: InventoryRecordRequest[] = this.selectedProducts.map(product => ({
      productId: product.id,
      quantity: product.quantity,
    }));
  
    // Wykonaj żądanie do serwera
    this.productService.endInventory(inventoryRecords).subscribe(
      (response: string) => {  // Teraz oczekujemy odpowiedzi w formacie tekstowym
        alert(response);  // Jeśli odpowiedź to "Inwentaryzacja zakończona", wyświetlimy ją
        this.router.navigate(['/select-inv-cat']);
        if (this.finishModal) {
          this.finishModal.dismiss();
        }
      },
      (error) => {
        console.error('Błąd podczas zapisywania inwentaryzacji:', error);
        alert('Nie udało się zapisać inwentaryzacji.');
      }
    );
  }
  
}