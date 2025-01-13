import { Component } from '@angular/core';
import { InventoryService } from '../../Services/inventory.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html',
  styleUrls: ['./inventory-details.page.scss'],
})
export class InventoryDetailsPage {
  availableDates: string[] = [];  // Przechowujemy listę dostępnych dat
  selectedDate: string = '';       // Wybierana data przez użytkownika
  inventoryDetails: any = [];      // Szczegóły do wyświetlenia po wyborze daty

  constructor(private inventoryService: InventoryService) {}

  
  ngOnInit() {
    this.inventoryService.getAvailableDates().subscribe(
      (response: any) => {  
        if (Array.isArray(response)) {
          this.availableDates = response;  // backend zwraca tablicę
        } else if (response.$values) {
          this.availableDates = response.$values;  // Obsługa JSON-a zawierającego $values
        } else {
          console.error('Otrzymano nieoczekiwany format danych');
        }
      },
      (error) => {
        console.error('Błąd podczas pobierania dostępnych dat:', error);
      }
    );
  }
  
  fetchInventory() {
    if (this.selectedDate) {
      console.log('Wybrana data przed formatowaniem:', this.selectedDate);  // Debug do logowania

      const dateParts = this.selectedDate.split('T')[0];  // Rozdzielenie daty od godziny 'T'
      const parts = dateParts.split('-');  // Podział na rok, miesiąc, dzień
      if (parts.length === 3) {
        const yyyy = parts[0];
        const mm = parts[1];
        const dd = parts[2];
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        console.log('Wybrana data (dd.mm.yyyy):', this.selectedDate);  // Debug do logowania
        console.log('Wybrana data (yyyy-mm-dd):', formattedDate);  // Wydrukujemy, jak wygląda ta data w nowym formacie

        this.inventoryService.getRecordsByDate(formattedDate).subscribe(
          (inventory: any) => {
            console.log('Rekordy z backendu:', inventory);  // Log dla odpowiedzi backendu
            console.log('Data z backendu:', inventory.Date);  // Zobaczmy, jaką datę zwraca backend

            if (inventory && inventory.inventoryRecords && inventory.inventoryRecords.length > 0) {
              this.inventoryDetails = inventory.inventoryRecords;
            } else {
              this.inventoryDetails = [];
              console.log('Brak danych dla tej daty.');
            }
          },
          (error) => {
            console.error('Błąd podczas pobierania rekordów:', error);
            this.inventoryDetails = [];
          }
        );
      } else {
        console.error('Nieprawidłowy format daty');
      }
    } else {
      console.log('Nie wybrano daty.');
      this.inventoryDetails = [];
    }
  }

}