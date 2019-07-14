import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { WebStorage } from 'app/core/utility/web.storage';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { Utills } from 'app/core/utility/utills';
import { HttpClient } from 'app/core/utility/http.client';
import { AuthGuard } from "app/core/guards/auth.guard";
import { AuthService } from 'app/core/services/auth.service';

import { AppComponent } from 'app/app-components/app.component';
import { AppRoutingModule } from "app/app-routing.module";
import { LoginComponent } from 'app/app-components/login.component';
// import { EmailverifyComponent } from 'app/app-components/emailverify.component';
import { ForgotpasswordComponent } from "app/app-components/forgotpassword.component";
import { ResetpasswordComponent } from "app/app-components/resetpassword.component";
import { PageNotFountComponent } from "app/pagenotfound.component";
import { UserLoginComponent } from 'app/app-components/userlogin.component';
import { UserRagisterComponent } from 'app/app-components/userragister.component';
import { UserDashboardComponent } from "app/app-components/userdashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFountComponent,
    LoginComponent,
    // EmailverifyComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    UserLoginComponent,
    UserRagisterComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig,
    WebStorage,
    TmpStorage,
    Utills,
    HttpClient,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
