import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { PRODUCTS } from '../../data/products.data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = PRODUCTS;

  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  addToCart(product: Product): void {
    this.cart.addItem(product);
    this.router.navigate(['/cart']);
  }
}
