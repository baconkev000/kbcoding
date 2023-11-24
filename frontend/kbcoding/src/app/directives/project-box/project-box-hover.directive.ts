import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProjectBoxHover]'
})
export class ProjectBoxHoverDirective {
  @Input() appProjectBoxHover: string = 'white'

  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackground(this.appProjectBoxHover)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackground('transparent')
  }

  private changeBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
