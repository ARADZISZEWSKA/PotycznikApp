import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.page.html',
  styleUrls: ['./category-items.page.scss'],
})
export class CategoryItemsPage implements OnInit {
  category: string | null = null; // Holds the category passed in the route

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
  }
}
