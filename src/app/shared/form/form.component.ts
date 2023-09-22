import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Person } from '../types/person.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._model = {} as Person;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<Person>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
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
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
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

    // update form's values with model
    this._form.patchValue(this._model);
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
  submit(person: Person): void {
    this._submit$.emit(person);
  }

  /**
   * Function handle isManager checkbox value change
   */
  isManagerChecked(checked: boolean): void {
    this._form.patchValue({ isManager: checked });
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      photo: new FormControl(),
      firstname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      lastname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      entity: new FormControl(),
      email: new FormControl('', Validators.required),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('(0|\\+33)\\d{9}'),
        ])
      ),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
      }),
      isManager: new FormControl(),
    });
  }
}
