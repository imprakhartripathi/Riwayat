// dev.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevService {
  private teamUrl = 'assets/team/team.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.teamUrl);
  }
}
