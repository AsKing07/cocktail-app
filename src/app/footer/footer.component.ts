import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {lucideGithub} from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  viewProviders: [provideIcons({ lucideGithub })],
})
export class FooterComponent {

}
