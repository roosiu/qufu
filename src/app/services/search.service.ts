import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  question =
    'Na co masz dzisiaj ochotę?/Może kurczak?/Może rosół?/Wyszukaj idealny przepis';

  private searchString = new BehaviorSubject<string>('');

  /**
   * Get search string from service
   * @date 2024-03-03
   * @returns { Observable<string> }
   */
  getSearchString(): Observable<string> {
    return this.searchString.asObservable();
  }

  /**
   * Set search string in service
   * @date 2024-03-03
   * @param { string } text
   */
  setSearchString(text: string) {
    this.searchString.next(text);
  }

  /**
   * Self initialize
   * @date 2024-03-03
   *
   */
  constructor(private http: HttpClient) {
    this.initialize();
  }
  /** Function to self initialize
   * desc
   * @date 2024-03-03
   * @returns { void }
   */
  initialize(): void {
    this.getJsonData('').subscribe((data) => {
      this.recipes = data;
    });
  }

  /**
   * Get data from server and database
   * @date 2024-03-03
   * @param { string } text
   * @returns { Observable<any[]> }
   */
  getJsonData(text: string): Observable<any[]> {
    return this.http.get<any>('https://pwksm.ovh/qufu/' + text);
  }

  recipes: any[] = [];
  imgLocation: string = 'https://pwksm.ovh/qufu/assets/images/';

  private cookStep = new BehaviorSubject<any>(null);

  /**
   * Get number of cook step in recipe
   * @date 2024-03-03
   * @returns { Observable<number> }
   */
  getcookStep(): Observable<number> {
    return this.cookStep.asObservable();
  }

  /**
   * Set number of cook step in recipe
   * @date 2024-03-03
   * @param { number } text
   */
  setcookStep(text: number) {
    this.cookStep.next(text);
  }
}
