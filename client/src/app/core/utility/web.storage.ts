import { Injectable } from '@angular/core';

@Injectable()
export class WebStorage {

  private locStorage:any;
  private sesStorage:any;

  constructor() {
    this.locStorage  = window.localStorage;
    this.sesStorage  = window.sessionStorage;
   }

  get(key: any) {
    let sessionData = this.sesStorage.getItem(key);
    let sData = (this.notEmpty(sessionData)) ? JSON.parse(sessionData).value : '';
    let localData = this.locStorage.getItem(key);
    let lData = (this.notEmpty(localData)) ? JSON.parse(localData).value : '';
    return sData || lData;
  }

  localStore(key: any, value: any) {
    this.clear(key);
    let data = { value: value };
    let val = JSON.stringify(data);
    this.locStorage.setItem(key, val);
  }

  sessionStore(key: any, value: any) {
    this.clear(key);
    let data = { value: value };
    let val = JSON.stringify(data);
    this.sesStorage.setItem(key, val);
  }

  clear(key: any) {
    this.locStorage.removeItem(key);
    this.sesStorage.removeItem(key);
  }

  exists(key: any) {
    if (this.get(key) != null) {
      return true;
    } else {
      return false;
    }
  }

  private notEmpty(data: any) {
    var res = true;
    var dataType = typeof data;
    switch (dataType) {
      case 'object':
        if (data == null || data.length < 1)
          res = false;
        break;

      case 'undefined':
        res = false;
        break;

      case 'number':
        if (data == "")
          res = false;
        break;
      case 'string':
        if (data.trim() == "")
          res = false;
        break;
    }

    return res;
  }
}