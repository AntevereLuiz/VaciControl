import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Manufacturer } from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private apiPath: string = "http://localhost:56808/api/manufacturer"

  constructor(private http: HttpClient
              ) { }

  getAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonToModel)
    )
  }

  jsonToModel(json: any[]): Manufacturer[] {
    const manufacturer: Manufacturer[] = [];
    json.forEach(element => {
        manufacturer.push(element as Manufacturer);
    });
    return manufacturer;
  }

  handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
