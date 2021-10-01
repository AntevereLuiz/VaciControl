import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Manufacturer } from '../models/manufacturer.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private apiPath: string = "http://localhost:56808/api/manufacturer"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonToManufacturers)
    )
  }

  getById(id: Guid) : Observable<Manufacturer> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToManufacturer)
    );
  }

  create(manufacturer: Manufacturer) : Observable<Manufacturer> {
    return this.http.post(this.apiPath, manufacturer).pipe(
      catchError(this.handleError),
      map(this.jsonToManufacturer)
    );
  }

  update(manufacturer: Manufacturer) : Observable<Manufacturer> {
    return this.http.put(`${this.apiPath}/${manufacturer.id}`, manufacturer).pipe(
      catchError(this.handleError),
      map(() => manufacturer)
    );
  }

  delete(manufacturer: Manufacturer) : Observable<any> {
    return this.http.put(`${this.apiPath}/remove/${manufacturer.id}`, manufacturer).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToManufacturer(json: any): Manufacturer {
    return json as Manufacturer;
  }

  private jsonToManufacturers(json: any[]): Manufacturer[] {
    const manufacturer: Manufacturer[] = [];
    json.forEach(element => {
      manufacturer.push(element as Manufacturer);
    });
    return manufacturer;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
