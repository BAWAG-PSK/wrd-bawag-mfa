import { Component, OnInit } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { ThemeState } from '@app/store/theme.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: [ './theme-manager.component.scss' ]
})
export class ThemeManagerComponent implements OnInit {
  public Theme: ITheme = {
    DARK: 'dark-theme',
    LIGHT: 'light-theme'
  };
  @Emitter(ThemeState.setTheme)
  private setThemeEmitter: Emittable<string>;

  @Select(ThemeState.getTheme)
  private getTheme$: Observable<string>;

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  private _activeTheme = this.Theme.DARK;

  public get activeTheme(): string {
    return this._activeTheme;
  }

  ngOnInit() {
  }

  public changeTheme(theme: string): void {
    this.getTheme$.pipe(take(1)).subscribe(storeTheme => {
      if (storeTheme === theme) {
        return;
      }
      this._activeTheme = theme;

      this.setThemeEmitter.emit(theme);
    });
  }
}

interface ITheme {
  LIGHT: string;
  DARK: string;
}
