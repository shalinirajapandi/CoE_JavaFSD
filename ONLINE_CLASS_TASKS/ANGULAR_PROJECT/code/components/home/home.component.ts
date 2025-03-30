import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; 
import { HomeService } from '../../services/home.service';
import { Collection } from '../../model/collection.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  collections: Collection[] = []; 
  isLoggedIn: boolean = false; 

  constructor(
    private homeService: HomeService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus(); 
    this.fetchCollections(); 
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  fetchCollections(): void {
    this.homeService.getCollections().subscribe(
      (data) => {
        console.log('API Response:', data);
        this.collections = data; 
        console.log('Collections:', this.collections); 
      },
      (error) => {
        console.error('Error fetching collections:', error);
        this.collections = []; 
      }
    );
  }

  navigateToSignIn(): void {
    this.router.navigate(['/signin']);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); 
    this.isLoggedIn = false; 
    this.router.navigate(['/home']); 
  }
}