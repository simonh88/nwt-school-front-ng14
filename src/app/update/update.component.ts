import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { PeopleService } from '../shared/services/people.service';
import { Person } from '../shared/types/person.type';

@Component({
  selector: 'nwt-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent, Person> | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _peopleService: PeopleService,
    private _dialog: MatDialog
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._peopleService.fetchOne(id))
      )
      .subscribe((person: Person) => this._initModal(person));
  }

  /**
   * Initialize modal process
   */
  private _initModal(person: Person): void {
    // create modal with initial data inside
    this._peopleDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: person,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog
      .afterClosed()
      .pipe(
        filter((person: Person | undefined) => !!person),
        map((person: Person | undefined) => {
          // get person id
          const id = person?.id;
          // delete obsolete attributes in original object which are not required in the API
          delete person?.id;
          delete person?.photo;

          return { id, update: person };
        }),
        mergeMap((_: { id: any; update: any }) =>
          this._peopleService.update(_.id, _.update)
        )
      )
      .subscribe({
        error: () => this._router.navigate(['/people']),
        complete: () => this._router.navigate(['/people']),
      });
  }
}
