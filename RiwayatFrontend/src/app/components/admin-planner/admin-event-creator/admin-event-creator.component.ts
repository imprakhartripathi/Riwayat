import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorListComponent } from '../vendor-list/vendor-list.component';

@Component({
  selector: 'app-admin-event-creator',
  templateUrl: './admin-event-creator.component.html',
  styleUrls: ['./admin-event-creator.component.scss']
})
export class AdminEventCreatorComponent {

  vendors: { name: string; image: string }[] = [];
  dateType: string = 'singleDate';

  constructor(public dialog: MatDialog) {}

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return d ? d >= today : false;
  };

  openVendorDialog(): void {
    const dialogRef = this.dialog.open(VendorListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length > 0) {
        this.vendors = result; // Replace the current vendors with the selected ones
      }
    });
  }
}
