import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
}) 
export class CategoryService {
    constructor(private http: HttpClient) {}
    result = new HttpHeaders()

    .set('Content-Type', 'application/json')

    // TODO: Move adding token to intercept.service.ts

    .set('Authorization', 'Bearer ' +localStorage.getItem('jwt'));

    categories(){
        return this.http.get<any>(environment.apiUrl + '/common/data',{headers:this.result}).pipe(map(corr=>corr.result.assetsCategory))
    }

    getById(id = 0) {
        return this.http.get<any>(environment.apiUrl + '/circulars/' + id,{headers:this.result}).pipe(map(corr=>corr.result))
    }

    create(value) {
        return this.http.post<any>(environment.apiUrl + '/circulars', value, { headers: this.result })
    }


}
