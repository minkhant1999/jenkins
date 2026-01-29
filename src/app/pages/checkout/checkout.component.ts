import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  items: CartItem[] = [];
  submitted = false;

  form = {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  };

  constructor(
    private cart: CartService,
    private router: Router
  ) {
    this.items = this.cart.getItems();
    if (this.items.length === 0 && !this.submitted) {
      this.router.navigate(['/cart']);
    }
  }

  get total(): number {
    return this.cart.getTotal();
  }

  onSubmit(): void {
    this.submitted = true;
    this.cart.clearCart();
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  backToShop(): void {
    this.router.navigate(['/products']);
  }
}
