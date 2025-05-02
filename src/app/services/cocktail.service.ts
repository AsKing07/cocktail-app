import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  getRandomCocktails(count: number = 3): Observable<Cocktail[]> {
    const requests = Array.from({ length: count }, () => this.http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}random.php`));


    return forkJoin(requests).pipe(
      map(responses => responses.map(response => response.drinks[0]))
    );


  }
}
