import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: CartItem[] = [];

  constructor(
    private cart: CartService,
    private router: Router
  ) {
    this.items = this.cart.getItems();
  }

  get total(): number {
    return this.cart.getTotal();
  }

  updateQuantity(item: CartItem, delta: number): void {
    const newQty = item.quantity + delta;
    this.cart.updateQuantity(item.id, newQty);
    this.items = this.cart.getItems();
  }

  remove(item: CartItem): void {
    this.cart.removeItem(item.id);
    this.items = this.cart.getItems();
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
