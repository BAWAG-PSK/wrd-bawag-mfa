import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { GameState } from '@app/store/game.state';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { Game, IMovement } from '@app/store/models';
import { take } from 'rxjs/operators';

interface CellPosition {
  i: number;
  j: number;
}

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent implements OnInit, OnDestroy {
  static XorO = {
    true: 'X',
    false: '0'
  };

  @Emitter(GameState.addMovement)
  private movementEmitter: Emittable<IMovement>;

  @Input() cellPosition: CellPosition;
  @Select(GameState)
  public gameState: Observable<Game>;
  public cellValue: string;
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.gameState.subscribe(data => {
      if (data.movementArray.length === 0) {
        this.cellValue = undefined;
      }
    });
  }

  public move(): void {
    if (this.cellValue !== undefined) {
      return;
    }
    this.gameState.pipe(take(1)).subscribe(data => {
      if (!data.isPlaying) {
        return;
      }
      this.cellValue = GameCellComponent.XorO[data.xTurn.toString()];
      this.movementEmitter.emit({ cellId: this.cellPosition, movement: this.cellValue } as IMovement);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
