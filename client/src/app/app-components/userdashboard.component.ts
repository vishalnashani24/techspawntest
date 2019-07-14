import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { AuthService } from "app/core/services/auth.service";

import { requiredTrim } from "app/core/validators/validators";

@Component({
    selector: 'app-login',
    preserveWhitespaces: false,
    templateUrl: './view/userdashboard.component.html'
})
export class UserDashboardComponent {

    public userlogin: FormGroup;
    private redirectUrl: any;
    public httpCall: any = false;

    constructor(
        private toaster: ToastrService,
        private auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private utills: Utills,
        private tmpStorage: TmpStorage,
        private config: AppConfig
    ) {
        
    }

    login() {
        this.httpCall = true;
        this.auth.userLogin(this.userlogin.value).subscribe((res: any) => {
            this.httpCall = false;
            if (!res.auth) {
                this.toaster.error(res.message);
            } else {
                this.router.navigate([this.redirectUrl]);
            }
        });
    }
}