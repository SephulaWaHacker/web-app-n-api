import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { People } from '../shared/people';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Chuck } from './chuck';
import { SearchResponse } from './search-response';

const baseUrl = "http://localhost:42205/";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPeople(): Observable<People> {
    return this.http.get<People>(`${baseUrl}Swapi/people`)
                    .pipe(retry(1), catchError(this.handleError))
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${baseUrl}Chuck/categories`)
                    .pipe(retry(1), catchError(this.handleError))
  }

  getCategory(category: string): Observable<Chuck>{
    return this.http.get<Chuck>(`${baseUrl}Chuck/category?category=${category}`)
                    .pipe(retry(1), catchError(this.handleError))
  }

  search(term: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${baseUrl}Search?term=${term}`)
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
