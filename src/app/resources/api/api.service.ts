import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBuilderService } from '../utils/api-builder.service';

export class Response {
  status: number;
  result: object | string;
  data: object | string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  /* Using Facade Pattern */
  public apiResponse(response: any): Observable<Response> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    switch (response._type) {
      case 'get':
        return this.http[response._type]<Response>(`${response._url}`, httpOptions);

      case 'delete':
        return this.http[response._type]<Response>(`${response._url}`, httpOptions);

      case 'post':
        if (response._data !== undefined) {
          return this.http[response._type]<Response>(`${response._url}`, response._data, httpOptions);
        }
        return this.http[response._type]<Response>(`${response._url}`, httpOptions);

      case 'put':
        return this.http[response._type]<Response>(`${response._url}`, response._data, httpOptions);
    }
  }

  public getProducts() {
    const response =
      new ApiBuilderService(`./assets/products.json`)
        .setType('get');
    return this.apiResponse(response);
  }

}
