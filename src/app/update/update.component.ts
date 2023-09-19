import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/types/person.type';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'nwt-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent, Person> | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog
  ) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(
      (k) =>
        (this._backendURL[k] = `${baseUrl}${
          environment.backend.endpoints[
            k as keyof typeof environment.backend.endpoints
          ]
        }`)
    );
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._fetchOne(id))
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
          delete person?.birthDate;

          return { id, update: person };
        }),
        mergeMap((_: { id: any; update: any }) => this._update(_.id, _.update))
      )
      .subscribe({
        error: () => this._router.navigate(['/people']),
        complete: () => this._router.navigate(['/people']),
      });
  }

  /**
   * Update a person in the list
   */
  private _update(id: string, person: Person): Observable<Person> {
    return this._http.put<Person>(
      this._backendURL.onePeople.replace(':id', id),
      person,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  /**
   * Returns an observable which fetch one person by id
   */
  private _fetchOne(id: string): Observable<Person> {
    return this._http.get<Person>(
      this._backendURL.onePeople.replace(':id', id)
    );
  }
}
