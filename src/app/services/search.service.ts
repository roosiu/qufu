import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

question = 'Na co masz dzisiaj ochotę?';

private searchString = new BehaviorSubject<string>('');

getSearchString(): Observable<string>{
  return this.searchString.asObservable();
}

setSearchString(text: string) {
  this.searchString.next(text);
}

}
