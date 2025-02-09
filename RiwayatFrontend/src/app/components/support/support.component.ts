// support.component.ts
import { Component, OnInit } from '@angular/core';
import { DevService } from '../../services/dev-dervice/dev-service.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  members: any[] = [];

  constructor(private devService: DevService) {}

  ngOnInit(): void {
    this.devService.getTeamMembers().subscribe((data) => {
      this.members = data.map(member => ({
        name: member.name,
        role: member.role,
        mail: member.email,
        image: member.image
      }));
    });
  }

  sendEmail(email: string): void {
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
  }
  
}
