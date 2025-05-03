import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, concatMap, delay, of, toArray, mergeMap, takeUntil } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  getRandomCocktails(count: number = 3): Observable<Cocktail[]> {
    return of(...Array(count)).pipe(
      concatMap(() =>
        of(null).pipe(
          delay(300),
          concatMap(() => this.http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}random.php?nocache=${Date.now()}`)),
          map(response => response.drinks[0])
        )
      ),
      toArray() 
    
    );
  }

  getCocktailById(id: string): Observable<Cocktail> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.apiUrl}lookup.php?i=${id}`).pipe(
      map(response => response.drinks[0])
    );
  }
}
