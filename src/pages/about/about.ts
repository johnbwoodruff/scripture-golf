import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AppVersion, AppRate } from 'ionic-native';
import { SgToast } from '../../providers';

AppRate.preferences.storeAppURL = {
  ios: '1186113597'
};

@Component({
  selector: 'about-page',
  templateUrl: 'about.html'
})
export class AboutPage {
  appName: string;
  appVersion: string;

  constructor(public navCtrl: NavController, public platform: Platform, public toastCtrl: SgToast) {
    if(this.platform.is('cordova')) {
      AppVersion.getAppName().then((name) => {
        this.appName = name;
      });
      AppVersion.getVersionNumber().then((version) => {
        this.appVersion = version;
      });
    }
    else {
      this.appName = 'Scripture Golf';
      this.appVersion = '1.0.0';
    }
  }

  reviewApp() {
    this.toastCtrl.showToast('This feature is disabled during beta');
    // TODO: Uncomment this before full release
    // AppRate.promptForRating(false);
  }
}
