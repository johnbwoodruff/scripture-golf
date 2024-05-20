import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { LucideAngularModule } from 'lucide-angular';

import { ICONS } from '../utils/icons';

@Component({
  selector: 'sg-about',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  version = signal<string | null>(null);
  showRatingButton = signal<boolean>(false);
  year = new Date().getFullYear();
  icons = ICONS;

  constructor() {
    this.getVersion();
    const platform = Capacitor.getPlatform();
    this.showRatingButton.set(platform === 'ios' || platform === 'android');
  }

  async getVersion(): Promise<void> {
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') {
      const info = await App.getInfo();
      this.version.set(info.version);
    }
  }
}
