import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersFilterComponent } from './all-orders-filter.component';

describe('AllOrdersFilterComponent', () => {
  let component: AllOrdersFilterComponent;
  let fixture: ComponentFixture<AllOrdersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdersFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
