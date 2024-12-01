import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlcoholSelectionPage } from './alcohol-selection.page';

describe('AlcoholSelectionPage', () => {
  let component: AlcoholSelectionPage;
  let fixture: ComponentFixture<AlcoholSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
