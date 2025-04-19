import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:5099/api/report/full'; 

  constructor(private http: HttpClient) { }

  getFullReport(): Observable<Blob> {
    return this.http.get<any>(this.baseUrl, { responseType: 'blob' as 'json' });
  }

  // Funkcja do zapisywania pliku, np. XLSX
  saveFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }
}
