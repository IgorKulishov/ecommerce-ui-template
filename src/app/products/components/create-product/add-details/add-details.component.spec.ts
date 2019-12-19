import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AddDetailsComponent } from './add-details.component';
import {ProductsService} from '../../../../core/services/products.service';
import {productsReducer} from '../../../store/reducers/reducers';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddDetailsComponent ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                StoreModule.forFeature('productsReducer', productsReducer)
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
