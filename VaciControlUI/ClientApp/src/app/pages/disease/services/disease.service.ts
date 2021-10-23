import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap} from 'rxjs/operators';

import { Disease } from '../models/disease.model';

import { Guid } from 'guid-typescript';
import { DiseaseFilter } from '../filter/DiseaseFilter';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  private apiPath: string = "http://localhost:56808/api/disease";

  constructor(private http: HttpClient) {}


    
    getAll(filter: DiseaseFilter): Observable<Disease[]> {
      return this.http.post<Disease[]>(`${this.apiPath}/filter`, filter).pipe(
        catchError(this.handleError),
        map(this.jsonToDiseases)
      )
    }


    getById(id: Guid): Observable<Disease>{
      return this.http.get(`${this.apiPath}/${id}`).pipe(
        catchError(this.handleError),
        map(this.jsonToDisease)
      )
    }

    create(disease: Disease): Observable<Disease> {
      return this.http.post(this.apiPath, disease).pipe(
        catchError(this.handleError),
        map(this.jsonToDisease)
      )
    }

    update(disease: Disease): Observable<Disease> {
      return this.http.put(`${this.apiPath}/${disease.id}`, disease).pipe(
        catchError(this.handleError),
        map(() => disease)
      )
    }

    delete(disease: Disease): Observable<any> {
      return this.http.put(`${this.apiPath}/remove/${disease.id}`, disease).pipe(
        catchError(this.handleError),
        map(() => null)
      )
    }

    private jsonToDiseases(json: any[]): Disease[]{
      const disease: Disease[] = [];
      json.forEach(element => {
        disease.push(element as Disease);
      });
      return disease;
    }

    private jsonToDisease(json: any): Disease{
      return json as Disease;
    }


    private handleError(error: any): Observable<any>{
      console.log("ERRO NA REQUISIÇÃO => ", error);
      return throwError(error);
    }
    
}
