import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AppVersion, AppRate } from 'ionic-native';
import { SgToast } from '../../providers';

@Component({
  selector: 'about-page',
  templateUrl: 'about.html'
})
export class AboutPage {
  appName: string;
  appVersion: string;

  constructor(public navCtrl: NavController, public platform: Platform, public toastCtrl: SgToast) {
    if(!this.platform.is('cordova')) {
      this.appName = 'Scripture Golf';
      this.appVersion = '1.0.0';
    }
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        AppVersion.getAppName().then((name) => {
          this.appName = name;
        });
        AppVersion.getVersionNumber().then((version) => {
          this.appVersion = version;
        });
        AppRate.preferences.storeAppURL = {
          ios: '1186113597',
          android: 'market://details?id=com.scripture-golf.ldsscripturegolf',
          windows: 'ms-windows-store://pdp/?ProductId=9wzdncrdnjbc'
        };
      }
    });
  }

  reviewApp() {
    if(this.platform.is('ios')) {
      window.open(`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id1186113597`, '_system');
    }
    else {
      AppRate.promptForRating(true);
    }
  }
}
