import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getAuthToken(username:string, password: string): Observable<string> {
    const url: string = 'auth-token/';
    const data: any = {
      username: username,
      password: password,
    };
    
    return this.http.post<string>(url, data).pipe(
      tap(_ => this.log("fetched project types")),
      catchError(this.handleError<string>('getAuthToken', ""))
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
