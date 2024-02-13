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
      title: 'Skrzydełka z kurczaka w marynacie BBQ',
      body: 'Skrzydełka z kurczaka w marynacie BBQ to pyszna i aromatyczna przekąska, która idealnie nadaje się na imprezy lub jako danie główne. Prosta w przygotowaniu, a zarazem niezwykle smaczna!',
      ingredients: [
        'Skrzydełka z kurczaka - 1 kg',
        'Sos BBQ - 1/2 szklanki',
        'Miód - 2 łyżki',
        'Sok z cytryny - 2 łyżki',
        'Papryka słodka - 1 łyżeczka',
        'Czosnek granulowany - 1 łyżeczka',
        'Sól i pieprz do smaku',
      ],
      steps: [
        '1. W dużym naczyniu wymieszaj sos BBQ, miód, sok z cytryny, paprykę słodką, czosnek granulowany, sól i pieprz.',
        '2. Dodaj skrzydełka z kurczaka do marynaty i dokładnie wymieszaj, aby pokryły się z każdej strony.',
        '3. Odstaw marynowane skrzydełka do lodówki na co najmniej 2 godziny lub najlepiej na całą noc, aby nabierały aromatu.',
        '4. Rozgrzej piekarnik do 200°C i przygotuj blaszkę wyłożoną folią aluminiową.',
        '5. Wyjmij skrzydełka z marynaty i ułóż je na blaszce.',
        '6. Piecz skrzydełka w rozgrzanym piekarniku przez około 25-30 minut, aż będą rumiane i dobrze przypieczone.',
        '7. Podawaj skrzydełka z dodatkowym sosem BBQ oraz ulubionymi dodatkami, np. sałatką czy frytkami.',
      ],
      steps_icon: ['cutting', '', '', '', '', '', ''],
      img: '1.jpg',
      time: 120,
    },
    {
      id: 2,
      title: 'Sałatka grecka z dodatkiem serka feta',
      body: 'Sałatka grecka to klasyczne połączenie świeżych warzyw, oliwek i sera feta. Jest idealna na letnie dni!',
      ingredients: [
        'Pomidory - 2 sztuki',
        'Ogórek - 1 sztuka',
        'Czerwona cebula - 1 sztuka',
        'Papryka czerwona - 1 sztuka',
        'Oliwki - 1/2 szklanki',
        'Ser feta - 150g',
        'Oliwa z oliwek - 3 łyżki',
        'Sól i pieprz do smaku',
      ],
      steps: [
        '1. Pokrój pomidory, ogórka, cebulę i paprykę w kostkę.',
        '2. Wymieszaj warzywa w misce.',
        '3. Dodaj oliwki i pokruszony ser feta.',
        '4. Polej wszystko oliwą z oliwek.',
        '5. Dopraw solą i pieprzem.',
        '6. Delikatnie wymieszaj i odstaw do lodówki na chwilę przed podaniem.',
      ],
      steps_icon: ['', '', '', '', '', ''],
      img: '2.jpg',
      time: 20,
    },
    {
      id: 3,
      title: 'Pasta Carbonara',
      body: 'Pasta Carbonara to klasyczne danie kuchni włoskiej, które zachwyca prostotą i smakiem.',
      ingredients: [
        'Makaron spaghetti - 200g',
        'Boczek - 100g',
        'Żółtka jaj - 2 sztuki',
        'Ser parmezan - 50g',
        'Śmietanka 30% - 100ml',
        'Czosnek - 2 ząbki',
        'Sól i pieprz do smaku',
      ],
      steps: [
        '1. Ugotuj makaron al dente według instrukcji na opakowaniu.',
        '2. Podsmaż na patelni boczek pokrojony w paski.',
        '3. W osobnej misce wymieszaj żółtka, starty ser parmezan, śmietankę oraz przeciśnięty przez praskę czosnek.',
        '4. Odcedź makaron i dodaj go do patelni z boczkiem.',
        '5. Zmniejsz ogień i dodaj mieszankę żółtek i sera, cały czas mieszając.',
        '6. Dopraw solą i pieprzem, mieszaj jeszcze przez chwilę.',
        '7. Podawaj posypane dodatkowym serem i świeżym pieprzem.',
      ],
      steps_icon: ['🍝', '🥓', '🍳', '🥄', '🧂'],
      img: '3.jpg',
      time: 30,
    },
    {
      id: 4,
      title: 'Sałatka z kurczakiem i awokado',
      body: 'Sałatka z kurczakiem i awokado to świetny wybór na lekkie i pożywne danie.',
      ingredients: [
        'Filet z kurczaka - 200g',
        'Awokado - 1 sztuka',
        'Mix sałat - 100g',
        'Pomidory koktajlowe - 100g',
        'Cytryna - 1 sztuka',
        'Oliwa z oliwek - 2 łyżki',
        'Sól i pieprz do smaku',
      ],
      steps: [
        '1. Pokrój kurczaka w kostkę i usmaż na patelni.',
        '2. Pokrój awokado, pomidory i dodaj do miski z sałatą.',
        '3. Dodaj usmażonego kurczaka.',
        '4. Skrop sałatkę sokiem z cytryny i oliwą z oliwek.',
        '5. Dopraw solą i pieprzem, delikatnie wymieszaj.',
      ],
      steps_icon: ['🐔', '🥑', '🍅', '🍋', '🧂'],
      img: '4.jpg',
      time: 25,
    },
    {
      id: 5,
      title: 'Tortilla z warzywami',
      body: 'Tortilla z warzywami to szybki i zdrowy posiłek, który zaspokoi głód i dostarczy niezbędnych składników odżywczych.',
      ingredients: [
        'Tortille - 4 sztuki',
        'Papryka czerwona - 1 sztuka',
        'Papryka żółta - 1 sztuka',
        'Cebula - 1 sztuka',
        'Czosnek - 2 ząbki',
        'Oliwa z oliwek - 2 łyżki',
        'Sól i pieprz do smaku',
        'Guacamole i salsa do podania',
      ],
      steps: [
        '1. Pokrój paprykę i cebulę w paski.',
        '2. Rozgrzej oliwę na patelni i podsmaż warzywa z czosnkiem.',
        '3. Rozgrzej tortille na suchej patelni.',
        '4. Nałóż na każdą tortillę część smażonych warzyw.',
        '5. Dopraw solą i pieprzem, zwiń tortille.',
        '6. Podawaj z guacamole i salsą.',
      ],
      steps_icon: ['🌯', '🌶️', '🧅', '🍳', '🥑'],
      img: '5.jpg',
      time: 20,
    },
    {
      id: 6,
      title: 'Mojito',
      body: 'Mojito to orzeźwiający drink na bazie białego rumu, soku z limonki, świeżej mięty i syropu cukrowego. Idealny na letnie dni!',
      ingredients: [
        'Biały rum - 50 ml',
        'Sok z limonki - 30 ml',
        'Syrop cukrowy - 20 ml',
        'Świeża mięta - kilka listków',
        'Woda gazowana - do uzupełnienia',
        'Lod cubes - do podania',
        'Plastry limonki i gałązki mięty - do dekoracji',
      ],
      steps: [
        '1. W szklance typu highball umieść kilka listków mięty.',
        '2. Zgnieć miętę za pomocą tłuczka do drinków, aby uwolnić jej aromat.',
        '3. Dodaj do szklanki sok z limonki i syrop cukrowy.',
        '4. Napełnij szklankę lodem.',
        '5. Wlej rum.',
        '6. Delikatnie wymieszaj składniki za pomocą mieszadła.',
        '7. Uzupełnij szklankę wodą gazowaną.',
        '8. Ukraszaj drink plasterkami limonki i gałązkami mięty.',
        '9. Podawaj z rurką do picia.',
      ],
      img: '6.jpg',
      time: 10,
    },
  ];

  // kliknięcie w przepis
  // private recipeClick = new BehaviorSubject<any>(null);
  private recipeClick = new BehaviorSubject<any>(1); // po przerobieniu templatki zmienić na linie wyżej

  getrecipeClick(): Observable<number> {
    return this.recipeClick.asObservable();
  }

  setrecipeClick(text: number) {
    this.recipeClick.next(text);
  }

  //rozpoczęcie gotowania
  // private cookStep = new BehaviorSubject<any>(null);
  private cookStep = new BehaviorSubject<any>(1);

  getcookStep(): Observable<number> {
    return this.cookStep.asObservable();
  }

  setcookStep(text: number) {
    this.cookStep.next(text);
  }
}
