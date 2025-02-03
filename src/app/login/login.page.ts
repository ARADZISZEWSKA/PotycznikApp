import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
    ) {}

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
  
    onLogin() {
      if (!this.email || !this.password) {
        this.presentAlert('Błąd logowania', '', 'Wypełnij wszystkie pola', false);
        return;
      }
  
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/home-admin']);
          this.presentAlert('Zalogowano pomyślnie!', '', '', true); 
        },
        error: (err) => {
          this.presentAlert('Błąd logowania', '', err.error, false); 
        }
      });
    }
  
    onRegister() {
      this.router.navigate(['/register']);
    }
  }