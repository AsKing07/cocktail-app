import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../services/cocktail.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, take, takeUntil } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-single-cocktail',
  imports: [CommonModule],
  templateUrl: './single-cocktail.component.html',
  styleUrl: './single-cocktail.component.scss',
  standalone: true
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

  mediaItems: { type: 'image' | 'video', src: string }[] = [];
selectedIndex = 0;
safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute, private cocktailService: CocktailService, private breakpointObserver: BreakpointObserver, private router: Router, private sanitizer: DomSanitizer
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
          this.tags = this.getTags(cocktail);
          this.prepareMediaItems(cocktail);

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
  }

  getTags(cocktail: Cocktail): string[] {
    return cocktail.strTags ? cocktail.strTags.split(',') : [];
    
  }

  getIngredientImageUrl(item: string): string {
    const size = this.isSmallScreen ? 'small' : 'medium';
    return `https://www.thecocktaildb.com/images/ingredients/${item.toLowerCase()}-${size}.png`;
  }

  prepareMediaItems(cocktail: Cocktail): void {
    this.mediaItems = [];
  
      if (cocktail.strDrinkThumb) {
        this.mediaItems.push({ type: 'image', src: cocktail.strDrinkThumb });
      }

      if (cocktail.strVideo) {
        const embedUrl = this.extractYouTubeEmbedUrl(cocktail.strVideo);
        console.log(embedUrl)
        if (embedUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          this.mediaItems.push({ type: 'video', src: this.safeVideoUrl as string });
        }
        
      }
  }

  extractYouTubeEmbedUrl(url: string): string | null {
    const match = url.match(/(?:\?v=|\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  nextSlide(): void {
    this.selectedIndex = (this.selectedIndex + 1) % this.mediaItems.length;
  }
  
  prevSlide(): void {
    this.selectedIndex = (this.selectedIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
  }



  handleNavigateBack(): void {
    this.router.navigate(['/cocktails']);

  }

}
