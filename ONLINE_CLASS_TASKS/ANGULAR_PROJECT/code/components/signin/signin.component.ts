// signin.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('0.8s ease-out')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-10px)'
      })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('underline', [
      state('void', style({
        transform: 'scaleX(0)'
      })),
      transition('void => *', [
        animate('1.5s ease')
      ])
    ]),
    trigger('shake', [
      transition('* => *', [
        animate('0.5s', style({ transform: 'translateX(-5px)' })),
        animate('0.5s', style({ transform: 'translateX(5px)' })),
        animate('0.5s', style({ transform: 'translateX(-5px)' })),
        animate('0.5s', style({ transform: 'translateX(5px)' })),
        animate('0.5s', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  usernameError: boolean = false;
  passwordError: boolean = false;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  onSubmit(): void {
    this.usernameError = !this.username;
    this.passwordError = !this.password;
    
    if (this.username && this.password) {
      if (this.username === 'shalini' && this.password === 'shalz') {
        this.authService.login(this.username);
        
        // Redirect after slight delay to allow for animation
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);
      } else {
        alert('Invalid username or password');
      }
    }
  }
}