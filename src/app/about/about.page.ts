import { Component, OnInit } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  year = new Date().getFullYear();
  version: string;

  constructor(
    private platform: Platform,
    private appRate: AppRate,
    private appVersion: AppVersion
  ) {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      this.appRate.preferences.storeAppURL = {
        ios: '1186113597',
        android: 'market://details?id=com.scripture-golf.ldsscripturegolf'
      };
      this.getVersion();
    }
  }

  async getVersion() {
    this.version = await this.appVersion.getVersionNumber();
  }

  rate() {
    this.appRate.promptForRating(true);
  }
}
