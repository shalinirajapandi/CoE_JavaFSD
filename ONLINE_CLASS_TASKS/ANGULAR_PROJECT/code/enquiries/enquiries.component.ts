import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {
  enquiries: any[] = [];

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.fetchEnquiries();
  }

  fetchEnquiries(): void {
    this.enquiryService.getEnquiries().subscribe(
      (data) => {
        this.enquiries = data;
      },
      (error) => {
        console.error('Error fetching enquiries:', error);
      }
    );
  }

  onCardClick(enquiry: any): void {
    alert(`Enquiry from ${enquiry.name}: ${enquiry.message}`);
  }

  sendResponse(enquiry: any) {
    if (enquiry.response) {
      enquiry.sentResponse = enquiry.response; 
      enquiry.response = ''; 
    } else {
      alert('Please enter a response before sending.');
    }
  }
  
}
