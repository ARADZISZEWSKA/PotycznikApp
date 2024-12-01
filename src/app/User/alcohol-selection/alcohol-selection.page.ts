import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alcohol-selection',
  templateUrl: './alcohol-selection.page.html',
  styleUrls: ['./alcohol-selection.page.scss'],
})
export class AlcoholSelectionPage implements OnInit {

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
