import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppConfig } from 'app/core/config/app.config';
import { WebStorage } from 'app/core/utility/web.storage';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { HttpClient } from 'app/core/utility/http.client';
import { AuthService } from 'app/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private location: Location,
        private router: Router,
        private auth: AuthService,
        private config: AppConfig,
        private storage: WebStorage,
        private tmpStorage: TmpStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;
        return this.loggedin(url, route);
    }
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (route.children && route.children.length == 0) {
            return this.canActivate(route, state);
        } else {
            return Observable.of(true)
        }
    }

    loggedin(url: string, route: any): Observable<boolean> {
        let currentUrl = route.url.map(function (u) { return u.path; });
        let currentPath = this.location.path();
        return this.auth.loggedin().map((res) => {
            let body = res.json();
            if (body.code == 402) {
                this.auth.logout();
                if (this.config.withoutLoginUrls.indexOf(currentUrl[0]) < 0) {
                    let splCP = currentPath.substring(1);
                    if (splCP != '') {
                        this.tmpStorage.set('redirectUrl', splCP);
                    }
                    this.router.navigate(['login']);
                    return false;
                } else {
                    return true;
                }
            } else {
                this.auth.isLoggedIn = true;
                this.storage.localStore('erSuperAdminUser', body.data.user);
                if (this.config.withoutLoginUrls.indexOf(currentUrl[0]) >= 0) {
                    this.router.navigate(['dashboard']);
                    return false;
                } else {
                    return true;
                }
            }
        })

    }
}


