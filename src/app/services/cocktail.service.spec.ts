import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';
import { Cocktail } from '../models/cocktail.model';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailService]
    });

    service = TestBed.inject(CocktailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête pendante n'existe
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer un cocktail par ID', () => {
    const dummyCocktail: Cocktail = { idDrink: '11007', strDrink: 'Margarita' } as Cocktail;

    service.getCocktailById('11007').subscribe((cocktail) => {
      expect(cocktail).toEqual(dummyCocktail);
    });

    const req = httpMock.expectOne(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007`);
    expect(req.request.method).toBe('GET');
    req.flush({ drinks: [dummyCocktail] });
  });

  it('devrait récupérer plusieurs cocktails aléatoires', (done) => {
    const dummyCocktails: Cocktail[] = [
      { idDrink: '1', strDrink: 'Cocktail 1' } as Cocktail,
      { idDrink: '2', strDrink: 'Cocktail 2' } as Cocktail,
      { idDrink: '3', strDrink: 'Cocktail 3' } as Cocktail
    ];

    service.getRandomCocktails(3).subscribe((cocktails) => {
      expect(cocktails.length).toBe(3);
      expect(cocktails).toEqual(dummyCocktails);
      done(); 
    });

    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne((req) =>
        req.url.startsWith('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      );
      expect(req.request.method).toBe('GET');
      req.flush({ drinks: [dummyCocktails[i]] });
    }
  });
});
