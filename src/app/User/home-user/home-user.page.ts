import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit {

  userName: string = 'Iza'; 

  constructor(private router: Router) { }

  ngOnInit() {}

  onOptionSelected(option: string) {
    console.log('Wybrana opcja:', option);

    if (option === 'Przejrzyj stan') {
      this.router.navigate(['/select-inv-cat']);
    }
    if (option === 'Dodaj stratę') {
      this.router.navigate(['/losses']);
    }
    else if (option === 'Przeprowadź inwentaryzację') {
      this.router.navigate(['/edit-product'])
    }
  }

}
