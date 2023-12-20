// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectType } from '../types/project-type';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController; 
  let testData: ProjectType[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    testData = [{id: 1, name: 'A', color:'red'},{id: 2, name: 'B', color:'blue'}];
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  

  it('should return expected project types (HttpClient called once)', () => {
    // make http get request
    httpClient.get<ProjectType[]>('project_types')
    .subscribe(projectTypes =>
      // when observable resolves, result should match test data
      expect(projectTypes).toEqual(testData)
    );
    
      const req = httpTestingController.expectOne('project_types');

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

    httpClient.get<ProjectType[]>('project_types')
    .subscribe({
      next: () => fail('should have failed with 404'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(errorMessage);
      },
    });

    const req = httpTestingController.expectOne('project_types');

    // Respond with mock error
    req.flush(errorMessage, {status: 404, statusText: 'Not Found'})
  });
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  })
});
