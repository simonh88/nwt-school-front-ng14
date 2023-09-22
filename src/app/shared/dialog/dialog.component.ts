import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Person } from '../types/person.type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  /**
   * Component constructor
   */
  constructor(
    private _dialogRef: MatDialogRef<DialogComponent, Person>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _person: Person
  ) {}

  /**
   * Returns person passed in dialog open
   */
  get person(): Person {
    return this._person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(person: Person): void {
    this._dialogRef.close(person);
  }
}
