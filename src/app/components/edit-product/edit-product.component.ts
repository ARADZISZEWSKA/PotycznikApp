import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
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
  @ViewChild('productModal') productModal: IonModal | undefined;
  @ViewChild('productDetailsModal') productDetailsModal: IonModal | undefined; 
  @ViewChild('deleteProductModal') deleteProductModal: IonModal | undefined; 

  expandedOption: string | null = null;
  selectedProducts: Product[] = [];
  selectedProduct: Product | null = null;

  noProductsMessage: string | null = null;

  // Mapowanie kategorii na ID
  categoryMap: { [key: string]: number } = {
    'alkohol bar': 7,
    'butelki': 8,
    'piwo': 9,
    'owoce': 5,
    'suche': 6,
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
        console.log('Zapytanie dla kategorii ID:', categoryId, 'Produkty:', products);
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
      buttons: ['OK'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }

  saveProducts() {
    console.log('Zapisano produkty', this.selectedProducts);
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
    const inventoryRecords: InventoryRecordRequest[] = this.selectedProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    this.productService.endInventory(inventoryRecords).subscribe(
      (response: string) => {
        alert(response);
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

  openAddProductForm() {
    this.router.navigate(['/add-product']); 
  }
}
