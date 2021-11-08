import { Injectable } from '@angular/core';
import { Url } from 'src/app/orders/model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  serverUrl = 'https://6167d7e1ba841a001727c43f.mockapi.io/url';

  constructor(private http: HttpClient) { }

  saveUser(url:Url){
    // this.userData.push(user)
    return this.http.post(`https://6167d7e1ba841a001727c43f.mockapi.io/url`,url)
  }

  findById(id: number): Observable<Url> {
    return this.http.get<Url>(`https://6167d7e1ba841a001727c43f.mockapi.io/url/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  save(url: string): Observable<Url> {
    console.log("name:" + url)
    return this.http.put<Url>(this.serverUrl, {url})
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = `Error: ${error.error.message}`;

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
