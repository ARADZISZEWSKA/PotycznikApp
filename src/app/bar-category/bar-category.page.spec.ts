import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarCategoryPage } from './bar-category.page';

describe('BarCategoryPage', () => {
  let component: BarCategoryPage;
  let fixture: ComponentFixture<BarCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
