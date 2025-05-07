import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { CocktailComponent } from '../cocktail/cocktail.component';
import {  BehaviorSubject, combineLatest, finalize, map, Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {faFaceSadTear} from '@ng-icons/font-awesome/regular';

@Component({
  selector: 'app-cocktail-list',
  imports: [CommonModule, CocktailComponent, NgIcon],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
  standalone: true,
  viewProviders: [provideIcons({ faFaceSadTear })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailListComponent implements OnInit, OnDestroy {
  cocktails: Cocktail[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>('');

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
private destroy$ = new Subject<boolean>();

viewState$ = combineLatest([
  this.loading$,
  this.error$
]).pipe(
  map(([loading, error]) => ({ loading, error }))
);

  constructor(private cocktailService: CocktailService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.cocktails = [];
    this.loadCocktails();

  }

  loadCocktails(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next('');
    this.cocktails = []; 
    
    this.cocktailService.getRandomCocktails().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
  
        const tempCocktails = data;
        
    
        setTimeout(() => {
          this.loadingSubject.next(false);
          this.cocktails = tempCocktails;
         
        }, 500); 
      },
      error: (error) => {
        setTimeout(() => {
          this.errorSubject.next(`Erreur lors de la récupération des cocktails : ${error.message}`);
          this.loadingSubject.next(false);
        }, 500);
      }
    });
  }
  
  onRefresh(): void {
    this.loadCocktails();
  }

  ngOnDestroy(): void {

    this.destroy$.next(true);
  }
}