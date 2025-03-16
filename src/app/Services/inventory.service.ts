import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = environment.apiUrl + '/inventoryRecords';

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
