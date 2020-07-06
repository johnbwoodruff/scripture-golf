import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingsModalComponent } from '../common/components/settings-modal/settings-modal.component';
import { GameSettings } from '../common/interfaces/game-settings';
import { GameService } from '../common/services/game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    private router: Router,
    private modal: ModalController,
    private game: GameService
  ) {}

  async play(multi: boolean) {
    const modal = await this.modal.create({
      component: SettingsModalComponent,
      componentProps: {
        multi
      }
    });
    await modal.present();
    const res = await modal.onWillDismiss<GameSettings>();
    if (res.data) {
      this.startGame(res.data);
    }
  }

  startGame(settings: GameSettings) {
    this.game.settings = settings;
    this.router.navigate(['/game']);
  }

  about() {
    this.router.navigate(['/about']);
  }
}
