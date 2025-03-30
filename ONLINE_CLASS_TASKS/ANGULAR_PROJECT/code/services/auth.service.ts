import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.isLoggedInSubject.next(localStorage.getItem('isLoggedIn') === 'true');
  }

  login(username: string): void {  
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', username); 
    this.isLoggedInSubject.next(true); 
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser'); 
    this.isLoggedInSubject.next(false);
  }

  getUsername(): string | null {
    return localStorage.getItem('loggedInUser'); 
  }
}
