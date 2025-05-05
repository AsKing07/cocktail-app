import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le titre "À propos"', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title?.textContent).toContain('À propos');
  });

  it('devrait contenir un lien vers TheCocktailDB', () => {
    const link = fixture.nativeElement.querySelector('a[href="https://www.thecocktaildb.com/"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.textContent).toContain('TheCocktailDB');
  });

  it('devrait contenir la liste des technologies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('Tailwind CSS');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.textContent).toContain('API REST');
  });

  it('devrait afficher l’image de l’API REST', () => {
    const img = fixture.nativeElement.querySelector('img[alt="API REST"]');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/icons/api-rest.jpg');
  });
});
