import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:5000/api/vendors'; // Your API base URL

  constructor(private http: HttpClient) {}

  searchVendors(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${term}`);
  }
}
