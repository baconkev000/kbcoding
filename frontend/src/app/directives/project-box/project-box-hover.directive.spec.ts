import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectBoxHoverDirective } from './project-box-hover.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
@Component({
  template: `
  <h2 [appProjectBoxHover]="'red'" >Something Red</h2>
  `
})
class TestComponent { }

describe('ProjectBoxHoverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ProjectBoxHoverDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.query(By.css('h2'));
  });

  it('should bind background to value color', () => {
    const elToHover = des.nativeElement as HTMLInputElement;
    console.log(elToHover.style.backgroundColor)
    expect(elToHover.style.backgroundColor)
      .withContext('initial backgroundColor')
      .toBe('');
    
    elToHover.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(elToHover.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('red');

      elToHover.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      expect(elToHover.style.backgroundColor)
        .withContext('changed backgroundColor')
        .toBe('transparent');      
    });
    

});
