import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { GameState } from '@app/store/game.state';
import { Observable, Subscription } from 'rxjs';
import { Game } from '@app/store/models';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit, OnDestroy {
  public x = 0;
  public o = 0;

  @Select(GameState)
  private gameState$: Observable<Game>;
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.gameState$.subscribe(data => {
      this.x = data.score.x;
      this.o = data.score.o;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
