import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'sg-toast',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  data = inject(DIALOG_DATA);
  dialogRef = inject(DialogRef);

  constructor() {
    setTimeout(() => {
      this.dialogRef?.close();
    }, 3000);
  }
}
