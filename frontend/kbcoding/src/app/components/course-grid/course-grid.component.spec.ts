import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGridComponent } from './course-grid.component';
import { Observable, of } from 'rxjs';
import { CourseType } from 'src/app/types/course-type';

class MockService {
  getCourseTypes = (): Observable<CourseType[]> => of([{name: 'A', color:'red'},{name: 'B', color:'blue'}]);
}
describe('CourseGridComponent', () => {
  let component: CourseGridComponent;
  let fixture: ComponentFixture<CourseGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseGridComponent]
    });
    fixture = TestBed.createComponent(CourseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
