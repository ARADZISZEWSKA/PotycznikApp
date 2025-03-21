import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { InventoryRecordRequest } from '../models/inventoryRecordRequest.model';  // Nowy model
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/products'; 

  private temporaryProducts: Product[] = [];
  private deletedProductIds: number[] = [];
  private temporaryProductQuantities = new Map<number, number>();
  private previousQuantities: Map<number, number> = new Map();

  constructor(private http: HttpClient) {
    this.clearTemporaryProducts();

  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
  
  addTemporaryProduct(product: Product): void {
    console.log('Dodawanie produktu:', product);

    const existingProductIndex = this.temporaryProducts.findIndex(p => p.id === product.id && p.unit === product.unit);
      
    if (existingProductIndex !== -1) {
      // Aktualizowanie istniejącego produktu
      this.temporaryProducts[existingProductIndex] = product;
    } else {
      // Dodawanie nowego produktu
      this.temporaryProducts.push(product);
    }
    if (product.id !== undefined) {
      this.getProductFromDatabase(product.id).subscribe((databaseProduct: Product) => {
        const databaseQuantity = databaseProduct.quantity ?? 0;
        this.setPreviousQuantityFromDatabase(product.id!, databaseQuantity);
        console.log(`Pobrano previousQuantity (${databaseQuantity}) z bazy danych dla produktu ID: ${product.id}`);
      });
    }
  
    // Po dodaniu, zapisz dane w localStorage
    this.setTemporaryProducts(this.temporaryProducts);
  }

  getProductFromDatabase(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }
  
  setPreviousQuantityFromDatabase(productId: number, previousQuantity: number): void {
  if (!this.previousQuantities) {
    this.previousQuantities = new Map<number, number>();
  }
  this.previousQuantities.set(productId, previousQuantity);
  }

  getTemporaryProducts(): Product[] {
    return JSON.parse(localStorage.getItem('temporaryProducts') || '[]');
    
  }
  
  setTemporaryProducts(products: Product[]) {
    // Zapisuje produkty w pamięci
    localStorage.setItem('temporaryProducts', JSON.stringify(products));
  }

  clearTemporaryProducts() {
    this.temporaryProducts = []; 
    localStorage.removeItem('temporaryProducts');  
    console.log('Temporary products have been cleared');
  }
  
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`).pipe(
      tap((products: Product[]) => {
        // Połącz produkty z serwera z lokalnymi produktami tymczasowymi
        this.temporaryProducts.forEach(tempProduct => {
          const index = products.findIndex(p => p.id === tempProduct.id);
          if (index !== -1) {
            products[index] = tempProduct; // Nadpisz produkt
          } else {
            products.push(tempProduct); // Dodaj nowy produkt
          }
        });
  
        // Filtruj produkty, aby pominąć te oznaczone jako usunięte
        const filteredProducts = products.filter(p => !p.isDeleted);
        console.log('Produkty po filtracji:', filteredProducts);
        return filteredProducts;
      })
    );
  }
  
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add-product`, formData);
  }
 
  endInventory(inventoryRecords: InventoryRecordRequest[], productsToDelete: number[]) {
    return this.http.post(`${environment.apiUrl}/products/end-inventory`, {
      inventoryRecords: inventoryRecords,
      productsToDelete: productsToDelete
    });
  }
  
  getImageUrl(relativePath: string | null): string {
    return relativePath ? `${environment.apiUrl}${relativePath}` : `${environment.apiUrl}images/placeholder.jpg`;
}
  
  getDeletedProductIds(): number[] {
    const deletedIds = this.temporaryProducts
      .filter(product => product.isDeleted) // Filtrujemy tylko produkty oznaczone jako usunięte
      .map(product => product.id!); // Pobieramy ich ID
    console.log('Lista usuniętych produktów:', deletedIds);
    return deletedIds;
  }
    
  setPreviousQuantity(productId: number, quantity: number): void {
    if (!this.previousQuantities.has(productId)) {
        this.previousQuantities.set(productId, quantity);
        console.log(`Zapisano previousQuantity: ${quantity} dla produktu o ID ${productId}`);
    }
}

getPreviousQuantity(productId: number): number {
    return this.previousQuantities.get(productId) ?? 0;
}

clearPreviousQuantities(): void {
    this.previousQuantities.clear();
}

setPreviousQuantityForInventory(productId: number, quantity: number): void {
  if (!this.previousQuantities) {
    this.previousQuantities = new Map<number, number>();
  }
  this.previousQuantities.set(productId, quantity);
}

addDeletedProduct(productId: number): void {
  // Znajdź produkt w temporaryProducts i oznacz go jako usunięty
  const productIndex = this.temporaryProducts.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    this.temporaryProducts[productIndex].isDeleted = true;
  }

  // Dodaj ID do listy usuniętych produktów
  if (!this.deletedProductIds.includes(productId)) {
    this.deletedProductIds.push(productId);
  }

  // Synchronizuj zmiany z localStorage
  this.setTemporaryProducts(this.temporaryProducts);
  localStorage.setItem('deletedProductIds', JSON.stringify(this.deletedProductIds));
}

getProductByBarcode(barcode: string): Observable<Product | null> {
  return this.http.get<Product>(`${this.baseUrl}/barcode/${barcode}`).pipe(
    catchError(error => {
      if (error.status === 404) {
        return of(null); // Zwróć null, jeśli produkt nie istnieje
      }
      throw error; // Rzuć błąd dla innych przypadków
    })
  );
}


}
