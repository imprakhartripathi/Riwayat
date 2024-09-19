import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';

@Component({
  selector: 'app-admin-event-creator',
  templateUrl: './admin-event-creator.component.html',
  styleUrl: './admin-event-creator.component.scss'
})
export class AdminEventCreatorComponent {

  vendors: { name: string; image: string }[] = [
    {name: 'Sxmpra', image: ''}
  ];
  dateType: string = 'singleDate';
  

  constructor(public dialog: MatDialog) {}

  openVendorDialog(): void {
    const dialogRef = this.dialog.open(AdminProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vendors.push(result);
      }
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d ? d >= today : false;
  };
}
