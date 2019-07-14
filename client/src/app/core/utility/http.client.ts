import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { WebStorage } from './web.storage';
import { AppConfig } from 'app/core/config/app.config';

@Injectable()
export class HttpClient {

  constructor(
    private http: Http,
    private router: Router,
    private config: AppConfig,
    private storage: WebStorage
  ) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'admin_bearer ' + this.storage.get(this.config.token.keyID));
  } 

  get(url:any, data:any, fullUrl?:any) {
    fullUrl = false;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options:any = {
      headers: headers
    };
    let params: URLSearchParams = new URLSearchParams();
    Object.keys(data).map(function(key, index) { 
      if(data[key] != ''){
        params.set(key, data[key]);
      }         
    });      
    options['search'] = params;
    let reqUrl = (fullUrl)?url:this.config.apiUrl+url;
    return this.http.get(reqUrl, options)
  }

  post(url:any, data:any, fullUrl?:any,contentType?:any) { 
    fullUrl = fullUrl || false;
    let headers:any = new Headers();
    this.createAuthorizationHeader(headers);
    let reqUrl = (fullUrl)?url:this.config.apiUrl+url;
    let options:any = {
      headers: headers
    };
    return this.http.post(reqUrl, data, options);
  }

  extractData(res: any) {
    let body = res.json();
    return body.data || { };
  }

  handleError (error: any) {
    let errMsg: string= error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}