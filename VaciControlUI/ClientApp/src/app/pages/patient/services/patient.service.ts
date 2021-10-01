import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Guid } from 'guid-typescript';
import { PatientFilter } from '../filter/PatientFilter';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiPath: string = "http://localhost:56808/api/patient"

  constructor(private http: HttpClient
              ) { }

  getAll(filter: PatientFilter): Observable<Patient[]> {
    return this.http.post<Patient[]>(`${this.apiPath}/filter`, filter).pipe(
      catchError(this.handleError),
      map(this.jsonToUsers)
    )
  }

  private jsonToUsers(json: any[]): Patient[] {
    const user: Patient[] = [];
    json.forEach(element => {
      user.push(element as Patient);
    });
    return user;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
