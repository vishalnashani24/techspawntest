import { Component } from "@angular/core";

import { WebStorage } from 'app/core/utility/web.storage';
import { AppConfig } from "app/core/config/app.config";

@Component({
    selector: 'sidebar-component',
    preserveWhitespaces: false,
    templateUrl: './view/sidebar.component.html',
    styleUrls: ['./css/sidebar.css']
})
export class SidebarComponent {

    public user: any;

    constructor(
        private storage: WebStorage,
        private config: AppConfig
    ) { }

    ngOnInit() {
        this.user = this.storage.get(this.config.token.userKey);
    }
}