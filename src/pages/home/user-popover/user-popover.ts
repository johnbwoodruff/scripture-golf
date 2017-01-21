import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { User } from '@ionic/cloud-angular';

@Component({
  template: `
    <ion-list no-margin>
      <ion-list-header>{{currUser.name}}</ion-list-header>
      <button ion-item (click)="close('share')">
        <ion-icon name="md-share" item-left></ion-icon>
        Share App
      </button>
    </ion-list>
    <div class="text-align-center">
      <button ion-button icon-left clear (click)="close('logout')">
        <ion-icon name="log-out"></ion-icon>
        Sign Out
      </button>
    </div>
  `
})
export class UserPopover {
  currUser: any;

  constructor(public viewCtrl: ViewController, public platform: Platform, public user: User) {
    this.currUser = {
      id: '0',
      name: ''
    };

    this.platform.ready().then(() => {
      if(this.user.social.facebook && this.user.social.facebook.uid) {
        this.currUser = {
          id: this.user.social.facebook.uid,
          name: this.user.social.facebook.data.full_name,
          photo: this.user.social.facebook.data.profile_picture
        };
      }
    });
  }

  close(action) {
    this.viewCtrl.dismiss(action);
  }
}
