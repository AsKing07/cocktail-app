import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIconsModule } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        NgIconsModule.withIcons({ lucideMenu }), // icône
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le titre Cocktail Explorer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cocktail Explorer');
  });

  it('devrait afficher les liens de navigation principaux (desktop)', () => {
    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links.length).toBeGreaterThanOrEqual(2);
    const linkTexts = links.map(el => el.nativeElement.textContent.trim());
    expect(linkTexts).toContain('Cocktails');
    expect(linkTexts).toContain('About');
  });

  it('devrait afficher le menu mobile quand toggleMenuHandler est appelé', () => {
    component.toogleMenu = false;
    component.toggleMenuHandler();
    fixture.detectChanges();

    const mobileMenu = fixture.nativeElement.querySelector('#mobile-menu');
    expect(mobileMenu).toBeTruthy();
  });

  it('devrait masquer le menu mobile si clic à l’extérieur', () => {
    component.toogleMenu = true;
    fixture.detectChanges();

    // Simulation d'un clic en dehors du menu
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    document.body.dispatchEvent(event); // Dispatch the event on the body
    fixture.detectChanges();

    expect(component.toogleMenu).toBeFalse();
  });

  it('doit appeler la fonction toggleMenuHandler si on clique sur le bouton du menu', () => {
    spyOn(component, 'toggleMenuHandler'); // Spy on the method
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('#menuButton');
    menuButton.dispatchEvent(new Event('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.toggleMenuHandler).toHaveBeenCalled(); // Check if the method was called
  });
});
