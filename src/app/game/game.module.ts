import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { ScriptureComponent } from '../common/components/scripture/scripture.component';
import { GuessBookComponent } from '../common/components/guess-book/guess-book.component';
import { GuessComponent } from '../common/components/guess/guess.component';
import { GuessChapterComponent } from '../common/components/guess-chapter/guess-chapter.component';
import { ResultsComponent } from '../common/components/results/results.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GamePageRoutingModule],
  declarations: [
    GamePage,
    ScriptureComponent,
    GuessComponent,
    GuessBookComponent,
    GuessChapterComponent,
    ResultsComponent
  ]
})
export class GamePageModule {}
