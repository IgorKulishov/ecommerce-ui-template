import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AddDetailsComponent } from './add-details.component';
import {ProductsService} from '../../../../core/services/products.service';
import {productsReducer} from '../../../store/reducers/reducers';
import { RouterTestingModule } from '@angular/router/testing';
export class ProductsServiceStub {
    getAllProducts(): any {}
    getProductDetails(path: any) {}
    create(data?: any): any {}
}
export class RouterStub {
    navigate(routes: string []) {
    }
}


describe('CreateProductComponent', () => {
    let component: AddDetailsComponent;
    let fixture: ComponentFixture<AddDetailsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ AddDetailsComponent ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('productsReducer', productsReducer),
                RouterTestingModule
            ],
            providers: [
                {provide: ProductsService, useClass: ProductsServiceStub},
                {provide: Router, useClass: RouterStub},
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
