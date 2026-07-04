import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-parens',
  templateUrl: './code-parens.component.html',
})
export class CodeParensComponent {
  @Input() func = false;
}
