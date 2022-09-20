import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nwt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

}
