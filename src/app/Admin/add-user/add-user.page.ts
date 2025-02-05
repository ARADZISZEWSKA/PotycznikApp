import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isFormValid: boolean = false;

  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  validateEmail() {
    this.emailError = '';
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    if (!emailPattern.test(this.email)) {
      this.emailError = 'Wprowadź poprawny email';
    }
    this.checkFormValidity();
  }

  validatePassword() {
    this.passwordError = '';
    if (this.password.length < 8) {
      this.passwordError = 'Hasło musi zawierać co najmniej 8 znaków';
    } else {
      if (!/[A-Z]/.test(this.password)) {
        this.passwordError = 'Hasło musi zawierać co najmniej jedną wielką literę';
      }
      if (!/[0-9]/.test(this.password)) {
        this.passwordError += this.passwordError ? '. ' : '';
        this.passwordError += 'Hasło musi zawierać co najmniej jedną cyfrę';
      }
    }
    this.checkFormValidity();
  }

  validateConfirmPassword() {
    this.confirmPasswordError = '';
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Hasła nie są zgodne';
    }
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid =
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      !this.emailError &&
      !this.passwordError &&
      !this.confirmPasswordError;
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';

    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    this.isFormValid = false;
  }

  async onAddUser() {
    this.checkFormValidity();
    if (!this.isFormValid) {
      this.presentAlert('Błąd', 'Formularz niepoprawny', 'Popraw dane w polach email lub hasło.', false);
      return;
    }

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    const adminId = JSON.parse(localStorage.getItem('user') || '{}').id;

    this.authService.registerUser(userData, adminId).subscribe({
      next: async () => {
        await this.presentAlert('Sukces', 'Użytkownik dodany', 'Użytkownik został dodany pomyślnie!', true);
        this.resetForm();
      },
      error: (err) => {
        this.presentAlert('Błąd', 'Błąd rejestracji', err.error ?? 'Wystąpił nieznany błąd', false);
      }
    });
  }

  async presentAlert(header: string, subHeader: string, message: string, isSuccess: boolean) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
      cssClass: isSuccess ? 'alert-success' : 'alert-error',
    });
    await alert.present();
  }

  goBack() {
    this.router.navigate(['/home-admin']);
  }
}
