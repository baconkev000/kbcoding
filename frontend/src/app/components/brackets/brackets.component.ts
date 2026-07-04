import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css'],
})
export class BracketsComponent {
  @Input() name = '';
  @Input() active = false;
}
