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
  disabled: Settings;

  constructor(public nav: NavController, public storage: Sql, public toastService: SgToast) {
    this.settings = {
      bookOfMormon: true,
      doctrineAndCovenants: true,
      pearlOfGreatPrice: true,
      oldTestament: true,
      newTestament: true
    };
    this.disabled = {
      bookOfMormon: false,
      doctrineAndCovenants: false,
      pearlOfGreatPrice: false,
      oldTestament: false,
      newTestament: false
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

  saveSettings() {
    let num = this.countOnSettings();
    if(num === 2) {
      if(this.settings.bookOfMormon) {
        this.disabled.bookOfMormon = true;
      }
      if(this.settings.doctrineAndCovenants) {
        this.disabled.doctrineAndCovenants = true;
      }
      if(this.settings.newTestament) {
        this.disabled.newTestament = true;
      }
      if(this.settings.oldTestament) {
        this.disabled.oldTestament = true;
      }
      if(this.settings.pearlOfGreatPrice) {
        this.disabled.pearlOfGreatPrice = true;
      }
    }
    else if(num > 2) {
      this.disabled = {
        bookOfMormon: false,
        doctrineAndCovenants: false,
        pearlOfGreatPrice: false,
        oldTestament: false,
        newTestament: false
      };
    }
    if(num >= 2) {
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
      this.saveSettings();
      this.toastService.showToast('Settings successfully reset.');
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
