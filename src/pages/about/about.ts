import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AppVersion/*, AppRate*/ } from 'ionic-native';
import { SgToast } from '../../providers';

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
      // TODO: Add in app rating once there are ids for the app in each store
      // AppRate.preferences.storeAppURL = {
      //   ios: '<my_app_id>',
      //   android: 'market://details?id=<package_name>',
      // };
    }
    else {
      this.appName = 'Scripture Golf';
      this.appVersion = '1.0.0';
    }
  }

  reviewApp() {
    this.toastCtrl.showToast('This feature is disabled during beta');
  }
}
