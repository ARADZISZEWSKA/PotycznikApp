import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-inv-cat',
  templateUrl: './select-inv-cat.page.html',
  styleUrls: ['./select-inv-cat.page.scss'],
})
export class SelectInvCatPage implements OnInit {

  userName: string = 'Iza'; 

  constructor(private router: Router) { }

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana kategoria:', option);

    if (option === 'BAR') {
      this.router.navigate(['/bar-category'])
    }
    if (option === 'KUCHNIA') {
      this.router.navigate(['/kitchen-category'])
    }
    else if (option === "CHEMIA"){
      this.router.navigate(['/chem-category'])
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');

    this.router.navigate(['/home-user'])
  }
}
