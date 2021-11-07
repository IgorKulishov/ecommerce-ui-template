import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ordersOnDate } from '../../../../../test/mock';

import { AllOrdersContentComponent } from './all-orders-content.component';
import {Component, NO_ERRORS_SCHEMA} from "@angular/core";

@Component({
  selector: "parent",
  template: `<all-orders-content
    [allOrdersDetails]="allOrdersDetails"
    [ordersOnDate] = 'ordersOnDate'
  ></all-orders-content>`
})
export class HostComponent {
  allOrdersDetails = [];
  ordersOnDate = ordersOnDate;
}

describe('AllOrdersContentComponent', () => {
  let component: AllOrdersContentComponent;
  let fixture: ComponentFixture<AllOrdersContentComponent>;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AllOrdersContentComponent,
        HostComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(AllOrdersContentComponent, {
      set: {
        template: `<div class="container-fluid default-page-background">
  <div class="table-block">
    <table class="table ">
      <thead class="text-center">
        <tr>
          <!-- <th id="image">Some header info</th> -->
        </tr>
      </thead>
      <!-- fullscreen view -->
      <tbody *ngFor='let orderOnDate of ordersOnDate' id="order-block-for-desktop">
        <tr>
          <td>
            <pre >
              {{orderOnDate | json}}
            </pre>
          </td>
        </tr>
      </tbody>

      <!-- mobile view -->
      <tbody *ngFor='let orderOnDate of ordersOnDate; let i = index' id="order-block-for-mobile">
        <accordion [isAnimated]="true">
          <accordion-group>
            <button id="modalBtn" class="btn btn-link" accordion-heading type="button" (click)='changeChevronDirection(i)'>
              <div class="row">
                <div class="col-10 text-left">
                  <!-- here will be order's date -->
                </div>
                <div class="col-2 text-right">
                  <img [ngClass]="{'expanded-block': accordionPosition && accordionPosition[i], 'close-block': (accordionPosition && !accordionPosition[i])}" src="../../../../assets/svg/arrow-rounded-right-6x9.svg" alt="Right caret">
                </div>
              </div>
            </button>

            <div class="all-block-item">
              {{orderOnDate}}
            </div>
          </accordion-group>
        </accordion>
      </tbody>
    </table>
  </div>
</div>
`
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersContentComponent);
    hostFixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    hostFixture.detectChanges();
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

  it('should render name of the product', () => {
    const element = fixture.debugElement.query(By.css('.table-block')).nativeElement;
    console.log(element);
  })
});
