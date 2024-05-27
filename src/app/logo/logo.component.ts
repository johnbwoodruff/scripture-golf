import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sg-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.svg',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {}
