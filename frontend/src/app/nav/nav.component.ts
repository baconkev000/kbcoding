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
      external: false,
    },
    {
      name: 'About Me',
      url: 'about',
      external: false,
    },
    {
      name: 'Resume',
      url: '/assets/docs/KevinBaconResume.pdf',
      external: true,
    },
  ];

  constructor(public router: Router) {}

  isActive(url: string): boolean {
    const path = this.router.url.split('?')[0];
    return path === `/${url}` || path.startsWith(`/${url}/`);
  }
}
