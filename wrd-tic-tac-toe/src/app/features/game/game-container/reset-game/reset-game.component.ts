import { Component, OnInit } from '@angular/core';
import { EmitterService } from '@ngxs-labs/emitter';
import { GameState } from '@app/store/game.state';

@Component({
  selector: 'app-reset-game',
  templateUrl: './reset-game.component.html',
  styleUrls: ['./reset-game.component.scss']
})
export class ResetGameComponent implements OnInit {
  constructor(private emitter: EmitterService) {}

  ngOnInit() {}

  public reset(): void {
    this.emitter.action(GameState.reset).emit();
  }
}
