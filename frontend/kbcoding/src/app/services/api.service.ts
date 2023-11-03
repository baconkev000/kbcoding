import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CourseType } from '../types/course-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private base_url: string = "api/v1/"

  getCourseTypes(): Observable<CourseType[]> {
    let url: string = this.base_url + 'course_types';
    return this.http.get<CourseType[]>(url).pipe(
      tap(_ => this.log("fetched course types")),
      catchError(this.handleError<CourseType[]>('getCourseTypes', []))
    )
  }

  /**
   * Handles Http operation that failed.
   * 
   * @param operation 
   * @param result 
   * @returns 
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string){
    console.log(message)
  }
}
