import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(public cart: CartService) {}

  get cartCount(): number {
    return this.cart.getItemCount();
  }
}
