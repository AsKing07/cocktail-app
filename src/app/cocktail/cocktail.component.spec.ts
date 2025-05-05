import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailComponent } from './cocktail.component';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

describe('CocktailComponent', () => {
  let component: CocktailComponent;
  let fixture: ComponentFixture<CocktailComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCocktail: Cocktail = {
    idDrink: '11000',
    strDrink: 'Margarita',

    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    strGlass: 'Cocktail glass',
    strInstructions: 'Rub the rim of the glass with lime juice to make the salt stick to it. Take care not to get any salt in the drink. Shake the other ingredients with ice, then carefully pour into the glass.',
    strIngredient1: 'Tequila',
    strMeasure1: '1 1/2 oz',
    strIngredient2: 'Triple sec',
    strMeasure2: '1/2 oz',
    strIngredient3: 'Lime juice',
    strMeasure3: '1 oz',

    // ...
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CocktailComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({ matches: false }), // simulate desktop view
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailComponent);
    component = fixture.componentInstance;
    component.cocktail = mockCocktail;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait initialiser les ingrédients correctement', () => {
    expect(component.ingredients.length).toBe(3);
    expect(component.ingredients).toContain('1 1/2 oz Tequila');
    expect(component.ingredients).toContain('1/2 oz Triple sec');
    expect(component.ingredients).toContain('1 oz Lime juice');
  });

  it('devrait afficher le nom du cocktail', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title?.textContent).toContain('Margarita');
  });

  it('devrait contenir une image avec la bonne source', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img?.getAttribute('src')).toBe(mockCocktail.strDrinkThumb);
    expect(img?.getAttribute('alt')).toBe(mockCocktail.strDrink);
  });

  it('devrait naviguer vers les détails au clic sur "Préparation"', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cocktail', mockCocktail.idDrink]);
  });

  it('devrait afficher au plus 4 ingrédients en desktop', () => {
    const spans = fixture.nativeElement.querySelectorAll('span.bg-indigo-500');
    expect(spans.length).toBeLessThanOrEqual(4);
  });
});
