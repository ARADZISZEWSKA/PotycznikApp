import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  userName: string = 'Iza'; 

  constructor() { }

  ngOnInit() {
  }
  
  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
  }
}
