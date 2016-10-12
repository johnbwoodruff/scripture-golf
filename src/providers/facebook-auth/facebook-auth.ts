import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from 'ionic-angular';
import {Facebook} from 'ionic-native';

/*
  Generated class for the FacebookAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookAuth {
  userId: string = null;

  constructor(public platform: Platform) {}

  public login() {
    let p = new Promise((resolve, reject) => {
      if(this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then((data) => {
          resolve(data);
        });
      }
      else {
        // IF NOT RUNNING ON DEVICE, FAKE AUTHENTICATE FOR TESTING PURPOSES
        resolve('Sucessfully fake authenticated!');
      }
    });
    return p;
  }

  public logout() {
    let p = new Promise((resolve, reject) => {
      if(this.platform.is('cordova')) {
        Facebook.logout().then(() => {
          resolve();
        });
      }
      else {
        // IF NOT RUNNING ON DEVICE, FAKE AUTHENTICATE FOR TESTING PURPOSES
        resolve('Sucessfully fake logged out!');
      }
    });
    return p;
  }

  public getUser() {
    let p = new Promise((resolve,reject) => {
      if(this.platform.is('cordova')) {
        Facebook.api('me?fields=name,email,picture', null).then((data) => {
          console.log(JSON.stringify(data));
          resolve(data);
        });
      }
      else {
        // IF NOT RUNNING ON DEVICE, FAKE AUTHENTICATE FOR TESTING PURPOSES
        resolve({
          id: '12345',
          name: 'Testy McTesterson',
          picture: {
            url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14292396_10157720578370144_2623139836272962901_n.jpg?oh=0933a13cf580287b225d69c302b4effc&oe=587D0F06'
          }
        });
      }
    });
    return p;
  }
}

