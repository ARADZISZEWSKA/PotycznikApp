import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category.model'; 


@Injectable({
    providedIn: 'root', 
  })
  export class CategoryService {
    private baseUrl = 'http://localhost:5099/api/categories';
  
    constructor(private http: HttpClient) {}
  
    // Pobieranie wszystkich kategorii
    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(this.baseUrl);
    }
  
    // Pobieranie kategorii po ID
    getCategoryById(id: number): Observable<Category> {
      return this.http.get<Category>(`${this.baseUrl}/${id}`);
    }
  
    createCategory(category: Category): Observable<Category> {
      return this.http.post<Category>(this.baseUrl, category);
    }
  
    updateCategory(id: number, category: Category): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/${id}`, category);
    }
  
    deleteCategory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  }
  