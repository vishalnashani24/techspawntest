import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { UserService } from 'app/core/services/user.services';

@Component({
    selector: 'app-emailverify',
    preserveWhitespaces: false,
    templateUrl: './view/emailverify.component.html',
    providers: [
        UserService
    ]
})
export class EmailverifyComponent {

    public verifyStatus: number = 0;

    constructor(
        private user: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utills: Utills,
        private config: AppConfig
    ) { }

    public ngOnInit() {
        this.verifyStatus = 1;
        this.activatedRoute.params.subscribe((param: any) => {
            this.user.verifyEmail({ key: param['id'] }).subscribe((result: any) => {
                var rs = result.json();
                if (rs.status == this.config.statusCode.success) {
                    this.verifyStatus = 2;
                } else {
                    this.verifyStatus = 3;
                }
            });
        });
    }
}