import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public navigateInContext(targetUrlSegment: string, extras?: NavigationExtras): void {
    const currentUrl = this.router.url;
    const prefix = currentUrl.substr(0, currentUrl.lastIndexOf('/'));
    const newTarget = targetUrlSegment.charAt(0) === '/' ? targetUrlSegment : '/' + targetUrlSegment;
    const newUrl = prefix + newTarget;

    if (this.inAuxRoute(currentUrl)) {
      this.router.navigateByUrl(`${newUrl})`); // primary-router(router-outlet:mf/targetUrlSegment)
    } else {
      this.router.navigate(
        [newUrl],
        extras ? Object.assign({ relativeTo: this.activatedRoute }, extras) : { relativeTo: this.activatedRoute }
      );
    }
  }

  inAuxRoute(route: string): boolean {
    return route.indexOf('(') !== -1 && route.indexOf(')') !== -1;
  }
}
