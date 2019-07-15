import { Component, Input } from '@angular/core';

export type Layout = 'grid'|'grid-with-features'|'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {
    @Input() products: any = [];
    @Input() layout: Layout = 'grid';
    @Input() grid: 'grid-3-sidebar'|'grid-4-full'|'grid-5-full' = 'grid-3-sidebar';
    @Input() limit = 16;
    @Input() offcanvas: 'always'|'mobile' = 'mobile';

    constructor(
    ) { }

    setLayout(value: Layout): void {
        this.layout = value;
    }

    onPageChange(page: number): void {
        // console.log(page);
    }
}
