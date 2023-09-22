import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../types/person.type';
import { Router } from '@angular/router';
import { filter, of } from 'rxjs';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  // private property to store person value
  private _person: Person;
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Person>;

  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._person = {} as Person;
    this._delete$ = new EventEmitter<Person>();
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
   * Returns private property _delete$
   */
  @Output('deletePerson') get delete$(): EventEmitter<Person> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to emit event to delete current person
   */
  delete(person: Person): void {
    this._delete$.emit(person);
  }

  /**
   * Function to navigate to manager details
   */
  goToManagerIfExist(): void {
    of(this._person.managerId)
      .pipe(filter((managerId: string | undefined) => !!managerId))
      .subscribe((managerId: string | undefined) =>
        this._router.navigate(['/person', managerId])
      );
  }
}
