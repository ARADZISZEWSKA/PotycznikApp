import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LossesPage } from './losses.page';

describe('LossesPage', () => {
  let component: LossesPage;
  let fixture: ComponentFixture<LossesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LossesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
