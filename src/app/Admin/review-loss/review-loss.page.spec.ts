import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewLossPage } from './review-loss.page';

describe('ReviewLossPage', () => {
  let component: ReviewLossPage;
  let fixture: ComponentFixture<ReviewLossPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
