import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Guid } from 'guid-typescript';
import { UserFilter } from '../filter/UserFilter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath: string = "http://localhost:56808/api/user"

  constructor(private http: HttpClient
              ) { }

  getAll(filter: UserFilter): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiPath}/filter`, filter).pipe(
      catchError(this.handleError),
      map(this.jsonToUsers)
    )
  }

  getById(id: Guid) : Observable<User> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToUser)
    );
  }

  create(user: User) : Observable<User> {
    return this.http.post(this.apiPath, user).pipe(
      catchError(this.handleError),
      map(this.jsonToUser)
    );
  }

  update(user: User) : Observable<User> {
    return this.http.put(`${this.apiPath}/${user.id}`, user).pipe(
      catchError(this.handleError),
      map(() => user)
    );
  }

  delete(user: User) : Observable<any> {
    return this.http.put(`${this.apiPath}/remove/${user.id}`, user).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToUser(json: any): User {
    return json as User;
  }

  private jsonToUsers(json: any[]): User[] {
    const user: User[] = [];
    json.forEach(element => {
      user.push(element as User);
    });
    return user;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
