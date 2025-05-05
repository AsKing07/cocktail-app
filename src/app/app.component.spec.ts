import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, FooterComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('devrait contenir le composant app-header', () => {
    const headerEl = fixture.nativeElement.querySelector('app-header');
    expect(headerEl).toBeTruthy();
  });

  it('devrait contenir le router-outlet', () => {
    const outletEl = fixture.nativeElement.querySelector('router-outlet');
    expect(outletEl).toBeTruthy();
  });

  it('devrait contenir le composant app-footer', () => {
    const footerEl = fixture.nativeElement.querySelector('app-footer');
    expect(footerEl).toBeTruthy();
  });

  it('devrait contenir les classes de structure (header, app, footer)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header')).toBeTruthy();
    expect(compiled.querySelector('.app')).toBeTruthy();
    expect(compiled.querySelector('.footer')).toBeTruthy();
  });
});
