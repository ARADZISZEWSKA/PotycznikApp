import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  userName: string = 'Iza'; 

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);
    if (option === 'Przejrzyj stan') {
      this.router.navigate(['/select-review-cat']); 
    } else if (option === 'Dodaj użytkownika') {
      this.router.navigate(['/add-user']); 
    }
  }

  onBackClick() {
    console.log('Wróć kliknięty!');
  }
}
