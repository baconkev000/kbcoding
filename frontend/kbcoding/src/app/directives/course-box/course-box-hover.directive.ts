import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCourseBoxHover]'
})
export class CourseBoxHoverDirective {
  @Input() appCourseBoxHover: string = 'white'

  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackground(this.appCourseBoxHover)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackground('transparent')
  }

  private changeBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
