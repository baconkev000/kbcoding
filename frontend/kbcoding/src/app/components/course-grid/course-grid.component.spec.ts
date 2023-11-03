import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGridComponent } from './course-grid.component';
import { CourseType } from 'src/app/types/course-type';
import { ApiService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { CourseBoxHoverDirective } from 'src/app/directives/course-box/course-box-hover.directive';

class MockService {
  getCourseTypes = (): Observable<CourseType[]> => of([{name: 'A', color:'red'},{name: 'B', color:'blue'}]);
}
describe('CourseGridComponent', () => {
  let comp: CourseGridComponent;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseGridComponent, CourseBoxHoverDirective],
      providers: [
        CourseGridComponent,
        {provide: ApiService, useClass: MockService}
      ]
    });
    comp = TestBed.inject(CourseGridComponent);
    apiService = TestBed.inject(ApiService);
  });

  it('should use api service and assign correct data boxes variable', () => {
    let mockData = [{name: 'A', color:'red'},{name: 'B', color:'blue'}]
    comp.ngOnInit();
    expect(comp.boxes).toEqual(mockData)
  });

});