import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Person } from '../types/person.type';

@Directive({
  selector: '[nwtBadge]',
})
export class BadgeDirective implements OnInit {
  // private property to store person value
  private _person: Person;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2) {
    this._person = {} as Person;
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
    of(this._person)
      .pipe(filter((person: Person) => !!person && person.isManager))
      .subscribe({
        next: () =>
          this._rd.setProperty(
            this._el.nativeElement,
            'innerHTML',
            '<i class="material-icons">supervisor_account</i>'
          ),
      });
  }
}
