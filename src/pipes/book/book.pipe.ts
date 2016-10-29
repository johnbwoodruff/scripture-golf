import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../../models/index';

/*
 * Returns the books associated with a specific key
 * Takes a string that is a key
 * Usage:
 *   value | book:key
 * Example:
 *   *ngFor="let book of books | book:'OT'"
 *   Returns just the books in the Old Testament
*/
@Pipe({
  name: 'book'
})
export class BookPipe implements PipeTransform {
  transform(books: Book[], key: string): Book[] {
    if(books) {
      return books.filter((book) => {
        return book.key === key;
      });
    }
    return [];
  }
}
