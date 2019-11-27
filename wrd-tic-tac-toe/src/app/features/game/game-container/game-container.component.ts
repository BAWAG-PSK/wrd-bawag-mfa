import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CellPosition, FinishLinePosition } from '@app/features/game/interfaces/interfaces';
import FinishGame from '../utils/finish-game';
import { EmitterService } from '@ngxs-labs/emitter';
import { GameState } from '@app/store/game.state';
import { Game } from '@app/store/models';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  public cells: CellPosition[];
  public position: FinishLinePosition | boolean;

  private subscription: Subscription;

  @Select(GameState)
  public gameState$: Observable<Game>;

  constructor(private emitter: EmitterService) {
    this.cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cells.push({ i, j });
      }
    }
  }

  ngOnInit() {
    const finish = new FinishGame();
    this.subscription = this.gameState$.subscribe(state => {
      if (!state.isPlaying) {
        return;
      }
      const finishLine = finish.verifyFinish(state.movementArray);
      if (!finishLine) {
        return;
      } else {
        this.position = finishLine;
        console.log(this.position);
        this.emitter.action(GameState.finishGame).emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
