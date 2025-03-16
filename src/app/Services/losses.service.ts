import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LossDto {
  productName: string; 
  quantity: number;
  reason: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LossesService {
  private apiUrl = environment.apiUrl + '/Losses'; 

  constructor(private http: HttpClient) {}

  getLosses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createLoss(loss: LossDto): Observable<any> {
    return this.http.post(this.apiUrl, loss);
  }
}
