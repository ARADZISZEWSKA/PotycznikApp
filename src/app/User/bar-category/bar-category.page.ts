import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-category',
  templateUrl: './bar-category.page.html',
  styleUrls: ['./bar-category.page.scss'],
})
export class BarCategoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);

    if (option === 'ALKOHOL'){
      this.router.navigate(['/alcohol-selection'])
    }
    if (option === 'OWOCE') {
      this.router.navigate(['/fruits-selection'])
    }
    else if (option === 'SUCHE') {
      this.router.navigate(['/dry-selection'])
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');

    this.router.navigate(['/select-inv-cat'])
  }
}
