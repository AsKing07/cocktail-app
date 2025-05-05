import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent], // car c'est un composant standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le texte de copyright', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('© 2025 Cocktail Explorer. Tous droits réservés.');
  });

  it('devrait contenir un lien vers le profil GitHub', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="https://github.com/Asking07"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('devrait afficher l’icône GitHub', () => {
    const icon = fixture.debugElement.query(By.css('ng-icon'));
    expect(icon).toBeTruthy();
  });
});
