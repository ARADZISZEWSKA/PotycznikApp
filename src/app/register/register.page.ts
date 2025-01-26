import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isFormValid: boolean = false;

  constructor(
      private router: Router
    ) {
    }
    
  checkFormValidity() {
    if (this.firstName && this.lastName && this.email && this.password && this.confirmPassword) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  onRegister() {
    if (this.isFormValid) {
      console.log('Formularz wysłany');
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
