import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  isLoggedIn: boolean = false; 
  private cartSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log('isLoggedIn:', this.isLoggedIn); 
    });

    this.cartSubscription = this.cartService.getCartItems().subscribe({
      next: () => {
        this.cartItemCount = this.cartService.getTotalItems(); 
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
        this.cartItemCount = 0; 
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }
}