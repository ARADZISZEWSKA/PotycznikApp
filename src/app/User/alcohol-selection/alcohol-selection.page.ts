import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alcohol-selection',
  templateUrl: './alcohol-selection.page.html',
  styleUrls: ['./alcohol-selection.page.scss'],
})
export class AlcoholSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);

    if (option === 'ALKOHOL BAR'){
      this.router.navigate(['/alcohol-bar'])
    }
    if (option === 'BUTELKI MAGAZYN'){
      this.router.navigate(['/alcohol-stockroom'])
    }
    else if (option === 'PIWO'){
      this.router.navigate(['/beer'])
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');

    this.router.navigate(['/bar-category'])
  }
}
