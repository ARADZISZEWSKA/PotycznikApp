import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

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
  isAdmin: boolean = true; // Domyślnie admin

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  checkFormValidity() { 
    this.isFormValid = 
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.length >= 8 &&
      this.password === this.confirmPassword;
  }

  async presentAlert(header: string, subHeader: string, message: string, isSuccess: boolean) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
      cssClass: isSuccess ? 'alert-success' : 'alert-error',  // Dodajemy odpowiednią klasę CSS
    });
    await alert.present();
  }

  onRegister() {
    if (!this.isFormValid) {
      this.presentAlert('Błąd rejestracji', 'Niepoprawne dane', 'Proszę wypełnić wszystkie pola!', false);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentAlert('Błąd rejestracji', '', 'Hasła muszą się zgadzać!', false);
      return;
    }

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    if (this.isAdmin) {
      this.authService.registerAdmin(userData).subscribe({
        next: () => {
          this.presentAlert('Rejestracja zakończona sukcesem!', '', '', true);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.presentAlert('Błąd podczas rejestracji', '', '' + err.error, false);
        }
      });
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
