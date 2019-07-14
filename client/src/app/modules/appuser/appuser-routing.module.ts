import { NgModule } from "@angular/core";
import { Router, Route, Routes, RouterModule } from "@angular/router";

import { AppuserComponent } from "app/modules/appuser/appuser.component";
import { AppuserListComponent } from "app/modules/appuser/components/appuser_list.component";
import { AppuserEditComponent } from "app/modules/appuser/components/appuser_edit.component";
import { AppuserAddComponent } from "app/modules/appuser/components/appuser_add.component";

const routes: Routes = [
    {
        path: '', 
        component: AppuserComponent,
        children: [
            {
                path: 'list/:type',
                component: AppuserListComponent,
            },
            {
                path: 'edit/:id/:mode/:type',
                component: AppuserEditComponent,
            },
            {
                path: 'add/:type',
                component: AppuserAddComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppuserRoutingModule {

}
