import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectInvCatPage } from './select-inv-cat.page';

describe('SelectInvCatPage', () => {
  let component: SelectInvCatPage;
  let fixture: ComponentFixture<SelectInvCatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInvCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
