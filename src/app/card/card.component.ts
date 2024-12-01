import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() subHeader: string = '';  // Dla nagłówka
  @Input() options: string[] = [];  // Dla opcji
  @Input() hasBackButton: boolean = false; // Dla przycisku "Wróć"
  @Input() showHeader: boolean = true; // Decyzja o wyświetlaniu nagłówka
  @Input() userName: string = 'użytkownik'; // Imię użytkownika

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() backClicked: EventEmitter<void> = new EventEmitter<void>();

  onOptionClick(option: string) {
    this.optionSelected.emit(option);
  }

  goBack() {
    this.backClicked.emit();
  }
}
