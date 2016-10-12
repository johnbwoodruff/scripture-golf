import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion/*, AppRate*/ } from 'ionic-native';

/*
  Generated class for the AboutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'about-page',
  templateUrl: 'about.html'
})
export class AboutPage {
  appName: string;
  appVersion: string;

  constructor(public navCtrl: NavController) {
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
}
