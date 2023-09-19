import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Person } from '../types/person.type';

@Component({
  selector: 'nwt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Person;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Person>;

  /**
   * Component constructor
   */
  constructor() {
    this._model = {} as Person;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<Person>();
    this._cancel$ = new EventEmitter<void>();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Person) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Person {
    return this._model;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Person> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to handle component update
   */
  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        firstname: '',
        lastname: '',
        entity: 'LMFI',
        email: '',
        phone: '',
        address: {
          postalCode: '',
          street: '',
          city: '',
        },
        isManager: false,
      };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(): void {
    this._submit$.emit(this._model);
  }
}
