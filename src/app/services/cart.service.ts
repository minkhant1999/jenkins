import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private readonly STORAGE_KEY = 'aquatic-plants-cart';

  constructor() {
    this.loadFromStorage();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  addItem(product: Product, quantity: number = 1): void {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    this.saveToStorage();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
      }
    }
  }

  getItemCount(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  clearCart(): void {
    this.items = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch {
      this.items = [];
    }
  }
}
