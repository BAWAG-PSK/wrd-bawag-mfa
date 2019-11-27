import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ThemeState, ThemeStateModel } from '@app/store/theme.state';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'lucy-web-tic-tac-toe';

  @Emitter(ThemeState.setTheme)
  private setThemeEmitter: Emittable<string>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.setTheme();
    console.log('%c Stop!!!', 'background: #222; color: red; font-size:30px');
  }

  private setTheme(): void {
    const theme = this.store.selectSnapshot<ThemeStateModel>((state: ThemeState) => (state as any).theme);
    this.setThemeEmitter.emit(theme.theme);
  }
}
