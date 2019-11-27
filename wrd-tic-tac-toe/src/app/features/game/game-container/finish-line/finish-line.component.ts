import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Game } from '@app/store/models';
import { GameState } from '@app/store/game.state';

@Component({
  selector: 'app-finish-line',
  templateUrl: './finish-line.component.html',
  styleUrls: ['./finish-line.component.scss']
})
export class FinishLineComponent implements OnInit, OnDestroy {
  @Input() position: FinishLinePosition;
  @Select(GameState)
  public gameState$: Observable<Game>;
  public isHidden = true;
  private subscription: Subscription;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.subscription = this.gameState$.subscribe(data => {
      this.isHidden = data.isPlaying;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export interface FinishLinePosition {
  top: string;
  left: string;
  transform: string;
}
