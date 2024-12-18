import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrl: './admin-notification.component.scss'
})
export class AdminNotificationComponent {
  notifications: { title: string, content: string }[] = [
    { title: "New Event Scheduled", content: "New Event: ByteWave - Riwayat Launch, Scheduled for November 10th, 2024" },
    { title: "Booking Confirmation", content: "Musician: 'SXMPRA', has Been Booked for 30th February, 2024" },
    { title: "Message from the Client", content: "Hi There! Can you please tell me when are you free for a call, Thanks." }
];
}
