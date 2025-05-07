import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { CocktailComponent } from '../cocktail/cocktail.component';
import {  Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {faFaceSadTear} from '@ng-icons/font-awesome/regular';

@Component({
  selector: 'app-cocktail-list',
  imports: [CommonModule, CocktailComponent, NgIcon],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
  standalone: true,
  viewProviders: [provideIcons({ faFaceSadTear })],
})
export class CocktailListComponent implements OnInit, OnDestroy {
  cocktails: Cocktail[] = [];
  initialized = false;
  state = {
    loading: true,
    error: '',
  };
private destroy$ = new Subject<boolean>();

  constructor(private cocktailService: CocktailService) {
    this.state.loading = true;
    this.state.error = '';
    
    this.cocktails = [];
  }

  ngOnInit(): void {
    this.state.loading = true;
    this.cocktails = [];
    this.loadCocktails();
    this.initialized = true; 
  }

  loadCocktails(): void {
    this.state.loading = true;
    this.state.error = '';
    this.cocktailService.getRandomCocktails().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.state.loading = false;
        this.cocktails = data;
      

      },
      error: (error) => {
        this.state.error = `Erreur lors de la récupération des cocktails : ${error.message}`;
        this.state.loading = false;
  
      },
    });
  }
  onRefresh(): void {
    this.loadCocktails();
  }

  ngOnDestroy(): void {

    this.destroy$.next(true);
  }
}