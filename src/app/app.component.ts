import { Component } from '@angular/core';

@Component({
  selector: 'nwt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // private property to store name value
  private readonly _name: string;

  /**
   * Component constructor
   */
  constructor() {
    this._name = 'Angular Fans';
  }

  /**
   * Returns private property _name
   */
  get name(): string {
    return this._name;
  }
}
