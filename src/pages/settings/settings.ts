import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Sql, SgToast} from '../../providers/index';
import {Settings} from '../../models/index';
import {HomePage} from '../home/home';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings: Settings;

  constructor(public nav: NavController, public storage: Sql, public toastService: SgToast) {
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
        this.saveSettings(null);
      }
    });
  }

  countOnSettings(): number {
    let count = 0;
    if(this.settings.bookOfMormon) {
      count++;
    }
    if(this.settings.doctrineAndCovenants) {
      count++;
    }
    if(this.settings.newTestament) {
      count++;
    }
    if(this.settings.oldTestament) {
      count++;
    }
    if(this.settings.pearlOfGreatPrice) {
      count++;
    }
    return count;
  }

  saveSettings(book: string) {
    if(this.countOnSettings() < 2) {
      this.toastService.showToast('Minimum of 2 volumes required');
      switch(book) {
        case 'BOM':
          this.settings.bookOfMormon = true;
          break;
        case 'DC':
          this.settings.doctrineAndCovenants = true;
          break;
        case 'PGP':
          this.settings.pearlOfGreatPrice = true;
          break;
        case 'OT':
          this.settings.oldTestament = true;
          break;
        case 'NT':
          this.settings.newTestament = true;
      }
    }
    else {
      this.storage.set('settings', JSON.stringify(this.settings));
    }
  }

  eraseData() {
    this.storage.clear().then(() => {
      this.settings = {
        bookOfMormon: true,
        doctrineAndCovenants: true,
        pearlOfGreatPrice: true,
        newTestament: true,
        oldTestament: true
      };
      this.saveSettings(null);
      this.toastService.showToast('Data successfully cleared!');
    });
  }

  openPage(page: string) {
    switch(page) {
      case 'home':
        this.nav.setRoot(HomePage);
        break;
    }
  }
}
