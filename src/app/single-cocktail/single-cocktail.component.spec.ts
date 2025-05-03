import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCocktailComponent } from './single-cocktail.component';

describe('SingleCocktailComponent', () => {
  let component: SingleCocktailComponent;
  let fixture: ComponentFixture<SingleCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCocktailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
