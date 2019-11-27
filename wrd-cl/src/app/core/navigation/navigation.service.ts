import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

/**
 * Provides convenient routing within the application by warping the {@link Router}.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Constructor
   * @param router The {@link Router}
   * @param activatedRoute The {@link ActivatedRoute} which can be used for relative (to) routing
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Absolute navigation as in `router.navigate([url], extras)`
   * @param url The url or context
   * @param extras The {@link NavigationExtras}
   */
  public navigate(url: string, extras?: NavigationExtras): void {
    this.router.navigate([url], extras);
  }

  /**
   * Navigates within the current context. E.g. the current url is `/assets/wrd-web/products/url-segment-a` and this function gets
   * invoked with the targetUrlSegment `url-segment-b`. The resulting url is `/assets/wrd-web/products/url-segment-b`.
   *
   * @param targetUrlSegment The target path which is actually just a url-segment or sub-route (relative path)
   * @param extras The {@link NavigationExtras}
   */
  public navigateInContext(targetUrlSegment: string, extras?: NavigationExtras): void {
    const currentUrl = this.router.url; // `/assets/wrd-web/products/url-segment-a`
    const prefix = currentUrl.substr(0, currentUrl.lastIndexOf('/')); // `/assets/wrd-web/products`

    const newUrl = prefix + this.prependSlash(targetUrlSegment); // `/assets/wrd-web/products/url-segment-b`
    const navExtras = extras ? Object.assign({ relativeTo: this.activatedRoute }, extras) : { relativeTo: this.activatedRoute };

    this.router.navigate([newUrl], navExtras);
  }

  /**
   * Prepends '/' to the value if it is not already there.
   * @param value The string value at hand
   */
  private prependSlash(value: string): string {
    return value.charAt(0) === '/' ? value : '/' + value;
  }
}
