import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantsService, NavLink } from '../../services/constants.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  private constantsService = inject(ConstantsService);
  
  active = '';
  toggle = false;
  navLinks: NavLink[] = this.constantsService.navLinks;

  handleNavClick(nav: NavLink): void {
    if (nav.title === 'Blog') {
      // Redirect to external URL for Blog
      window.open('https://dev.to/mirajhad', '_blank');
    } else {
      this.active = nav.title;
    }
    this.toggle = false; // Close the mobile menu if open
  }

  scrollToTop(): void {
    this.active = '';
    window.scrollTo(0, 0);
  }

  toggleMobileMenu(): void {
    this.toggle = !this.toggle;
  }
}
