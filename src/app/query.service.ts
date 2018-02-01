import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { ENTRIES } from './mock-entry';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class QueryService {

    
  constructor(private http: HttpClient) { }
    private url = "https://polar-forest-63120.herokuapp.com/"
    

    getAll(): Observable<any[]> {
//        return of(ENTRIES);
        return this.http.get<any[]>(this.url + 'newsarticles/');
    }


    
}
