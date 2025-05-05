import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleCocktailComponent } from './single-cocktail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from '../services/cocktail.service';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SingleCocktailComponent', () => {
  let component: SingleCocktailComponent;
  let fixture: ComponentFixture<SingleCocktailComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    await TestBed.configureTestingModule({
      imports: [SingleCocktailComponent],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService },
        { provide: Router, useValue: mockRouter },
        { provide: DomSanitizer, useValue: mockSanitizer },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '123']]) } } },
        { provide: BreakpointObserver, useValue: { observe: () => of({ matches: false }) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore les composants enfants
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCocktailComponent);
    component = fixture.componentInstance;
  });

  it('devrait charger le cocktail au démarrage', () => {
    const mockCocktail = {
      strDrink: 'Mojito',
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Highball glass',
      strInstructions: 'Mix with ice.',
      strTags: 'Summer,Refreshing',
      strDrinkThumb: 'http://image.url',
      strVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      strIngredient1: 'Rum',
      strMeasure1: '50ml',
      // autres propriétés à null ou undefined
    } as any;

    mockCocktailService.getCocktailById.and.returnValue(of(mockCocktail));
    mockSanitizer.bypassSecurityTrustResourceUrl.and.returnValue('safeUrl');

    fixture.detectChanges(); // déclenche ngOnInit

    expect(component.cocktail).toEqual(mockCocktail);
    expect(component.loading).toBeFalse();
    expect(component.ingredients.length).toBe(1);
    expect(component.tags).toEqual(['Summer', 'Refreshing']);
    expect(component.mediaItems.length).toBe(2); // image + vidéo
  });

  it('doit retourner l\'url d\'ingrédient correct', () => {
    component.isSmallScreen = true;
    const url = component.getIngredientImageUrl('Rum');
    expect(url).toContain('rum-small.png');
  });

  it('doit passer à la slide suivante', () => {
    component.mediaItems = [{ type: 'image', src: '1' }, { type: 'video', src: '2' }];
    component.selectedIndex = 0;
    component.nextSlide();
    expect(component.selectedIndex).toBe(1);
  });

  it('doit passer à la slide précédente', () => {
    component.mediaItems = [{ type: 'image', src: '1' }, { type: 'video', src: '2' }];
    component.selectedIndex = 0;
    component.prevSlide();
    expect(component.selectedIndex).toBe(1); // boucle arrière
  });

  it('doit naviguer vers /cocktails', () => {
    component.handleNavigateBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cocktails']);
  });

  it('doit extraire l\'embed Youtube depuis une URL', () => {
    const embed = component.extractYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(embed).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('doit retourner un tableau vide si aucun tag', () => {
    const tags = component.getTags({ strTags: null } as any);
    expect(tags).toEqual([]);
  });
});
