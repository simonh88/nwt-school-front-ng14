import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, defaultIfEmpty, filter, map, mergeMap } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { PeopleService } from '../shared/services/people.service';
import { Person } from '../shared/types/person.type';

@Component({
  selector: 'nwt-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  // private property to store people value
  private _people: Person[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent, Person> | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _peopleService: PeopleService,
    private _dialog: MatDialog
  ) {
    this._people = [];
    this._dialogStatus = 'inactive';
  }

  /**
   * Returns private property _people
   */
  get people(): Person[] {
    return this._people;
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._peopleService
      .fetch()
      .pipe(
        filter((people: Person[]) => !!people),
        defaultIfEmpty([])
      )
      .subscribe({ next: (people: Person[]) => (this._people = people) });
  }

  /**
   * Function to delete one person
   */
  delete(person: Person): void {
    this._peopleService
      .delete(person.id as string)
      .subscribe(
        (id: string) =>
          (this._people = this._people.filter((p: Person) => p.id !== id))
      );
  }

  /**
   * Function to display modal
   */
  showDialog(): void {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._peopleDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog
      .afterClosed()
      .pipe(
        filter((person: Person | undefined) => !!person),
        map((person: Person | undefined) => {
          // delete obsolete attributes in original object which are not required in the API
          delete person?.photo;

          return person;
        }),
        mergeMap((person: Person | undefined) => this._add(person))
      )
      .subscribe({
        next: (person: Person) => (this._people = this._people.concat(person)),
        error: () => (this._dialogStatus = 'inactive'),
        complete: () => (this._dialogStatus = 'inactive'),
      });
  }

  /**
   * Add new person
   */
  private _add(person: Person | undefined): Observable<Person> {
    return this._peopleService.create(person as Person);
  }
}
