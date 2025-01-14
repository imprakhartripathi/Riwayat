// dev.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Planner {
  type: 'planner';
  name: string;
  bio: string;
  specialty: string;
  experience: number;
  plannerFare: string;
  tiers: Array<{
    name: string;
    fare: string;
    services: string;
    image: string;
  }>;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlannerJsonService {
  private plannerURL = 'http://localhost:5000/api/planner'; // API URL // Path to your JSON file

  constructor(private http: HttpClient) {}

  getPlanners(): Observable<any[]> {
    return this.http.get<any[]>(this.plannerURL);
  }
}
