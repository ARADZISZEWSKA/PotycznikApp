import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { InventoryRecordRequest } from '../models/inventoryRecordRequest.model';  // Nowy model

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5099/api/products'; 

  constructor(private http: HttpClient) {}

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`);
  }

  updateProducts(products: Product[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update`, { products });
  }

  getLastInventory(): Observable<any> {
    return this.http.get<any>('http://localhost:5099/api/inventory/last');
  }
 
  endInventory(inventoryRecords: InventoryRecordRequest[]): Observable<string> {
    return this.http.post('http://localhost:5099/api/products/end-inventory', inventoryRecords, { responseType: 'text' });
  }
  
}
