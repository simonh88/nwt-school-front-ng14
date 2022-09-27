import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../types/person.type';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store person value
  private _person: Person;

  /**
   * Component constructor
   */
  constructor() {
    this._person = {} as Person;
  }

  /**
   * Returns private property _person
   */
  get person(): Person {
    return this._person;
  }

  /**
   * Sets private property _person
   */
  @Input()
  set person(person: Person) {
    this._person = person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }
}
