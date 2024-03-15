import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  @Input() products: Product[] = [];

  @Output() selected = new EventEmitter<Product>();

  select(product: Product){
    this.selected.emit(product);
  }
}
