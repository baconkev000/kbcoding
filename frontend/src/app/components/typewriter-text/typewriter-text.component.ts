import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter-text',
  templateUrl: './typewriter-text.component.html',
})
export class TypewriterTextComponent implements OnInit {
  @Input() text = '';
  displayed = '';

  ngOnInit(): void {
    let index = 0;
    const interval = window.setInterval(() => {
      if (index < this.text.length) {
        this.displayed += this.text[index];
        index++;
        return;
      }
      window.clearInterval(interval);
    }, 45);
  }
}
