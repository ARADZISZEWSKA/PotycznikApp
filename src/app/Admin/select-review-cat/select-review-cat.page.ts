import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-review-cat',
  templateUrl: './select-review-cat.page.html',
  styleUrls: ['./select-review-cat.page.scss'],
})
export class SelectReviewCatPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onOptionSelected(option: string) {
    console.log('Wybrana kategoria:', option);
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
  }
}
