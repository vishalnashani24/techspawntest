import { NgModule } from "@angular/core";
import { Router, Route, Routes, RouterModule } from "@angular/router";

import { UserComponent } from "app/modules/user/user.component";
import { DashboardComponent } from "app/modules/user/components/dashboard.component";
import { UpdatePasswordComponent } from "app/modules/user/components/updatepassword.component";
import { ProfileComponent } from "./components/profile.component";

const routes: Routes = [
    {
        path: '', 
        component: UserComponent,
        children: [
            {
                path: 'updatepassword',
                component: UpdatePasswordComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: '',
                component: DashboardComponent,
            }            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}