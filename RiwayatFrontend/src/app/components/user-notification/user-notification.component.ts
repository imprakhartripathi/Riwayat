import { Component } from '@angular/core';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.scss'
})
export class UserNotificationComponent {

  notifications: { title: string, content: string }[] = [
      { title: "New Offer on Wedding Package", content: "Get 30% Discount on Our Silver Wedding Package" },
      { title: "Booking Confirmation", content: "Musician: 'SXMPRA', has Been Booked for 30th February, 2024" },
      { title: "Message from the Vendor", content: "Hi There! Can you please tell me when are you free for a call, Thanks." }
  ];

}
