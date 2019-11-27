import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameContainerComponent } from './game-container/game-container.component';
import { GameCellComponent } from './game-container/game-cell/game-cell.component';
import { FinishLineComponent } from './game-container/finish-line/finish-line.component';
import { ScoreComponent } from './game-container/score/score.component';
import { RouterModule } from '@angular/router';
import { ResetGameComponent } from '@app/features/game/game-container/reset-game/reset-game.component';
import { ClarityModule } from '@clr/angular';
import { ThemeManagerComponent } from './game-container/theme-manager/theme-manager.component';
import { AppThemeDirective } from '@app/features/game/game-container/app-theme.directive';

@NgModule({
  declarations: [
    GameContainerComponent,
    ScoreComponent,
    FinishLineComponent,
    GameCellComponent,
    ResetGameComponent,
    ThemeManagerComponent,
    AppThemeDirective
  ],
  imports: [ CommonModule, RouterModule.forChild([ { path: '', component: GameContainerComponent } ]), ClarityModule ],
  exports: [ GameContainerComponent ]
})
export class GameModule {
}
