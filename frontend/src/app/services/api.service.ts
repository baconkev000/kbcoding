import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProjectType } from '../types/project-type';
import { Project } from '../types/project';
import { APIProject } from '../types/api-project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private base_url: string = "http://localhost:8000/"
  
  //environment.apiUrl;

  getprojectTypes(): Observable<ProjectType[]> {
    let url: string = this.base_url + 'project_types';
    return this.http.get<ProjectType[]>(url).pipe(
      tap(_ => this.log("fetched project types")),
      catchError(this.handleError<ProjectType[]>('getprojectTypes', []))
    )
  }

  getProjectTypeById(id:number): Observable<ProjectType> {
    let url: string = this.base_url + 'project_types/' + id;
    return this.http.get<ProjectType>(url).pipe(
      tap(_ => this.log("fetched project by id")),
      catchError(this.handleError<ProjectType>('getProjectType', ))
    )
  }

  getProjects(): Observable<Project[]> {
    let url: string = this.base_url + 'projects';
    return this.http.get<Project[]>(url).pipe(
      tap(_ => this.log("fetched projects")),
      catchError(this.handleError<Project[]>('getProjects', []))
    )
  }

  getProjectById(id:number): Observable<Project> {
    let url: string = this.base_url + 'projects/' + id;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log("fetched project by id")),
      catchError(this.handleError<Project>('getProject', ))
    )
  }

  postProject(project:APIProject): Observable<Project> {
    let url: string = this.base_url + 'projects/';
    return this.http.post<Project>(url, project)
    .pipe(
      
    );
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
