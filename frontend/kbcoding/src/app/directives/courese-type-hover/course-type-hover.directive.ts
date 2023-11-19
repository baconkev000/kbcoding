import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCourseTypeHover]'
})
export class CourseTypeHoverDirective {
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackground()
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackground()
  }

  private changeBackground(): void {
    if(!this.el.nativeElement.classList.contains('active')){
      this.el.nativeElement.classList.toggle('border-hidden')
    }
  }
}
