import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'app/core/services/user.services';

import { UserRoutingModule } from 'app/modules/user/user-routing.module';
import { UserComponent } from 'app/modules/user/user.component';
import { DashboardComponent } from 'app/modules/user/components/dashboard.component';
import { UpdatePasswordComponent } from 'app/modules/user/components/updatepassword.component';
import { ProfileComponent } from "./components/profile.component";

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent,
        DashboardComponent,
        UpdatePasswordComponent,
        ProfileComponent
    ],
    providers: [
    UserService
    ]
})
export class UserModule { }