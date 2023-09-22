import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Person } from '../types/person.type';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default person
  private readonly _defaultPerson: Person;

  constructor(private _http: HttpClient) {
    this._defaultPerson = {
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      firstname: 'firstname',
      lastname: 'lastname',
      entity: 'entity',
      email: 'email@ema.il',
      phone: '1234567890',
      address: {
        postalCode: '12345',
        street: 'street',
        city: 'city',
      },
      isManager: false,
    };
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
        // @ts-ignore
        (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  /**
   * Function to return list of person
   */
  fetch(): Observable<Person[]> {
    return this._http.get<Person[]>(this._backendURL.allPeople).pipe(
      filter((people: Person[]) => !!people),
      defaultIfEmpty([])
    );
  }

  /**
   * Function to return one random person from people list
   */
  fetchRandom(): Observable<Person> {
    return this._http.get<Person>(this._backendURL.randomPeople).pipe(
      filter((person: Person) => !!person),
      defaultIfEmpty(this._defaultPerson)
    );
  }

  /**
   * Function to return one person for current id
   */
  fetchOne(id: string): Observable<Person> {
    return this._http.get<Person>(
      this._backendURL.onePeople.replace(':id', id)
    );
  }

  /**
   * Function to create a new person
   */
  create(person: Person): Observable<any> {
    return this._http.post<Person>(
      this._backendURL.allPeople,
      person,
      this._options()
    );
  }

  /**
   * Function to update one person
   */
  update(id: string, person: Person): Observable<any> {
    return this._http.put<Person>(
      this._backendURL.onePeople.replace(':id', id),
      person,
      this._options()
    );
  }

  /**
   * Function to delete one person for current id
   */
  delete(id: string): Observable<string> {
    return this._http
      .delete(this._backendURL.onePeople.replace(':id', id))
      .pipe(map(() => id));
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return {
      headers: new HttpHeaders(
        Object.assign({ 'Content-Type': 'application/json' }, headerList)
      ),
    };
  }
}
