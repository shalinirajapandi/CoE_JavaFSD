import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  isSubmitting = false; // Add this flag

  constructor(private formBuilder: FormBuilder, private enquiryService: EnquiryService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true; // Start loading

    this.enquiryService.sendEnquiry(this.contactForm.value).subscribe(
      (response) => {
        console.log('Enquiry Sent:', response);
        this.successMessage = 'Message Sent Successfully!';
        this.isSubmitting = false; // Stop loading

        this.contactForm.reset();
        this.submitted = false;

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      (error) => {
        console.error('Error sending enquiry:', error);
        this.isSubmitting = false; // Stop loading
        this.successMessage = 'Failed to send message. Please try again.';
      }
    );
  }
}
