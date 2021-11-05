import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Guid } from 'guid-typescript';

//import { ageGroupsAndCampaignsFilter } from '../filter/ageGroupsAndCampaignsFilter';
import { Campaigns } from '../models/Campaigns.model';

@Injectable({
    providedIn: 'root'
  })
  export class AgeGroupsAndCampaignsService {
  
    private apiPath: string = "http://localhost:56808/api/ageGroupsAndCampaigns"
  
    constructor(private http: HttpClient) { }
  
    /*
    getAll(filter: AgeGroupsAndCampaignsFilter): Observable<Campaigns[]> {
      return this.http.post<Campaigns[]>(`${this.apiPath}/filter`, filter).pipe(
        catchError(this.handleError),
        map(this.jsonToUsers)
      )
    }
    */
  
    getById(id: Guid) : Observable<Campaigns> {
      return this.http.get(`${this.apiPath}/${id}`).pipe(
        catchError(this.handleError),
        map(this.jsonToUser)
      );
    }
        
    create(ageGroupsAndCampaigns: Campaigns) : Observable<Campaigns> {
      return this.http.post(this.apiPath, ageGroupsAndCampaigns).pipe(
        catchError(this.handleError),
        map(this.jsonToUser)
      );
    }
  
    update(ageGroupsAndCampaigns: Campaigns) : Observable<Campaigns> {
      return this.http.put(`${this.apiPath}/${ageGroupsAndCampaigns.id}`, ageGroupsAndCampaigns).pipe(
        catchError(this.handleError),
        map(() => ageGroupsAndCampaigns)
      );
    }
  
    delete(ageGroupsAndCampaigns: Campaigns) : Observable<any> {
      return this.http.put(`${this.apiPath}/remove/${ageGroupsAndCampaigns.id}`, ageGroupsAndCampaigns).pipe(
        catchError(this.handleError),
        map(() => null)
      );
    }
    
  
    private jsonToUser(json: any): Campaigns {
      return json as Campaigns;
    }
  
    private jsonToUsers(json: any[]): Campaigns[] {
      const user: Campaigns[] = [];
      json.forEach(element => {
        user.push(element as Campaigns);
      });
      return user;
    }
  
    private handleError(error: any): Observable<any> {
      console.log(error);
      return throwError(error);
    }
  }
  