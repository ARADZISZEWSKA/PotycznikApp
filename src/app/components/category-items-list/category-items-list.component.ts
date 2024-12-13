import { Component, Input, OnInit } from '@angular/core';
//import { DataService } from '../../services/data.service'; // Service for fetching data

@Component({
  selector: 'app-category-items-list',
  templateUrl: './category-items-list.component.html',
  styleUrls: ['./category-items-list.component.scss'],
})
export class CategoryItemsListComponent implements OnInit {
  @Input() category: string = ''; // Receives the category from parent
  items: any[] = []; // Items to display

  constructor(//private dataService: DataService
    ) {}

  ngOnInit() {
    if (this.category) {
      this.loadItems();
    }
  }

  loadItems() {
    //this.dataService.getItemsByCategory(this.category).subscribe((data) => {
     // this.items = data;
    //});
  }
}
