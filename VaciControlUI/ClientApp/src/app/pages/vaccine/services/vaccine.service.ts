import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Vaccine } from '../models/vaccine.model';
import { Guid } from 'guid-typescript';
import { VaccineFilter } from '../filter/VaccineFilter';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private apiPath: string = "http://localhost:56808/api/vaccine"
  module: string;

  constructor(private http: HttpClient) { }

  getAll(filter: VaccineFilter): Observable<Vaccine[]> {
    return this.http.post<Vaccine[]>(`${this.apiPath}/filter`, filter).pipe(
      catchError(this.handleError),
      map(this.jsonToVaccines)
    )
  }

  getById(id: Guid) : Observable<Vaccine> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToVaccine)
    );
  }

  create(vaccine: Vaccine) : Observable<Vaccine> {
    return this.http.post(this.apiPath, vaccine).pipe(
      catchError(this.handleError),
      map(this.jsonToVaccine)
    );
  }

  update(vaccine: Vaccine) : Observable<Vaccine> {
    return this.http.put(`${this.apiPath}/${vaccine.id}`, vaccine).pipe(
      catchError(this.handleError),
      map(() => vaccine)
    );
  }

  delete(vaccine: Vaccine) : Observable<any> {
    return this.http.put(`${this.apiPath}/remove/${vaccine.id}`, vaccine).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToVaccine(json: any): Vaccine {
    return json as Vaccine;
  }

  private jsonToVaccines(json: any[]): Vaccine[] {
    const vaccine: Vaccine[] = [];
    json.forEach(element => {
      vaccine.push(element as Vaccine);
    });
    return vaccine;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
