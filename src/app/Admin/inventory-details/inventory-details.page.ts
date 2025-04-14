import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../Services/inventory.service';
import { CategoryService } from '../../Services/category.service';
import { NavController } from '@ionic/angular';

interface InventoryRecord {
  categoryId: number | null;
  productId: number;
  date: string;
  [key: string]: any;
}

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html',
  styleUrls: ['./inventory-details.page.scss'],
})
export class InventoryDetailsPage implements OnInit {
  availableDates: string[] = []; 
  selectedDate: string = '';
  inventoryDetails: InventoryRecord[] = []; 
  groupedInventoryDetails: any = []; 
  categories: any[] = []; 
  isModalOpen: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
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

  openModal() {
    if (this.selectedDate) {
      this.fetchInventory(); // Pobranie danych
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  fetchInventory() {
    if (this.selectedDate) {
      const dateParts = this.selectedDate.split('T')[0];
      const parts = dateParts.split('-');
      if (parts.length === 3) {
        const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
  
        this.inventoryService.getRecordsByDate(formattedDate).subscribe(
          (inventory: any[]) => { // Oczekujemy tablicy
            console.log('Dane inwentaryzacji:', inventory);
  
            if (inventory && Array.isArray(inventory) && inventory.length > 0) {
              // Wyciągnięcie wszystkich rekordów
              const allRecords = inventory
                .map((inv: any) => inv.inventoryRecords || [])
                .reduce((acc: InventoryRecord[], records: InventoryRecord[]) => acc.concat(records), []);
              this.inventoryDetails = allRecords;
  
              if (this.inventoryDetails.length > 0) {
                // Grupowanie rekordów według kategorii
                this.groupedInventoryDetails = this.groupByCategory(this.inventoryDetails);
              } else {
                console.log('Brak rekordów dla tej daty.');
                this.groupedInventoryDetails = [];
              }
            } else {
              console.log('Brak rekordów dla tej daty.');
              this.inventoryDetails = [];
              this.groupedInventoryDetails = [];
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

  groupByCategory(records: InventoryRecord[]): any[] {
    // Grupowanie rekordów według identyfikatora produktu i kategorii
    const recordsByProductAndCategory = records.reduce((acc, record) => {
      const key = `${record.categoryId}-${record.productId}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {} as { [key: string]: InventoryRecord[] });
  
    // Przetwarzanie rekordów w grupach, aby znaleźć poprawne ilości
    const processedRecords: InventoryRecord[] = Object.values(recordsByProductAndCategory)
      .map((group) => {
        // Sortowanie po dacie w kolejności rosnącej
        group.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
        // Rekonstrukcja ilości na podstawie previousQuantity
        let currentQuantity = group[0]['previousQuantity'] || 0; // Ilość początkowa
        return group.map((record) => {
          const updatedRecord = { ...record, currentQuantity }; // Dodanie pola currentQuantity
          currentQuantity = record['quantity']; // Aktualizacja bieżącej ilości na podstawie rekordu
          return updatedRecord;
        });
      })
      .reduce((acc, group) => acc.concat(group), []); // Spłaszczanie tablicy grup
  
    // Grupowanie według kategorii
    const grouped = this.categories
      .map((category) => ({
        categoryName: category.name,
        categoryId: category.id,
        records: processedRecords.filter((record) => record.categoryId === category.id),
      }))
      .filter((group) => group.records.length > 0); // Usuń puste kategorie
  
    // Dodanie rekordów bez kategorii
    const uncategorizedRecords = processedRecords.filter(
      (record) =>
        !record.categoryId || !this.categories.find((cat) => cat.id === record.categoryId)
    );
  
    if (uncategorizedRecords.length > 0) {
      grouped.push({
        categoryName: 'Brak kategorii',
        categoryId: null,
        records: uncategorizedRecords,
      });
    }
  
    console.log('Rekordy po zgrupowaniu:', grouped); // Debug
    return grouped;
  }
  
  loadData(event: any) {
    // Obsługa logiki pobierania więcej danych, na przykład doładowanie danych przy scrollowaniu
    setTimeout(() => {
      console.log('Data ładowana...');
      // Tutaj dodaj logiczne doładowanie danych
      event.target.complete();
    }, 500); // Może być inny czas opóźnienia
  }

  goBack() {
    this.navCtrl.back();
  }
}
