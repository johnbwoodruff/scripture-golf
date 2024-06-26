import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { startWith } from 'rxjs';
import { booksValidator } from './books.validator';

@Component({
  selector: 'sg-game-settings',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameSettingsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  multiplayer = this.route.snapshot.queryParamMap.get('multiplayer') === 'true';

  settingsForm = new FormGroup({
    numPlayers: new FormControl(this.multiplayer ? 2 : 1, Validators.required),
    selectedBooks: new FormGroup(
      {
        BOM: new FormControl(true),
        DC: new FormControl(false),
        PGP: new FormControl(false),
        OT: new FormControl(false),
        NT: new FormControl(false)
      },
      { validators: [booksValidator] }
    ),
    numRounds: new FormControl(1, Validators.required),
    hints: new FormControl(true)
  });

  numRoundsValue$ = this.settingsForm
    .get('numRounds')!
    .valueChanges.pipe(startWith(this.settingsForm.get('numRounds')!.value));

  public startGame(): void {
    this.router.navigate(['/game'], { state: this.settingsForm.value });
  }
}
