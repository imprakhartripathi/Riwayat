// dev.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorJsonService {
  private vendorUrl = 'http://localhost:5000/api/vendor'; // API URL // Path to your JSON file

  constructor(private http: HttpClient) {}

  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(this.vendorUrl);
  }
}
