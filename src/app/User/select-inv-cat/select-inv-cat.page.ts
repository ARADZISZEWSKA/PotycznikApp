import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-select-inv-cat',
  templateUrl: './select-inv-cat.page.html',
  styleUrls: ['./select-inv-cat.page.scss'],
})
export class SelectInvCatPage implements OnInit {
  @ViewChild('modal', { static: true }) modal: IonModal | undefined;

  expandedOption: string | null = null; 

  constructor(private router: Router) {}

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);

    if (option === 'BAR') {
      this.openModal(); 
    } else if (option === 'KUCHNIA') {
      this.router.navigate(['/kitchen-cat']);
    } else if (option === 'CHEMIA') {
      this.router.navigate(['/chemicals-cat']);
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.present(); 
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss(); 
    }
  }

  toggleSubOptions(option: string) {
    if (this.expandedOption === option) {
      this.expandedOption = null;
    } else {
      this.expandedOption = option;
    }
  }

  navigateTo(option: string) {
    console.log('Nawigacja do:', option);
    if (this.modal) {
      this.modal.dismiss();
    }
  
    const routesMap: { [key: string]: string } = {
      'alkohol-bar': 'bar',
      'bottle-storage': 'bottle-storage',
      'beer': 'beer',
      'fruits': 'fruits',
      'dry': 'dry',
    };
  
    const category = routesMap[option];
    if (category) {
      this.router.navigate([`/category-items/${category}`]);
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
    this.router.navigate(['/home-user']);
  }
}
