import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    } else {
      this.store.updateTheme('sgdark');
    }
  }
}
