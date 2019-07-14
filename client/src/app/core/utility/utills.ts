import {Injectable} from '@angular/core';
import { WebStorage } from './web.storage';

@Injectable()
export class Utills {
    constructor(
        private storage: WebStorage
    ) { }

    isExists(data:any,key:any){
        if(this.notEmpty(data)){
            if(this.notEmpty(data[key])){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    notEmpty(data: any) {
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

    parseJson(data: any){
        return JSON.parse(data);
    }
}