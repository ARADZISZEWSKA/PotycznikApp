import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../Services/inventory.service';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html',
  styleUrls: ['./inventory-details.page.scss'],
})
export class InventoryDetailsPage implements OnInit {
  availableDates: string[] = []; // Lista dostępnych dat
  selectedDate: string = ''; // Wybrana data przez użytkownika
  inventoryDetails: any = []; // Szczegóły inwentaryzacji
  groupedInventoryDetails: any = []; // Dane pogrupowane według kategorii
  categories: any[] = []; // Kategorie pobrane z CategoryService

  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Pobranie listy dat
    this.inventoryService.getAvailableDates().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.availableDates = response;
        } else if (response.$values) {
          this.availableDates = response.$values;
        } else {
          console.error('Otrzymano nieoczekiwany format danych');
        }
      },
      (error) => {
        console.error('Błąd podczas pobierania dostępnych dat:', error);
      }
    );

    // Pobranie kategorii
    this.categoryService.getCategories().subscribe(
      (categories: any) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Błąd podczas pobierania kategorii:', error);
      }
    );
  }

  fetchInventory() {
    if (this.selectedDate) {
      const dateParts = this.selectedDate.split('T')[0];
      const parts = dateParts.split('-');
      if (parts.length === 3) {
        const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;

        this.inventoryService.getRecordsByDate(formattedDate).subscribe(
          (inventory: any) => {
            if (inventory && inventory.inventoryRecords) {
              this.inventoryDetails = inventory.inventoryRecords;

              // Grupowanie rekordów według kategorii
              this.groupedInventoryDetails = this.groupByCategory(this.inventoryDetails);
            } else {
              this.inventoryDetails = [];
              this.groupedInventoryDetails = [];
              console.log('Brak rekordów dla tej daty.');
            }
          },
          (error) => {
            console.error('Błąd podczas pobierania rekordów:', error);
            this.inventoryDetails = [];
            this.groupedInventoryDetails = [];
          }
        );
      } else {
        console.error('Nieprawidłowy format daty');
      }
    } else {
      console.log('Nie wybrano daty.');
      this.inventoryDetails = [];
      this.groupedInventoryDetails = [];
    }
  }

  /**
   * Grupowanie rekordów według kategorii
   */
  groupByCategory(records: any[]): any[] {
    const grouped = this.categories
      .map((category) => ({
        categoryName: category.name,
        categoryId: category.id,
        records: records.filter((record) => record.categoryId === category.id),
      }))
      .filter((group) => group.records.length > 0); // Usuń puste kategorie

    // Dodanie rekordów bez kategorii
    const uncategorizedRecords = records.filter(
      (record) => !record.categoryId || !this.categories.find((cat) => cat.id === record.categoryId)
    );

    if (uncategorizedRecords.length > 0) {
      grouped.push({
        categoryName: 'Brak kategorii',
        categoryId: null,
        records: uncategorizedRecords,
      });
    }

    return grouped;
  }
}
