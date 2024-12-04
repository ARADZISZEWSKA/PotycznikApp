import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-bar-category',
  templateUrl: './bar-category.page.html',
  styleUrls: ['./bar-category.page.scss'],
})
export class BarCategoryPage implements OnInit {
  @ViewChild('modal', { static: true }) modal: IonModal | undefined; // Referencja do modala

  constructor(private router: Router) {}

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);

    if (option === 'ALKOHOL') {
      this.openModal(); 
    } else if (option === 'OWOCE') {
      this.router.navigate(['/fruits-selection']);
    } else if (option === 'SUCHE') {
      this.router.navigate(['/dry-selection']);
    }
  }

  openModal() {
    const modalTrigger = document.getElementById('open-modal');
    if (modalTrigger) {
      modalTrigger.click(); 
    }
  }

  navigateTo(option: string) {
    this.modal?.dismiss(); 

    if (option === 'ALKOHOL BAR') {
      this.router.navigate(['/home-user']);
    } else if (option === 'BUTELKI MAGAZYN') {
      this.router.navigate(['/bottle-storage']);
    } else if (option === 'PIWO') {
      this.router.navigate(['/beer']);
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
    this.router.navigate(['/select-inv-cat']);
  }
}
