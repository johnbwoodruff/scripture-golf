import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

import { ScriptureGolfStore } from './stores/app-store/app.store';
import { AppTheme } from './stores/app-store/app.store.types';

@Component({
  selector: 'sg-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  store = inject(ScriptureGolfStore);

  constructor() {
    effect(() => {
      switch (this.store.theme()) {
        case 'sglight':
          document.documentElement.classList.remove('sgdark');
          document.documentElement.setAttribute('data-theme', 'sglight');
          break;
        case 'sgdark':
          document.documentElement.classList.add('sgdark');
          document.documentElement.setAttribute('data-theme', 'sgdark');
          break;
      }
    });

    this.getPersistedTheme();
  }

  private async getPersistedTheme() {
    const ret = await Preferences.get({ key: 'theme' });
    const theme = ret?.value ?? 'sgdark';
    this.store.updateTheme(theme as AppTheme);
  }
}
