import { Component, OnInit } from '@angular/core';
import { LossesService } from '../../Services/losses.service';
import { CategoryService } from '../../Services/category.service';
import { Loss } from '../../models/loss.model'; 
import { Category } from '../../models/Category.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-review-loss',
  templateUrl: './review-loss.page.html',
  styleUrls: ['./review-loss.page.scss'],
})
export class ReviewLossPage implements OnInit {
  losses: Loss[] = [];  // Zmienione na Loss
  categories: Category[] = [];
  lossesWithCategories: any[] = [];  // Tablica strat połączona z kategorią

  constructor(
    private lossesService: LossesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.fetchLossesAndCategories();
  }

  fetchLossesAndCategories() {
    forkJoin({
      losses: this.lossesService.getLosses(),
      categories: this.categoryService.getCategories(),
    }).subscribe(
      (results) => {
        this.losses = results.losses;
        this.categories = results.categories;
        this.populateLossesWithCategories();
      },
      (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      }
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Brak kategorii';
  }
  
  populateLossesWithCategories() {
    this.lossesWithCategories = this.losses.map((loss) => {
      const category = this.categories.find(
        (cat) => cat.id === loss.categoryId
      );
      return {
        ...loss,
        categoryName: category ? category.name : 'Brak kategorii',
      };
    });
  }
}
