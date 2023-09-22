import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  /**
   * Function to control email with custom validator
   */
  static googleEmail(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /^\w+\.\w+@gmail\.com$/.test(control.value)
      ? null
      : {
          googleEmail: true,
        };
  }
}
