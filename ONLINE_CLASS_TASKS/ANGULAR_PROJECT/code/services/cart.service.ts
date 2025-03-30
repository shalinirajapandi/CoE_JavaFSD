import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: any): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.updateCartState();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartState();
  }

  updateQuantity(productId: number, change: number): void {
    const product = this.cartItems.find(item => item.id === productId);

    if (product) {
      product.quantity = Math.max(1, product.quantity + change);

      if (product.quantity === 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCartState();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCartState(): void {
    this.cartItemsSubject.next([...this.cartItems]);
  }
}
