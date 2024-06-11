import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { LogoComponent } from '../logo/logo.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  selector: 'sg-home',
  standalone: true,
  imports: [
    LogoComponent,
    ThemePickerComponent,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
