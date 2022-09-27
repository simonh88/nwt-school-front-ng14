import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/types/person.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { defaultIfEmpty, filter } from 'rxjs';

@Component({
  selector: 'nwt-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  // private property to store people value
  private _people: Person[];
  // private property to store all backend URLs
  private readonly _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._people = [];
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
   * Returns private property _people
   */
  get people(): Person[] {
    return this._people;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._http
      .get<Person[]>(this._backendURL.allPeople)
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
    this._http
      .delete(this._backendURL.onePeople.replace(':id', person.id))
      .subscribe({
        next: () =>
          (this._people = this._people.filter(
            (p: Person) => p.id !== person.id
          )),
      });
  }
}
