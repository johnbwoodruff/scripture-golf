import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  version = '3.0.0';
  year = new Date().getFullYear();
  icons = ICONS;
}
