import { Component } from '@angular/core';
import { NgIcon, provideIcons  } from '@ng-icons/core';
import {diAngularOriginal, diTailwindcssOriginal, diTypescriptOriginal} from '@ng-icons/devicon/original';
import { faBrandAngular,   } from '@ng-icons/font-awesome/brands';

@Component({
  selector: 'app-about',
  imports: [NgIcon],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  viewProviders: [
    provideIcons({
      diAngularOriginal,
      diTailwindcssOriginal,
      diTypescriptOriginal,
      faBrandAngular,
    }),
  ],
 
})
export class AboutComponent {

}
