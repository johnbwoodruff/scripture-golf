import { BOOKS } from '../data/books';
import { Scripture, ScriptureBook } from '../data/data.types';
import { SCRIPTURES } from '../data/scriptures';
import { SelectedBooks } from '../stores/game-store/game.store.types';
import { Player } from '../stores/game-store/player';

/**
 * Shuffle an array of Scripture objects.
 */
export const shuffle = (array: Scripture[]): Scripture[] => {
  const arr = [...array];
  // Shuffle function based on the Fisher-Yates (Knuth) Shuffle.
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
};

/**
 * Get the selected volumes array from the selected books.
 */
export const getVolumes = (selectedBooks: SelectedBooks): string[] => {
  return Object.keys(selectedBooks).filter(
    (key): key is keyof SelectedBooks =>
      selectedBooks[key as keyof SelectedBooks] === true
  );
};

/**
 * Generates a list of books based on the selected volumes.
 */
export const generateBooks = (
  selectedBooks: SelectedBooks
): ScriptureBook[] => {
  const volumes = getVolumes(selectedBooks);
  return BOOKS.filter((b) => volumes.includes(b.key));
};

/**
 * Generates a list of scriptures based on the selected books.
 */
export const generateScriptures = (
  selectedBooks: SelectedBooks
): Scripture[] => {
  const volumes = getVolumes(selectedBooks);
  const scriptures = SCRIPTURES.filter((s) => volumes.includes(s.volume));
  return shuffle(scriptures);
};

/**
 * Generates a list of players based on the number of players.
 */
export const generatePlayers = (numPlayers: number): Player[] => {
  const players: Player[] = [];
  for (let i = 1; i <= numPlayers; i++) {
    const player = new Player(`Player ${i}`, i);
    players.push(player);
  }
  return players;
};
