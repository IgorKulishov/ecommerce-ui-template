import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersContentComponent } from './all-orders-content.component';

describe('AllOrdersContentComponent', () => {
  let component: AllOrdersContentComponent;
  let fixture: ComponentFixture<AllOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdersContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
