import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.scss']
})
export class UserSearchDialogComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = ['Decorations', 'Venue', 'Catering', 'Entertainment', 'Parties', 'Event Halls', 'Stage Setup'];
  filteredOptions!: Observable<string[]>;

  // Inject MatDialogRef in addition to Router
  constructor(private router: Router, private dialogRef: MatDialogRef<UserSearchDialogComponent>) {}

  ngOnInit() {
    // Initialize the filteredOptions observable to react to user input
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  // Filter options based on user input
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Navigate to the search results page and close the dialog
  selectSearchOption(option: string) {
    if (option) {
      this.router.navigate(['/search', option]);  // Navigate to UserSearchLanding with search term
      this.dialogRef.close();  // Close the dialog after navigation
    }
  }
}
