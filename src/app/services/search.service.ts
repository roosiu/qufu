import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // pytanie z herosection
  question = 'Na co masz dzisiaj ochotę?';

  // wyszukiwana fraza
  // private searchString = new BehaviorSubject<string>('kur');
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

  // tablica z przepisami
  getJsonData(): Observable<any[]> {
    return this.http.get<any>('assets/data.json');
  }

  /// pobieranie jsona
  initialize(): void {
    this.getJsonData().subscribe((data) => {
      this.recipes = data;
    });
  }
  recipes: any[] = [];

  // kliknięcie w przepis
  private recipeClick = new BehaviorSubject<any>(null);
  // private recipeClick = new BehaviorSubject<any>(1); // po przerobieniu templatki zmienić na linie wyżej

  getrecipeClick(): Observable<number> {
    return this.recipeClick.asObservable();
  }

  setrecipeClick(text: number) {
    this.recipeClick.next(text);
  }

  //rozpoczęcie gotowania
  private cookStep = new BehaviorSubject<any>(null);
  // private cookStep = new BehaviorSubject<any>(1);

  getcookStep(): Observable<number> {
    return this.cookStep.asObservable();
  }

  setcookStep(text: number) {
    this.cookStep.next(text);
  }
}
