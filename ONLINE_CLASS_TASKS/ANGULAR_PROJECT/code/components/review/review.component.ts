import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  selectedEmoji: string = ''; 
  reviewText: string = ''; 
  submitted: boolean = false; 
  reviewDate: Date | null = null; 
  username: string | null = '';
  constructor() {
    this.username = localStorage.getItem('loggedInUser'); 
  }
  selectEmoji(emoji: string): void {
    this.selectedEmoji = emoji;
  }

  submitReview(): void {
    if (this.selectedEmoji && this.reviewText) {
      this.reviewDate = new Date(); 
      this.submitted = true; 
    } else {
      alert('Please select an emoji and write a review.'); 
    }
  }
}