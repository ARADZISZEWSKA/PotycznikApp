import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-inv-cat',
  templateUrl: './select-inv-cat.page.html',
  styleUrls: ['./select-inv-cat.page.scss'],
})
export class SelectInvCatPage implements OnInit {

  userName: string = 'Iza'; 

  constructor() { }

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana kategoria:', option);
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
  }
}
