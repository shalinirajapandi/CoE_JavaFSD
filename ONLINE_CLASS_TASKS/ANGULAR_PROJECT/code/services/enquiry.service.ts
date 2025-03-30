import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = 'http://localhost:4500/enquiries'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  sendEnquiry(enquiryData: any): Observable<any> {
    return this.http.post(this.apiUrl, enquiryData);
  }

  getEnquiries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
