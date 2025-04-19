import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.page.html',
  styleUrls: ['./settings-admin.page.scss'],
})
export class SettingsAdminPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToReports() {
    this.navCtrl.navigateForward('/reports');
  }

  changePassword() {
    this.router.navigate(['/zmien-haslo']); 
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }
  
  logout() {
    this.router.navigate(['/login']); 
  }
}
