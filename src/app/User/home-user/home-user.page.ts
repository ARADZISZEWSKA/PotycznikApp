import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit {

  userName: string = 'Iza'; 

  constructor() { }

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
  }
}
