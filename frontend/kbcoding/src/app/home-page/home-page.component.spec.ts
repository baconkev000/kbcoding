import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { Observable, of } from 'rxjs';
import { CourseType } from '../types/course-type';
import { ApiService } from '../services/api.service';

class MockService {
  getCourseTypes = (): Observable<CourseType[]> => of([{id: 1,name: 'A', color:'red'},{id: 2, name: 'B', color:'blue'}]);
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let comp: HomePageComponent;
  let apiService: ApiService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, HomePageComponent],
      providers: [
        HomePageComponent,
        {provide: ApiService, useClass: MockService}
      ]
    });
    comp = TestBed.inject(HomePageComponent);
    apiService = TestBed.inject(ApiService);

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use api service and assign correct data boxes variable', () => {
    let mockData = [{id: 1, name: 'A', color:'red'},{id: 2, name: 'B', color:'blue'}]
    comp.ngOnInit();
    expect(comp.boxes).toEqual(mockData)
  });
});
