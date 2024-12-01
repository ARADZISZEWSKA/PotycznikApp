import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-category',
  templateUrl: './bar-category.page.html',
  styleUrls: ['./bar-category.page.scss'],
})
export class BarCategoryPage implements OnInit {

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
