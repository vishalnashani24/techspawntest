import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BsDropdownModule,
} from 'ngx-bootstrap';

import {
  ConfirmDialogModule,
  ConfirmationService
} from 'primeng/primeng';

import { LayoutRoutingModule } from "app/layout/layout-routing.module";
import { LayoutComponent } from "app/layout/layout.component";
import { HeaderComponent } from "app/layout/components/header/header.component";
import { SidebarComponent } from "app/layout/components/sidebar/sidebar.component";
import { FooterComponent } from "app/layout/components/footer/footer.component";
import { SettingsComponent } from "app/layout/components/settings/settings.component";

@NgModule({
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        CommonModule,
        RouterModule,
        ConfirmDialogModule,
        LayoutRoutingModule        
    ],
    declarations: [
        LayoutComponent, 
        HeaderComponent, 
        SidebarComponent, 
        FooterComponent,
        SettingsComponent
    ],
    providers: [
        ConfirmationService
    ]
})
export class LayoutModule {

}