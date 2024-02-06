import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScriptureGolfStore } from './stores/app-store/app.store';

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
        case 'light':
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
          break;
        case 'dark':
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
          break;
      }
    });
  }
}
