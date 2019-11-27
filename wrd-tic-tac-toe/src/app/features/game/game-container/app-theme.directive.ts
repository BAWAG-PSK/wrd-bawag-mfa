import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { ThemeState } from '@app/store/theme.state';

@Directive({
  selector: '[appTheme]'
})
export class AppThemeDirective implements OnDestroy {
  @Select(ThemeState.getTheme)
  private appTheme$: Observable<string>;
  private subscription: Subscription;

  constructor(el: ElementRef) {
    this.subscription = this.appTheme$.subscribe(theme => {
      (el.nativeElement as HTMLElement).classList.value
        .split(' ')
        .filter(className => className.includes('-theme') && className !== theme)
        .forEach(className => el.nativeElement.classList.remove(className));
      el.nativeElement.classList.add(theme);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
