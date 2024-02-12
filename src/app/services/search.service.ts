import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  // tablica z przepisami

  recipes = [
    {
      id: 1,
      title: 'Kurczak z warzywami po koreańsku',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet consequatur culpa accusamus ipsum blanditiis quia facere minus voluptatem dolores, laboriosam est distinctio beatae et ea dicta repudiandae amet modi delectus!',
      ingredients: ['Udka z kurczaka - 200g', 'przyprawa - 2 łyzki'],
      steps: ['krok 1', 'krok 2', 'krok 3'],
      steps_icon: ['', '', ''],
      img: '1.jpg',
      time: 60,
    },
    {
      id: 2,
      title: 'Kurczak z warzywami po japońsku',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet consequatur culpa accusamus ipsum blanditiis quia facere minus voluptatem dolores, laboriosam est distinctio beatae et ea dicta repudiandae amet modi delectus!',
      ingredients: ['Udka z kurczaka - 200g', 'przyprawa - 2 łyzki', '', ''],
      steps: ['krok 1', 'krok 2', 'krok 3'],
      steps_icon: ['', '', ''],
      img: '1.jpg',
      time: 35,
    },
  ];

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
