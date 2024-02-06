import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sg-home',
  standalone: true,
  imports: [LogoComponent, ThemePickerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
