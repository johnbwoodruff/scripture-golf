import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController, ToastOptions, Platform } from 'ionic-angular';

/*
  Generated class for the SgToast provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SgToast {

  constructor(public toastCtrl: ToastController, public platform: Platform) {}

  public showToast(message: string, showCloseButton?: boolean) {
    showCloseButton = (!showCloseButton) ? false : showCloseButton;
    let toastConfig: ToastOptions = {
      message: message,
      showCloseButton: showCloseButton,
      position: 'top',
      closeButtonText: 'OK'
    };
    if(this.platform.is('ios')) {
      toastConfig.position = 'bottom';
    }
    if(!showCloseButton) {
      toastConfig.duration = 3000;
    }
    let toast = this.toastCtrl.create(toastConfig);
    toast.present();
  }
}

