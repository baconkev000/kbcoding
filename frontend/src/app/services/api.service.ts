import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProjectType } from '../types/project-type';
import { ProjectMedia } from '../types/project_media';
import { Project } from '../types/project';
import { APIProject } from '../types/api-project';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private base_url: string = "/api/"
  
  //environment.apiUrl;

  getprojectTypes(): Observable<ProjectType[]> {
    let url: string = this.base_url + 'project_types';
    console.log("url", url)
    return this.http.get<ProjectType[]>(url).pipe(
      catchError(this.handleError<ProjectType[]>('getprojectTypes', []))
    )
  }

  getProjectTypeById(id:number): Observable<ProjectType> {
    let url: string = this.base_url + 'project_types/' + id;
    return this.http.get<ProjectType>(url).pipe(
      catchError(this.handleError<ProjectType>('getProjectType', ))
    )
  }

  getProjects(): Observable<Project[]> {
    let url: string = this.base_url + 'projects';
    return this.http.get<Project[]>(url).pipe(
      catchError(this.handleError<Project[]>('getProjects', []))
    )
  }

  getProjectById(id:number): Observable<Project> {
    let url: string = this.base_url + 'projects/' + id;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>('getProject', ))
    )
  }

  postProject(project: APIProject): Observable<Project> { 
    let url: string = this.base_url + 'projects/';

    const formData = new FormData();
    
    // Append text fields
    formData.append("title", project.title);
    formData.append("overview", project.overview);
    formData.append("description", project.description);
    formData.append("project_type", project.project_type);

    // Append media files
    if (project.media) {
        project.media.forEach((media, index) => {
            formData.append(`media[${index}][name]`, media.name);
            formData.append(`media[${index}][url]`, media.url); // Append actual file
        });
    }

    return this.http.post<Project>(url, formData, httpOptions).pipe(
        tap(response => console.log("Server response:", response)),  // If request succeeds
        catchError(error => {
            console.error("Request failed:", error);  // If request fails
            return throwError(error);
        })
    );
  }

  postMedia(project: ProjectMedia): Observable<ProjectMedia> { 
    let url: string = this.base_url + 'project_media/';
    console.log("URL", project)
    return this.http.post<ProjectMedia>(url, project, httpOptions).pipe(
        tap(response => console.log("Server response:", response)),  // If request succeeds
        catchError(error => {
            console.error("Request failed:", error);  // If request fails
            return throwError(error);
        })
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
