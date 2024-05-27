import { isNil } from 'lodash-es';
import { BOOKS, VOLUME_NAMES } from '../data/books';
import { Scripture, ScriptureBook, VolumeKey } from '../data/data.types';
import { SCRIPTURES } from '../data/scriptures';
import {
  GroupedBook,
  SelectedBooks
} from '../stores/game-store/game.store.types';
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

export const volumeKeyToName = (volumeKey: VolumeKey): string =>
  VOLUME_NAMES[volumeKey];

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
 * Given a list of books, groups them by volume.
 */
export const groupBooksByVolume = (books: ScriptureBook[]): GroupedBook[] => {
  const grouped: GroupedBook[] = books.reduce(
    (acc: GroupedBook[], book: ScriptureBook) => {
      // Find the volume group in the accumulator
      let volumeGroup: GroupedBook | undefined = acc.find(
        (group: GroupedBook) => group.volume === volumeKeyToName(book.key)
      );

      // If the volume group does not exist, create it
      if (isNil(volumeGroup)) {
        volumeGroup = { volume: volumeKeyToName(book.key), books: [] };
        acc.push(volumeGroup);
      }

      // Add the current book to the volume group's books array
      volumeGroup.books.push(book);

      return acc;
    },
    []
  );

  return grouped;
};

/**
 * Generates a list of scriptures based on the selected books.
 * It selects random scriptures from each selected volume so
 * there is a good mix of scriptures.
 */
export const generateScriptures = (
  selectedBooks: SelectedBooks,
  numRounds: number
): Scripture[] => {
  const volumes = getVolumes(selectedBooks);
  const scriptures: Scripture[] = [];
  volumes.forEach((volume) => {
    const volumeScriptures = shuffle(SCRIPTURES[volume]).slice(0, numRounds);
    scriptures.push(...volumeScriptures);
  });
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
