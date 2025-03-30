import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutItems: any[] = []; 
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.checkoutItems = [...items]; 
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeItem(index: number) {
    this.checkoutItems.splice(index, 1); 
    this.calculateTotal();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(this.checkoutItems.indexOf(item));
    }
    this.calculateTotal();
  }

  placeOrder() {
    alert('Order placed successfully!');
    this.checkoutItems = [];
    this.totalAmount = 0;
  }
}
