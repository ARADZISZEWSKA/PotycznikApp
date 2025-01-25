import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LossDto {
  productName: string; 
  quantity: number;
  reason: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LossesService {
  private apiUrl = 'http://localhost:5099/api/Losses'; // Adres API backendu

  constructor(private http: HttpClient) {}

  createLoss(loss: LossDto): Observable<any> {
    return this.http.post(this.apiUrl, loss);
  }
}
