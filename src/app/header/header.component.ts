import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideMenu} from '@ng-icons/lucide';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink, NgIcon, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  viewProviders: [provideIcons({lucideMenu})],
})
export class HeaderComponent {


  toogleMenu: boolean = false;
  toggleMenuHandler() {
    this.toogleMenu = !this.toogleMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocmentClick(event: Event)
  {
    const target = event.target as HTMLElement;
    const isMenuButton = target.closest('#menuButton');
    const isMenu = target.closest('#mobile-menu');
    if (!isMenuButton && !isMenu) {
      this.toogleMenu = false;
    }
  }
}
