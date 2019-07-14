import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { requiredTrim, matchingPasswords } from 'app/core/validators/validators';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { UserService } from 'app/core/services/user.services';

@Component({
    selector: 'app-resetpassword',
    preserveWhitespaces: false,
    templateUrl: './view/resetpassword.component.html',
    providers: [
        UserService
    ]
})
export class ResetpasswordComponent {
    
  public verifyStatus: number = 0;
  public reSetPwd: FormGroup;
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
    this.reSetPwd = formBuilder.group({
      password: ['', [requiredTrim,Validators.pattern(this.config.pattern.PASSWORD)]],
      conf_password: ['', [requiredTrim]]
    },{validator: matchingPasswords('password', 'conf_password')});
  }

  save() {
    this.httpCall = true;
    this.activatedRoute.params.subscribe((param: any) => {
      let data = this.reSetPwd.value;
      data.key = param['id'];
      this.user.reSetPwd(data).subscribe((result: any) => {
        this.httpCall = false;
        var rs = result.json();
        if (rs.status == this.config.statusCode.success) {
            this.verifyStatus = 4;
          //this.toaster.success(rs.message);
          //this.router.navigate(['login']);
        } else {
          this.toaster.error(rs.message);
        }
      });
    });
  }

  public ngOnInit() {
    this.verifyStatus = 1;
    this.activatedRoute.params.subscribe((param: any) => {
      this.user.verifyReSetPwdKey({ key: param['id'] }).subscribe((result: any) => {
        var rs = result.json();
        if (rs.status == this.config.statusCode.success) {
          this.verifyStatus = 3;
        } else {
          this.verifyStatus = 2;
        }
      });
    });
  }
}