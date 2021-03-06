import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AboutPageRoutingModule],
  providers: [AppRate, AppVersion],
  declarations: [AboutPage]
})
export class AboutPageModule {}
