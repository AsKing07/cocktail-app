import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideRouter, Routes, withComponentInputBinding} from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
   { path: 'cocktails', component: CocktailListComponent },
   { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/cocktails', pathMatch: 'full' },
  {
    path: 'cocktail/:id',
    loadComponent: ()=>import('./single-cocktail/single-cocktail.component').then(m=>m.SingleCocktailComponent),
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideHttpClient(withFetch())
  
  ]
};
