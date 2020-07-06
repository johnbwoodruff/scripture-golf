import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    service.settings = {
      numPlayers: 1,
      rounds: 5,
      selectedBooks: {
        BOM: true,
        DC: true,
        PGP: true,
        OT: true,
        NT: true
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the game correctly', () => {
    service.startGame();
    expect(service.activePlayer).toBe(1);
    expect(service.currentRound).toBe(1);
    expect(service.volumes.length).toBe(5);
    expect(service.books.length).toBe(91);
    expect(service.scriptures.length).toBe(329);
  });
});
