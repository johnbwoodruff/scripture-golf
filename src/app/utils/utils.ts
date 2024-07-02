import { isNil } from 'lodash-es';
import { BOOKS, DC_SECTION_RANGES, VOLUME_NAMES } from '../data/books';
import {
  AdvancedScripture,
  Scripture,
  ScriptureBook,
  VolumeKey
} from '../data/data.types';
import { SCRIPTURES } from '../data/scriptures';
import { ALL_SCRIPTURES } from '../data/lds-scriptures';
import {
  GroupedBook,
  SelectedBooks
} from '../stores/game-store/game.store.types';
import { Player } from '../stores/game-store/player';

/**
 * Shuffle an array of Scripture objects.
 * The shuffle algorithm based on the Fisher-Yates (Knuth) Shuffle.
 */
export const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];
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
 * Convert a volume key to a volume name.
 */
export const volumeKeyToName = (volumeKey: VolumeKey): string =>
  VOLUME_NAMES[volumeKey];

/**
 * Convert a volume name to a volume key.
 */
export const volumeNameToKey = (volumeName: string): VolumeKey =>
  Object.keys(VOLUME_NAMES).find(
    (key) => VOLUME_NAMES[key as VolumeKey] === volumeName
  ) as VolumeKey;

/**
 * In advanced mode the book is the same as the volume so we need to convert
 * the chapter to the "book" name which is a section range of D&C.
 */
export const convertDCBook = (scripture: AdvancedScripture): string => {
  const chapter = scripture.chapter_number;
  const ranges = Object.keys(DC_SECTION_RANGES).map(Number);
  const range = ranges.find((r) => chapter <= r);
  return DC_SECTION_RANGES[range as keyof typeof DC_SECTION_RANGES];
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
  numRounds: number,
  expertMode = false
): Scripture[] => {
  const volumes = getVolumes(selectedBooks);
  // Eventually we'll have both lists of scriptures implement the same interface
  // so we won't have to have separate handling for each. This is a temporary measure.
  if (expertMode) {
    const volumeNames = volumes.map((volume) =>
      volumeKeyToName(volume as VolumeKey)
    );
    const filteredScriptures = ALL_SCRIPTURES.filter((scripture) =>
      volumeNames.includes(scripture.volume_title)
    );
    const shuffledScriptures = shuffle(filteredScriptures).slice(0, numRounds);
    return shuffledScriptures.map((scripture) => ({
      volume: volumeNameToKey(scripture.volume_title),
      book:
        scripture.volume_title === VOLUME_NAMES.DC
          ? convertDCBook(scripture)
          : scripture.book_title,
      chapter: scripture.chapter_number,
      verse: scripture.scripture_text
    }));
  } else {
    const scriptures: Scripture[] = [];
    volumes.forEach((volume) => {
      const volumeScriptures = shuffle(SCRIPTURES[volume]).slice(0, numRounds);
      scriptures.push(...volumeScriptures);
    });
    return shuffle(scriptures);
  }
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
