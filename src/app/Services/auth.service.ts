import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterUserDto } from '../Dto/register-user.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  registerAdmin(user: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-admin`, user);
  }

  registerUser(user: RegisterUserDto, adminId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user?adminId=${adminId}`, user, { responseType: 'text' as 'json' });
  }  

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

}
