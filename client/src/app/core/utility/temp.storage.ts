import {Injectable} from '@angular/core';

@Injectable()
export class TmpStorage {
    private tmpStorage:any = {};

  constructor() {}

  set(key:any, data:any){
      this.tmpStorage[key] = data;
  }

  get(key:any) {
      return this.tmpStorage[key] || [];
  }

  remove(key:any){
      delete this.tmpStorage[key];
  }
}