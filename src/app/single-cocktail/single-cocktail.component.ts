import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../services/cocktail.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-single-cocktail',
  imports: [CommonModule],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.scss'
})
export class SingleCocktailComponent implements OnInit, OnDestroy {

  cocktail: Cocktail| null = null;
  ingredients: {
    ingredient: string;

    imageUrl: string;
  }[] = [];
  loading= true;
  tags: string[] = [];

  destroy$ = new Subject<boolean>();

  isSmallScreen: boolean = false;

  constructor(
    private route: ActivatedRoute, private cocktailService: CocktailService, private breakpointObserver: BreakpointObserver
  ){}

  ngOnInit(): void {

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.isSmallScreen = result.matches;
      
    });


      const id = this.route.snapshot.paramMap.get('id');
      if(id)
        {
          this.cocktailService.getCocktailById(id).subscribe((cocktail: Cocktail) => {
            this.cocktail = cocktail;
          this.getIngredients(cocktail);
            this.loading = false;
          });
          
        }

     
  }
  
  ngOnDestroy(): void {
      this.destroy$.next(true);
  }

  getIngredients(cocktail: Cocktail):void  {
for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail];

    if (ingredient) {
      this.ingredients.push({
     
        ingredient: `${measure ? measure : ''} ${ingredient}`.trim(),
        imageUrl: this.getIngredientImageUrl(ingredient)
      });
    }
}


    // return Array.from({ length: 15 })
    //   .map((_, i) => cocktail[`strIngredient${i + 1}` as keyof Cocktail])
    //   .filter(item => !!item) as string[];
  }

  getTags(cocktail: Cocktail): string[] {
    console.log(cocktail.strTags);
    return cocktail.strTags ? cocktail.strTags.split(',') : [];
    
  }

  getIngredientImageUrl(item: string): string {
    const size = this.isSmallScreen ? 'small' : 'medium';
    return `https://www.thecocktaildb.com/images/ingredients/${item.toLowerCase()}-${size}.png`;
  }


}
