import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { InventoryRecordRequest } from '../models/inventoryRecordRequest.model';  // Nowy model
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5099/api/products'; 

  private temporaryProducts: Product[] = [];

  constructor(private http: HttpClient) {
    this.clearTemporaryProducts();

  }

  addTemporaryProducts(products: Product[]) {
    const existingProducts = this.getTemporaryProducts();  // Pobieramy aktualne produkty z localStorage
  
    console.log('Before adding, existing products count:', existingProducts.length);
    
    // Filtrujemy nowe produkty, aby dodać tylko te, które jeszcze nie istnieją
    const updatedProducts = [
      ...existingProducts,
      ...products.filter(newProduct => 
        !existingProducts.some(existingProduct => 
          existingProduct.id === newProduct.id && existingProduct.unit === newProduct.unit && existingProduct.quantity === newProduct.quantity
        )
      )
    ];
  
    console.log('After adding, updated products count:', updatedProducts.length);
  
    // Zapisujemy zaktualizowaną listę produktów w localStorage
    this.setTemporaryProducts(updatedProducts);
  }
  
  addTemporaryProduct(product: Product): void {
    const existingProductIndex = this.temporaryProducts.findIndex(p => p.id === product.id && p.unit === product.unit);
      
    if (existingProductIndex !== -1) {
      // Aktualizowanie istniejącego produktu
      this.temporaryProducts[existingProductIndex] = product;
    } else {
      // Dodawanie nowego produktu
      this.temporaryProducts.push(product);
    }
  
    // Po dodaniu, zapisz dane w localStorage
    this.setTemporaryProducts(this.temporaryProducts);
  }
  
  getTemporaryProducts(): Product[] {
    // Tutaj możesz pobierać produkty z lokalnej pamięci lub np. z localStorage, jeśli używasz tego rozwiązania
    return JSON.parse(localStorage.getItem('temporaryProducts') || '[]');
  }
  
  setTemporaryProducts(products: Product[]) {
    // Zapisuje produkty w pamięci
    localStorage.setItem('temporaryProducts', JSON.stringify(products));
  }
  // Wyczyszczenie pamięci tymczasowej po zapisaniu
  clearTemporaryProducts() {
    this.temporaryProducts = [];  // Usuwamy wszystkie produkty z pamięci
    localStorage.removeItem('temporaryProducts');  // Usuwamy dane z localStorage
    console.log('Temporary products have been cleared');
  }
  
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`);
  }
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add-product`, formData);
  }
  

  getLastInventory(): Observable<any> {
    return this.http.get<any>('http://localhost:5099/api/inventory/last');
  }
 
  endInventory(inventoryRecords: InventoryRecordRequest[]): Observable<string> {
    return this.http.post('http://localhost:5099/api/products/end-inventory', inventoryRecords, { responseType: 'text' });
  }
  
  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add-product`, productData);
  }
  updateProducts(products: Product[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update`, { products });
  }
}
