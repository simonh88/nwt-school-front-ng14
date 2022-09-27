import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from '../shared/types/person.type';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: Person;
  // private property to store all backend URLs
  private readonly _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._person = {} as Person;
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach((k: string) => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Returns private property _person
   */
  get person(): Person {
    return this._person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._http.get<Person[]>(this._backendURL.allPeople)
      .subscribe({ next: (people: Person[]) => this._person = people[0] });
  }

  /**
   * Returns random people
   */
  random(): void {
    this._http.get<Person>(this._backendURL.randomPeople)
      .subscribe({ next: (person: Person) => this._person = person });
  }
}
