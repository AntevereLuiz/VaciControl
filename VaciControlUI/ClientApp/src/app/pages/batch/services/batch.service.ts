import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Batch } from '../models/batch.model';
import { Guid } from 'guid-typescript';
import { BatchFiler } from '../filter/BatchFilter';



@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private apiPath: string = "http://localhost:56808/api/batch"
  module: string;

  constructor(private http: HttpClient) { }

  getAll(filter: BatchFiler): Observable<Batch[]> {
    return this.http.post<Batch[]>(`${this.apiPath}/filter`, filter).pipe(
      catchError(this.handleError),
      map(this.jsonToBatches)
    )
  }

  getById(id: Guid) : Observable<Batch> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToBatch)
    );
  }

  create(batch: Batch) : Observable<Batch> {
    return this.http.post(this.apiPath, batch).pipe(
      catchError(this.handleError),
      map(this.jsonToBatch)
    );
  }

  update(batch: Batch) : Observable<Batch> {
    return this.http.put(`${this.apiPath}/${batch.id}`, batch).pipe(
      catchError(this.handleError),
      map(() => batch)
    );
  }

  delete(batch: Batch) : Observable<any> {
    return this.http.put(`${this.apiPath}/remove/${batch.id}`, batch).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToBatch(json: any): Batch {
    return json as Batch;
  }

  private jsonToBatches(json: any[]): Batch[] {
    const batch: Batch[] = [];
    json.forEach(element => {
      batch.push(element as Batch);
    });
    return batch;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
