import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../_static/people';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private readonly _person: any;

  /**
   * Component constructor
   */
  constructor() {
    this._person = PEOPLE[0];
  }

  /**
   * Returns private property _person
   */
  get person(): any {
    return this._person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }
}
