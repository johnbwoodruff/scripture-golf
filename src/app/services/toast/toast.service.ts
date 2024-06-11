import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ToastComponent } from './toast/toast.component';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  dialog = inject(Dialog);
  overlay = inject(Overlay);

  /**
   * Open a toast notification showing a message with an icon
   */
  show(message: string): void {
    this.dialog.open(ToastComponent, {
      width: '100%',
      height: '100px',
      hasBackdrop: false,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .bottom('50px'),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: {
        message
      }
    });
  }
}
