import { Component, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'kdz-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnDestroy {
  readonly name = environment.name;
  readonly mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('snav') private readonly _snav: MatSidenav;
  constructor (public readonly authService: AuthenticationService,
    media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    router.events.subscribe(event => {
      if (this.mobileQuery.matches && event instanceof NavigationEnd) {
        this._snav.close();
      }
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
