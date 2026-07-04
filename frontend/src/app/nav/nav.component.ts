import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  links = [
    {
      name: 'Portfolio',
      url: 'projects',
    },
    {
      name: 'About Me',
      url: 'about',
    },
    {
      name: 'Add a Project',
      url: 'add-project',
    },
    {
      name: 'Login',
      url: '#',
    }
  ];

  constructor(public router: Router) {}

  isActive(url: string): boolean {
    if (url === '#') {
      return false;
    }
    const path = this.router.url.split('?')[0];
    return path === `/${url}` || path.startsWith(`/${url}/`);
  }
}
