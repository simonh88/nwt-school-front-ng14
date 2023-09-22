import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/types/person.type';
import { PeopleService } from '../shared/services/people.service';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: Person;

  /**
   * Component constructor
   */
  constructor(private _peopleService: PeopleService) {
    this._person = {} as Person;
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
    this.random();
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
