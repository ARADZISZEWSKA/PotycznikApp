import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectReviewCatPage } from './select-review-cat.page';

describe('SelectReviewCatPage', () => {
  let component: SelectReviewCatPage;
  let fixture: ComponentFixture<SelectReviewCatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReviewCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
