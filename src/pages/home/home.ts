import {Component} from '@angular/core';
import {NavController, Platform, PopoverController} from 'ionic-angular';
import {GoogleAnalytics, SocialSharing} from 'ionic-native';
import {Auth, User, FacebookAuth} from '@ionic/cloud-angular';
import {SgToast} from '../../providers'
import {StatsPage} from '../stats/stats';
import {GamePage} from '../game/game';
import {SettingsPage} from '../settings/settings';
import {AboutPage} from '../about/about';
import {UserPopover} from './user-popover/user-popover';
import {SG_IMAGE_URL} from '../game/game-results/game-results';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  isAuthenticated: boolean;
  currUser: any;

  constructor(public nav: NavController, public platform: Platform, public popoverCtrl: PopoverController, public auth: Auth, public user: User, public facebookAuth: FacebookAuth, public toastService: SgToast) {
    this.currUser = {
      id: '0',
      name: ''
    };

    if(this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.isAuthenticated = this.auth.isAuthenticated();
        GoogleAnalytics.trackView('Home Page');

        if(this.user.social.facebook.uid) {
          this.currUser = {
            id: this.user.social.facebook.uid,
            name: this.user.social.facebook.data.full_name,
            photo: this.user.social.facebook.data.profile_picture
          };
        }
      });
    }
    else {
      this.isAuthenticated = false;
    }
  }

  authenticate() {
    this.facebookAuth.login().then(() => {
      this.currUser = {
        id: this.user.social.facebook.uid,
        name: this.user.social.facebook.data.full_name,
        photo: this.user.social.facebook.data.profile_picture
      };
      this.toastService.showToast('Successfully signed in');
    });
  }

  logout() {
    this.facebookAuth.logout();
    this.user.clear();
    this.user.social.facebook.uid = null;
    this.currUser = {
      id: '0',
      name: ''
    };
    this.toastService.showToast('Successfully signed out');
  }

  openPage(page: string) {
    switch(page) {
      case 'about':
        this.nav.push(AboutPage);
        break;
      case 'settings':
        this.nav.setRoot(SettingsPage);
        break;
      case 'stats':
        this.nav.push(StatsPage);
        break;
      case 'game':
        this.nav.setRoot(GamePage);
        break;
    }
  }

  openPopover(event) {
    let popover = this.popoverCtrl.create(UserPopover);
    popover.present({
      ev: event
    });
    popover.onDidDismiss((action) => {
      if(action === 'logout') {
        this.logout();
      }
      else if(action === 'share') {
        this.share();
      }
    });
  }

  share() {
    let message = 'I love playing Scripture Golf! You should download it too! #ScriptureGolf';
    SocialSharing.share(message, 'Scripture Golf', SG_IMAGE_URL, 'https://www.facebook.com/ldsscripturegolf/').then(() => {
      console.log('Shared');
    }).catch(() => {
      this.toastService.showToast('Cannot share at this time');
    });
  }
}
