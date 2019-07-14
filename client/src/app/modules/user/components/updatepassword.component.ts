import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { requiredTrim, matchingPasswords } from 'app/core/validators/validators';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { UserService } from 'app/core/services/user.services';

@Component({
  selector: 'app-updatepwd',
  preserveWhitespaces: false,
  templateUrl: './view/updatepassword.view.html',
  styleUrls: ['./css/setpassword.css'],
  providers: [
    UserService
  ]
})
export class UpdatePasswordComponent {

  public updatePwd: FormGroup;
  public httpCall: any = false;

  constructor(
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utills: Utills,
    private config: AppConfig
  ) {
    this.updatePwd = formBuilder.group({
      current_password: ['', [requiredTrim]],
      password: ['', [requiredTrim, Validators.pattern(this.config.pattern.PASSWORD)]],
      conf_password: ['', [requiredTrim]]
    }, { validator: matchingPasswords('password', 'conf_password') });
  }

  save() {
    this.httpCall = true;
    let data = this.updatePwd.value;
    this.user.updatePwd(data).subscribe((result: any) => {
      this.httpCall = false;
      var rs = result.json();
      if (rs.status == this.config.statusCode.success) {
        this.toaster.success(rs.message);
        this.updatePwd.reset();
      } else {
        this.toaster.error(rs.message);
      }
    });
  }

  public ngOnInit() {
  }

}