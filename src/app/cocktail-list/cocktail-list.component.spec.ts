import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CocktailListComponent } from './cocktail-list.component';
import { CocktailService } from '../services/cocktail.service';
import { of, throwError } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockCocktails: Cocktail[] = [
    {
      idDrink: '1',
      strDrink: 'Mojito',
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strDrinkThumb: 'https://example.com/mojito.jpg',
      strInstructions: '...',
      strGlass: 'Highball glass',
      strIngredient1: 'Rum',
      strMeasure1: '2 oz',
      strIngredient2: 'Mint',
      strMeasure2: '1 sprig',
 
    },
    {
      idDrink: '2',
      strDrink: 'Bloody Mary',
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strInstructions: '...',
      strGlass: 'Highball glass',
      strDrinkThumb: 'https://example.com/bloody.jpg',
      strIngredient1: 'Vodka',
      strMeasure1: '1 oz',
      strIngredient2: 'Tomato juice',
      strMeasure2: '2 oz',

    }
  ];

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getRandomCocktails']);

    await TestBed.configureTestingModule({
      imports: [CocktailListComponent],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les cocktails au démarrage', fakeAsync(() => {
    mockCocktailService.getRandomCocktails.and.returnValue(of(mockCocktails));

    fixture.detectChanges(); // ngOnInit
    tick(1000); // pour simuler le setTimeout
    fixture.detectChanges();

    expect(component.cocktails.length).toBe(2);
    expect(component.state.loading).toBeFalse();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-cocktail').length).toBe(2);
  }));

  it('devrait afficher le loader pendant le chargement', () => {
    mockCocktailService.getRandomCocktails.and.returnValue(of([]));

    component.state.loading = true;
    fixture.detectChanges();

    const loader = fixture.nativeElement.querySelector('.animate-spin');
    expect(loader).toBeTruthy();
  });

  it('devrait afficher un message d’erreur en cas d’échec du service', fakeAsync(() => {
    mockCocktailService.getRandomCocktails.and.returnValue(
      throwError(() => new Error('Erreur réseau'))
    );

    fixture.detectChanges(); // ngOnInit
    tick();
    fixture.detectChanges();

    expect(component.state.error).toContain('Erreur lors de la récupération');
    const errorText = fixture.nativeElement.querySelector('.text-red-500');
    expect(errorText).toBeTruthy();
  }));

  it('devrait appeler `loadCocktails()` lorsqu’on clique sur le bouton Rafraîchir', fakeAsync(() => {
    mockCocktailService.getRandomCocktails.and.returnValue(of(mockCocktails));

    fixture.detectChanges(); // ngOnInit
    tick(1000);
    fixture.detectChanges();

    const refreshButton = fixture.nativeElement.querySelector('button');
    refreshButton.click();

    expect(mockCocktailService.getRandomCocktails).toHaveBeenCalledTimes(2);
  }));
});
