import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { PageNotFoundComponent } from '@app/features/page-not-found/page-not-found.component';

/**
 * Module that provides the {@link PageNotFoundComponent}, basically explains a 404 error.
 */
@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ClarityModule],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
