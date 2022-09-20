import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'nwt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * Component constructor
   */
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIcon(
      'icon-delete',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-delete.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'icon-edit',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-edit.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'icon-maps',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-maps.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'icon-phone',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-phone.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'icon-mail',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-mail.svg'
      )
    );
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}
}
