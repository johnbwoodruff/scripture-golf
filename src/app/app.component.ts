import {Component, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {Platform, Nav, AlertController} from 'ionic-angular';
import {Auth, User} from '@ionic/cloud-angular';
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
  currUser: any;

  constructor(public platform: Platform, public auth: Auth, public user: User, public toastService: SgToast, public alertCtrl: AlertController, public http: Http, public scriptures: Scriptures) {
    this.currUser = {
      id: '0',
      name: ''
    };

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Settings', component: SettingsPage },
      { title: 'About', component: AboutPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
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

      if(this.auth.isAuthenticated()) {
        this.currUser = {
          id: this.user.social.facebook.uid,
          name: this.user.social.facebook.data.full_name,
          photo: this.user.social.facebook.data.profile_picture
        };
      }
    });
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

  authenticate() {
    this.auth.login('facebook').then(() => {
      this.currUser = {
        id: this.user.social.facebook.uid,
        name: this.user.social.facebook.data.full_name,
        photo: this.user.social.facebook.data.profile_picture
      };
      this.toastService.showToast('Successfully signed in');
    });
  }

  logout() {
    this.auth.logout();
    this.currUser = {
      id: '0',
      name: ''
    };
    this.toastService.showToast('Successfully signed out');
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
