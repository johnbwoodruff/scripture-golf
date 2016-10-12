import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Scripture, Book } from '../../models';
import 'rxjs/add/operator/map';

/*
  Generated class for the Scriptures provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Scriptures {

  public scriptures: Scripture[];
  public books: Book[];

  constructor(public http: Http, public storage: Storage) {
    this.scriptures = [];
    this.books = [];
  }

  public initializeScriptures(): Promise<boolean> {
    const promise = new Promise((resolve, reject) => {
      resolve(true);

      // this.storage.query(`CREATE TABLE IF NOT EXISTS books(
      //   key TEXT NOT NULL,
      //   title TEXT NOT NULL
      // )`).then((results) => {
      //   this.storage.query('SELECT count(*) num FROM scriptures').then((response) => {
      //     if(response.res.rows.item(0).num > 0) {
      //       resolve(true);
      //     }
      //     else {
      //       let sql: string[];
      //       this.http.get('db/books.sql').subscribe((data) => {
      //         sql = data.text().split('\n');
      //         for(let statement of sql) {
      //           if(statement !== '') {
      //             this.storage.query(statement);
      //           }
      //         }
      //         resolve(true);
      //       });
      //     }
      //   });
      // });

      // this.storage.query(`CREATE TABLE IF NOT EXISTS scriptures(
      //   book TEXT NOT NULL,
      //   chapter INTEGER NOT NULL,
      //   verse TEXT NOT NULL
      // )`).then((results) => {
      //   this.storage.query('SELECT count(*) num FROM scriptures').then((response) => {
      //     if(response.res.rows.item(0).num > 0) {
      //       resolve(true);
      //     }
      //     else {
      //       let sql: string[];
      //       this.http.get('db/scriptures.sql').subscribe((data) => {
      //         sql = data.text().split('\n');
      //         for(let statement of sql) {
      //           if(statement !== '') {
      //             this.storage.query(statement);
      //           }
      //         }
      //         resolve(true);
      //       });
      //     }
      //   });
      // });
    });
    return promise;
  }

  public getScriptures(): Promise<Scripture[]> {
    let promise = new Promise((resolve, reject) => {
      if(this.scriptures.length > 0) {
        resolve(this.scriptures);
      }
      else {
        // this.storage.query('SELECT * FROM scriptures').then((response) => {
        //   for(let i = 0; i < response.res.rows.length; i++) {
        //     this.scriptures.push({
        //       book: response.res.rows.item(i).book,
        //       chapter: response.res.rows.item(i).chapter,
        //       verse: response.res.rows.item(i).verse
        //     });
        //   }
        //   resolve(this.scriptures);
        // });
        resolve([]);
      }
    });
    return promise;
  }

  public getBooks(): Promise<Book[]> {
    let promise = new Promise((resolve, reject) => {
      if(this.books.length > 0) {
        resolve(this.books);
      }
      else {
        // this.storage.query('SELECT * FROM books').then((response) => {
        //   for(let i = 0; i < response.res.rows.length; i++) {
        //     this.books.push({
        //       key: response.res.rows.item(i).key,
        //       title: response.res.rows.item(i).title
        //     });
        //   }
        //   resolve(this.books);
        // });
        resolve([]);
      }
    });
    return promise;
  }

  // When there are updates, have methods that are called with the new scripture sets.
}

