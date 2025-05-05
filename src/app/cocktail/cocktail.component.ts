import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail',
  imports: [CommonModule],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent implements OnInit, OnDestroy {
  @Input() cocktail!: Cocktail;
  ingredients: string[] = [];
  isMobile: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit(): void {
      this.ingredients = [];


      this.subscription.add(
        this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
          this.isMobile = result.matches;
        })
  
      );
    

 
    this.getIngredients(this.cocktail);
  }


  goToDetails()
  {
    this.router.navigate(['/cocktail', this.cocktail.idDrink]);
  }

  getIngredients(cocktail: Cocktail): void {
    this.ingredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail];

      if (ingredient) {
        this.ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
      }
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
