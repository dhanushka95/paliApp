import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(public http: HttpClient) { }
  getInfo(search, type) {
    return this.http.post('http://localhost:5010/dictionary/get', { search, typeId: type}, {
      headers: this.getHttpHeaders()
    }).pipe( map(res => {
          console.log(res);
          return res;
        }));
  }
  getHttpHeaders() {
    return new HttpHeaders()
        .set('Content-Type', 'application/json');
  }
}
