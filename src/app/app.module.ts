import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { GamePage } from '../pages/game/game';
import { GameGameplay } from '../pages/game/game-gameplay/game-gameplay';
import { GameOptions } from '../pages/game/game-options/game-options';
import { GameResults } from '../pages/game/game-results/game-results';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { BookPipe } from '../pipes/index';
import { FacebookAuth, Game, Scriptures, SgToast, Sql } from '../providers/index';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0280dc86'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    BookPipe,
    GamePage,
    GameGameplay,
    GameOptions,
    GameResults,
    SettingsPage,
    StatsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    GamePage,
    SettingsPage,
    StatsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookAuth,
    Game,
    Scriptures,
    SgToast,
    Sql
  ]
})
export class AppModule { }
