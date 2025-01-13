import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://localhost:5099/api/inventoryRecords';  // URL do kontrolera InventoryRecords

  constructor(private http: HttpClient) { }

  getRecordsByDate(date: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/inventory-by-date/${date}`);
  }

  getAvailableDates(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/available-dates`);
  }

  groupRecordsByDate(): Observable<any> {
    return this.http.post(`${this.baseUrl}/group-records-by-date`, null);
  }  
  
}
