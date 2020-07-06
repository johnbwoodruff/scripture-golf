import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { ScriptureBook } from '../../interfaces/scripture';
import { ToastController } from '@ionic/angular';

export interface GuessEvent {
  book?: string;
  verse?: number;
}

@Component({
  selector: 'app-guess-book',
  templateUrl: './guess-book.component.html',
  styleUrls: ['./guess-book.component.scss']
})
export class GuessBookComponent implements OnInit {
  @Output() correct = new EventEmitter();
  @Output() incorrect = new EventEmitter();
  bom: ScriptureBook[];
  dc: ScriptureBook[];
  pgp: ScriptureBook[];
  ot: ScriptureBook[];
  nt: ScriptureBook[];

  bomSelection: string;
  dcSelection: string;
  pgpSelection: string;
  otSelection: string;
  ntSelection: string;

  constructor(
    private game: GameService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.bom = this.game.getBooksByKey('BOM');
    this.dc = this.game.getBooksByKey('DC');
    this.pgp = this.game.getBooksByKey('PGP');
    this.ot = this.game.getBooksByKey('OT');
    this.nt = this.game.getBooksByKey('NT');
  }

  select(key: string) {
    if (key !== 'BOM') {
      this.bomSelection = null;
    }
    if (key !== 'DC') {
      this.dcSelection = null;
    }
    if (key !== 'PGP') {
      this.pgpSelection = null;
    }
    if (key !== 'OT') {
      this.otSelection = null;
    }
    if (key !== 'NT') {
      this.ntSelection = null;
    }
  }

  checkAnswer() {
    if (
      this.bomSelection &&
      this.game.currentScripture.book === this.bomSelection
    ) {
      this.correct.emit();
      this.toast('Great job!');
      return;
    }
    if (
      this.dcSelection &&
      this.game.currentScripture.book === this.dcSelection
    ) {
      this.correct.emit();
      this.toast('Great job!');
      return;
    }
    if (
      this.pgpSelection &&
      this.game.currentScripture.book === this.pgpSelection
    ) {
      this.correct.emit();
      this.toast('Great job!');
      return;
    }
    if (
      this.otSelection &&
      this.game.currentScripture.book === this.otSelection
    ) {
      this.correct.emit();
      this.toast('Great job!');
      return;
    }
    if (
      this.ntSelection &&
      this.game.currentScripture.book === this.ntSelection
    ) {
      this.correct.emit();
      this.toast('Great job!');
      return;
    }
    this.incorrect.emit();
    this.toast('Sorry, guess again!');
    this.bomSelection = null;
    this.dcSelection = null;
    this.pgpSelection = null;
    this.otSelection = null;
    this.ntSelection = null;
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }
}
