import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.page.html',
  styleUrls: ['./settings-admin.page.scss'],
})
export class SettingsAdminPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToReports() {
    this.navCtrl.navigateForward('/reports');
  }

}
