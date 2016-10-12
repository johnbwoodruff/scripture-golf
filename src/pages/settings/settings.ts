import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Settings} from '../../models';
import {SgToast} from '../../providers/sg-toast/sg-toast';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings: Settings;

  constructor(public nav: NavController, public storage: Storage, public toastService: SgToast) {
    this.settings = {
      bookOfMormon: true,
      doctrineAndCovenants: true,
      pearlOfGreatPrice: true,
      oldTestament: true,
      newTestament: true
    };

    this.getSettings();
  }

  getSettings() {
    this.storage.get('settings').then((data) => {
      if(data) {
        this.settings = JSON.parse(data);
      }
      else {
        this.saveSettings();
      }
    });
  }

  saveSettings() {
    this.storage.set('settings', JSON.stringify(this.settings));
  }

  eraseData() {
    this.toastService.showToast('Feature not implemented yet');
  }
}
