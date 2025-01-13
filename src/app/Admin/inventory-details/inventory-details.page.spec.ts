import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDetailsPage } from './inventory-details.page';

describe('InventoryDetailsPage', () => {
  let component: InventoryDetailsPage;
  let fixture: ComponentFixture<InventoryDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
