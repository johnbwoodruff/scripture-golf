import { Scripture } from '../interfaces/scripture';

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
