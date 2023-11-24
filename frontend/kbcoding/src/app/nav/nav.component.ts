import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  links = [
    {
      name: 'Projects',
      url: 'projects',
    },
    {
      name: 'Add a Project',
      url: 'add-project',
    },
    {
      name: 'Login',
      url: '#',
    }
  ]
}
