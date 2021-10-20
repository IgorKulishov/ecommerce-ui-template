import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AllOrdersContentComponent } from './all-orders-content.component';

describe('AllOrdersContentComponent', () => {
  let component: AllOrdersContentComponent;
  let fixture: ComponentFixture<AllOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllOrdersContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should change chevron index # 1 to open position if it was closed',
    waitForAsync(() => {
      fixture.detectChanges();
      component.changeChevronDirection(1);
      expect(component.accordionPosition[1]).toBe(true);
    })
  );

  it(
    'should change chevron index # 1 to close position if it was open',
    waitForAsync(() => {
      fixture.detectChanges();
      component.changeChevronDirection(1);
      component.changeChevronDirection(1);
      expect(component.accordionPosition[1]).toBe(false);
    })
  );
});
