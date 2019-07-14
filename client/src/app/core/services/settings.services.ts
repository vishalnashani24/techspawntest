import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from 'app/core/utility/http.client';

@Injectable()
export class SettingsService {
  constructor(
    private http: HttpClient
  ) { }

  //Settings start
  getSettings(data: any): Observable<any> {
    return this.http.get('/settings/get', data);
  }

  updateSettings(data: any): Observable<any> {
    return this.http.post('/settings/update', data);
  }
  //settings end

}
