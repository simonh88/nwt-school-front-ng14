import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Person } from '../types/person.type';

@Component({
  selector: 'nwt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store add$ value
  private readonly _add$: EventEmitter<Person>;
  // private property to store photo src
  private readonly _photo: string;
  // private property to store isManager flag
  private _isManager: boolean;
  // private property to store entity
  private readonly _entity: string;

  /**
   * Component constructor
   */
  constructor() {
    this._add$ = new EventEmitter<Person>();
    this._cancel$ = new EventEmitter<void>();
    this._photo = 'https://randomuser.me/api/portraits/lego/6.jpg';
    this._isManager = false;
    this._entity = 'LMFI';
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel') get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }

  /**
   * Returns private property _add$
   */
  @Output('addPerson') get add$(): EventEmitter<any> {
    return this._add$;
  }

  /**
   * Returns private property _photo
   */
  get photo(): string {
    return this._photo;
  }

  /**
   * Returns private property _isManager
   */
  get isManager(): boolean {
    return this._isManager;
  }

  /**
   * Set private property _isManager
   */
  set isManager(is: boolean) {
    this._isManager = is;
  }

  /**
   * Returns private property _entity
   */
  get entity(): string {
    return this._entity;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to add new person
   */
  add(person: Person): void {
    this._add$.emit(person);
  }
}
