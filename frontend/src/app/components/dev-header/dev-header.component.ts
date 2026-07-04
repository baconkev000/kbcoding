import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dev-header',
  templateUrl: './dev-header.component.html',
})
export class DevHeaderComponent {
  @Input() name = '';
}
