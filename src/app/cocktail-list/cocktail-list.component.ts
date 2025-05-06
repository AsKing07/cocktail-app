import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { CocktailComponent } from '../cocktail/cocktail.component';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cocktail-list',
  imports: [CommonModule, CocktailComponent],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
  standalone: true,
})
export class CocktailListComponent implements OnInit, OnDestroy {
  cocktails: Cocktail[] = [];
  state = {
    loading: true,
    error: '',
  };
private destroy$ = new Subject<boolean>();

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktails = [];
    this.loadCocktails();
  }

  loadCocktails(): void {
    this.state.loading = true;
    this.state.error = '';
    this.cocktailService.getRandomCocktails().pipe(
      takeUntil(this.destroy$) // Désinscription de l'observable lorsque le composant est détruit
    ).subscribe({
      next: (data) => {
        this.cocktails = data;
        setTimeout(() => {
          this.state.loading = false;
        }, 1000);
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