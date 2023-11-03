import { ApiService } from './api.service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseType } from '../types/course-type';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController; 
  let testData: CourseType[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    testData = [{name: 'A', color:'red'},{name: 'B', color:'blue'}];
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  

  it('should return expected course types (HttpClient called once)', () => {
    // make http get request
    httpClient.get<CourseType[]>('course_types')
    .subscribe(courseTypes =>
      // when observable resolves, result should match test data
      expect(courseTypes).toEqual(testData)
    );
    
      const req = httpTestingController.expectOne('course_types');

      // assert that the request is equal to get
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(testData);

      // assert that there are no outstanding requests
      httpTestingController.verify();
  });

  it('can test for error', () => {
    const errorMessage = 'deliberate 404 error';

    httpClient.get<CourseType[]>('course_types')
    .subscribe({
      next: () => fail('should have failed with 404'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(errorMessage);
      },
    });

    const req = httpTestingController.expectOne('course_types');

    // Respond with mock error
    req.flush(errorMessage, {status: 404, statusText: 'Not Found'})
  });
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  })
});
