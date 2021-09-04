import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath: string = "http://localhost:56808/api/user"

  constructor(private http: HttpClient
              ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonToModel)
    )
  }

  jsonToModel(json: any[]): User[] {
    const user: User[] = [];
    json.forEach(element => {
      user.push(element as User);
    });
    return user;
  }

  handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
