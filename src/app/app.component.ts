import {Component, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {Platform, Nav, AlertController} from 'ionic-angular';
import {StatusBar, GoogleAnalytics, AppVersion} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {SettingsPage} from '../pages/settings/settings';
import {SgToast, Scriptures} from '../providers/index';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public toastService: SgToast, public alertCtrl: AlertController, public http: Http, public scriptures: Scriptures) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Settings', component: SettingsPage },
      { title: 'About', component: AboutPage }
    ];
  }

  initializeApp() {
    GoogleAnalytics.startTrackerWithId('UA-46243905-10').then(() => {
      console.log('STARTED TRACKING VIA GOOGLE ANALYTICS');
      AppVersion.getVersionNumber().then((version) => {
        console.log('SET APP VERSION IN ANALYTICS: ' + version);
        GoogleAnalytics.setAppVersion(version);
      });
    });
    StatusBar.backgroundColorByHexString('#36601C');
    StatusBar.styleLightContent();

    this.setupDatabase();

    this.listenForBackButton();
  }

  listenForBackButton() {
    this.platform.registerBackButtonAction(() => {
      if(!this.nav.canGoBack()) {
        let alert = this.alertCtrl.create({
          title: 'Exit?',
          subTitle: 'Would you like to exit Scripture Golf?',
          buttons: [
            {
              text: 'Stay',
              handler: () => {
                console.log('Decided to stay!');
              }
            },
            {
              text: 'Exit',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
        });
        alert.present();
      }
      else {
        this.nav.pop();
      }
    }, 1000);
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  setupDatabase() {
    this.scriptures.initializeScriptures().then((successful) => {
      if(successful) {
        console.log('DATABASE SUCCESSFULLY INITIALIZED');
      }
    });
  }
}
