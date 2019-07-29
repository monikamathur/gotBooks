import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from './app.constants';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookApiURL: any = APP_CONSTANTS.BOOK_API;

  constructor(private httpClient: HttpClient) { }

  public getBook() {
    return this.httpClient.get(this.bookApiURL);
  }

  public getBookById(id) {
    const url = `${this.bookApiURL}/${id}`;
    return this.httpClient.get(url);
  }
}
