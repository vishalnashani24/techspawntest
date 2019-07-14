import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService } from 'primeng/primeng';
import { ToastrService } from 'ngx-toastr';

import { WebStorage } from 'app/core/utility/web.storage';
import { AppConfig } from "app/core/config/app.config";
import { AuthService } from "app/core/services/auth.service";
import { UserService } from 'app/core/services/user.services';

@Component({
    selector: 'header-component',
    preserveWhitespaces: false,
    templateUrl: './view/header.component.html',
    providers: [
        UserService
    ]
})
export class HeaderComponent {

    public user: any;
    public notifications: any = [];

    constructor(
        public auth: AuthService,
        private userService: UserService,
        private storage: WebStorage,
        private config: AppConfig,
        private router: Router,
        private confirmationService: ConfirmationService,
        private toastr: ToastrService
    ) { }

    public logout() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to logout?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.auth.logout().subscribe((res: any) => {
                    this.router.navigate(['login']);
                });
            },
            reject: () => {
            }
        });
    }

    // public getNotificationByType(type: string) {
    //     return this.notifications.find((item: any) => {
    //         return item.type == type;
    //     });
    // }


    // private getNotifications() {
    //     this.userService.getAdminNotigications().subscribe((result: any) => {
    //         var rs = result.json();
    //         if (rs.status == this.config.statusCode.success) {
    //             this.notifications = rs.data;
    //         }
    //     });
    // }

    private ngOnInit() {
        this.user = this.storage.get(this.config.token.userKey);  
    }
}