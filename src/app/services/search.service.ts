import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

private sum = new Subject<string>();

  constructor() { }

  question = 'Na co masz dzisiaj ochotę?';
  searchString = '';

  sumFun() {
    this.sum.next(this.searchString);

  };

  getSum(): Observable<string> {

    return this.sum.asObservable();
  }
}
