import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectedBooks } from '../../interfaces/game-settings';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {
  @Input() multi: boolean;
  numPlayers = 1;
  selectedBooks: SelectedBooks = {
    BOM: true,
    DC: false,
    PGP: false,
    OT: false,
    NT: false
  };
  rounds = 1;

  constructor(private modal: ModalController) {}

  ngOnInit() {
    if (this.multi) {
      this.numPlayers = 2;
    }
  }

  shouldBeDisabled() {
    return (
      !this.selectedBooks.BOM &&
      !this.selectedBooks.DC &&
      !this.selectedBooks.PGP &&
      !this.selectedBooks.OT &&
      !this.selectedBooks.NT
    );
  }

  toggleBook(book: string) {
    this.selectedBooks[book] = !this.selectedBooks[book];
  }

  start() {
    this.modal.dismiss({
      numPlayers: this.numPlayers,
      selectedBooks: this.selectedBooks,
      rounds: this.rounds
    });
  }

  close() {
    this.modal.dismiss();
  }
}
