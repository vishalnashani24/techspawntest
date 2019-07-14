import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  PaginationModule
} from 'ngx-bootstrap';
import {
  ConfirmDialogModule,
  ConfirmationService
} from 'primeng/primeng';

import { AppuserRoutingModule } from "app/modules/appuser/appuser-routing.module";
import { AppuserComponent } from "app/modules/appuser/appuser.component";
import { AppuserListComponent } from "app/modules/appuser/components/appuser_list.component";
import { AppuserEditComponent } from "app/modules/appuser/components/appuser_edit.component";
import { AppuserAddComponent } from "app/modules/appuser/components/appuser_add.component";


@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        ConfirmDialogModule,
        AppuserRoutingModule
    ],
    declarations: [
        AppuserComponent,
        AppuserListComponent,
        AppuserEditComponent,
        AppuserAddComponent
    ],
    providers: [
        ConfirmationService
    ]
})
export class AppuserModule { }