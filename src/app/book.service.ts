import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from './app.constants';
import { Observable, of } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

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

  public addBook(data) {
    return this.httpClient.post(this.bookApiURL, data);
  }

  public editBook(data) {
    return this.httpClient.put(this.bookApiURL, data);
  }

  public deleteBook(id) {
    const url = `${this.bookApiURL}/${id}`;
    return this.httpClient.delete(url);
  }

  public searchBook(name: Observable<string>) {
    return name.pipe(debounceTime(400),
    distinctUntilChanged(),
    switchMap(term => this.httpClient.get( `${this.bookApiURL}/search/${term}`)));
      
  }
}
