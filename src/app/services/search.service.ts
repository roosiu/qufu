import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // pytanie z herosection
  question =
    'Na co masz dzisiaj ochotę?/Może kurczak?/Może rosół?/Wyszukaj idealny przepis';

  // wyszukiwana fraza
  private searchString = new BehaviorSubject<string>('');

  getSearchString(): Observable<string> {
    return this.searchString.asObservable();
  }

  setSearchString(text: string) {
    this.searchString.next(text);
  }

  constructor(private http: HttpClient) {
    this.initialize();
  }
  initialize(): void {
    this.getJsonData('').subscribe((data) => {
      this.recipes = data;
    });
  }
  // tablica z przepisami
  getJsonData(text: string): Observable<any[]> {
    return this.http.get<any>('https://pwksm.ovh/qufu/' + text);
  }

  recipes: any[] = [];
  imgLocation: string = 'https://pwksm.ovh/qufu/assets/images/';
  // kliknięcie w przepis

  //rozpoczęcie gotowania
  private cookStep = new BehaviorSubject<any>(null);

  getcookStep(): Observable<number> {
    return this.cookStep.asObservable();
  }

  setcookStep(text: number) {
    this.cookStep.next(text);
  }
}
