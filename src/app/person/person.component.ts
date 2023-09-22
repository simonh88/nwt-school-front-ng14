import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/types/person.type';
import { PeopleService } from '../shared/services/people.service';
import { filter, merge, mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  /**
   * Component constructor
   */
  constructor(
    private _peopleService: PeopleService,
    private _route: ActivatedRoute
  ) {
    this._person = {} as Person;
    this._isPerson = false;
  }

  // private property to store person value
  private _person: Person;

  /**
   * Returns private property _person
   */
  get person(): Person {
    return this._person;
  }

  // private property to store flag to know if it's a person
  private _isPerson: boolean;

  /**
   * Returns flag to know if we are on a profile or on HP
   */
  get isPerson(): boolean {
    return this._isPerson;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._peopleService.fetchOne(params.id)),
        tap(() => (this._isPerson = true))
      ),
      this._route.params.pipe(
        filter((params: any) => !params.id),
        mergeMap(() => this._peopleService.fetchRandom()),
        tap(() => (this._isPerson = false))
      )
    ).subscribe({
      next: (person: Person) => (this._person = person),
      error: () => {
        // manage error when user doesn't exist in DB
        this._person = this._peopleService.defaultPerson;
        this._isPerson = true;
      },
    });
  }

  /**
   * Returns random people
   */
  random(): void {
    this._peopleService
      .fetchRandom()
      .subscribe({ next: (person: Person) => (this._person = person) });
  }
}
