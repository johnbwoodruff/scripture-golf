import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { ScriptureGolfStore } from '../stores/app-store/app.store';

@Component({
  selector: 'sg-theme-picker',
  standalone: true,
  imports: [],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemePickerComponent {
  store = inject(ScriptureGolfStore);

  public themeChange(event: any): void {
    if (event.target?.checked) {
      this.store.updateTheme('sglight');
      this.updatePreferences('sglight');
    } else {
      this.store.updateTheme('sgdark');
      this.updatePreferences('sgdark');
    }
  }

  private async updatePreferences(theme: string) {
    await Preferences.set({
      key: 'theme',
      value: theme
    });
  }
}
