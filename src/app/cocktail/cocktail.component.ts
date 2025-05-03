import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail',
  imports: [CommonModule],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss'
})
export class CocktailComponent implements OnInit {
  @Input() cocktail!: Cocktail;
  ingredients: string[] = [];

  constructor(private router: Router) { }
  ngOnInit(): void {
      this.ingredients = [];

      for (let i = 1; i<=15; i++)
      {
        const ingredient = this.cocktail[`strIngredient${i}` as keyof Cocktail];
        const measure = this.cocktail[`strMeasure${i}` as keyof Cocktail];

        if(ingredient) {
          this.ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
        }
      }
  }


  goToDetails()
  {
    this.router.navigate(['/cocktail', this.cocktail.idDrink]);
  }

}
