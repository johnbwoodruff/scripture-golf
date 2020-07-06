import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-guess-chapter',
  templateUrl: './guess-chapter.component.html',
  styleUrls: ['./guess-chapter.component.scss']
})
export class GuessChapterComponent implements OnInit {
  @Output() correct = new EventEmitter();
  @Output() incorrect = new EventEmitter();
  chapter: string;
  guessed: number[] = [];

  constructor(
    private game: GameService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  check() {
    const chapter = parseInt(this.chapter, 10);
    if (this.guessed.includes(chapter)) {
      this.toast(`You already guessed ${chapter}`);
    } else if (chapter === this.game.currentScripture.chapter) {
      this.correct.emit();
    } else {
      this.incorrect.emit();
      this.guessed.push(chapter);
      const higher = chapter < this.game.currentScripture.chapter;
      const message = `Incorrect. Guess ${higher ? 'higher' : 'lower'}.`;
      this.toast(message);
    }
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
