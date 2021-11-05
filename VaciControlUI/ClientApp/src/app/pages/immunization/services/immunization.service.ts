import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Immunization } from '../models/immunization.model';
import { Guid } from 'guid-typescript';
// import { ImmunizationFilter } from '../filter/ImmunizationFilter';

@Injectable({
  providedIn: 'root'
})
export class ImmunizationService {

  private apiPath: string = "http://localhost:56808/api/immunization"
  module: string;

  constructor(private http: HttpClient) { }

//   getAll(filter: ImmunizationFilter): Observable<Immunization[]> {
//     return this.http.post<Immunization[]>(`${this.apiPath}/filter`, filter).pipe(
//       catchError(this.handleError),
//       map(this.jsonToUsers)
//     )
//   }

  getById(id: Guid) : Observable<Immunization> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToUser)
    );
  }

  create(immunization: Immunization) : Observable<Immunization> {
    return this.http.post(this.apiPath, immunization).pipe(
      catchError(this.handleError),
      map(this.jsonToUser)
    );
  }

  update(immunization: Immunization) : Observable<Immunization> {
    return this.http.put(`${this.apiPath}/${immunization.id}`, immunization).pipe(
      catchError(this.handleError),
      map(() => immunization)
    );
  }

  delete(immunization: Immunization) : Observable<any> {
    return this.http.put(`${this.apiPath}/remove/${immunization.id}`, immunization).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToUser(json: any): Immunization {
    return json as Immunization;
  }

  private jsonToUsers(json: any[]): Immunization[] {
    const immunization: Immunization[] = [];
    json.forEach(element => {
      immunization.push(element as Immunization);
    });
    return immunization;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }  
}
