import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { UserService } from 'app/core/services/user.services';

import { requiredTrim } from "app/core/validators/validators";

@Component({
  selector: 'app-forgotpassword',
  preserveWhitespaces: false,
  templateUrl: './view/forgotpassword.component.html',
  providers: [
    UserService
  ]
})
export class ForgotpasswordComponent {

  public verifyStatus: number = 0;
  public fgPwd: FormGroup;
  public httpCall: any = false;

  constructor(
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utills: Utills,
    private config: AppConfig
  ) {
    this.fgPwd = formBuilder.group({
      email: ['', [requiredTrim, Validators.pattern(this.config.pattern.EMAIL)]]
    });
  }

  send() {
    this.httpCall = true;
    this.user.reqResetPassword(this.fgPwd.value).subscribe((result: any) => {
      this.httpCall = false;
      var rs = result.json();
      if (rs.status == this.config.statusCode.success) {
        this.toaster.success(rs.message);
        this.router.navigate(['login']);
      } else {
        this.toaster.error(rs.message);
      }
    });
  }

}