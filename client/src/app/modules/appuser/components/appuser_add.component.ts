import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { UserService } from 'app/core/services/user.services';
import { requiredTrim } from "app/core/validators/validators";
import { WebStorage } from 'app/core/utility/web.storage';

@Component({
  selector: 'app-appuser-add',
  preserveWhitespaces: false,
  templateUrl: './view/appuser_add.view.html',
  providers: [
    UserService
  ]
})
export class AppuserAddComponent {

  public httpCall: any = false;
  public logoSelected: any = true;
  public adduserform: FormGroup;
  public type:any=''
  constructor(
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public config: AppConfig,
    private formBuilder: FormBuilder,
    private utills: Utills,
    private tmpStorage: TmpStorage,
    private storage: WebStorage
  ) {
     this.type= this.activatedRoute.snapshot.params["type"];
     console.log('39',this.type)
    this.adduserform = formBuilder.group({
     
      firstname: ['', [requiredTrim]],
      lastname: ['', [requiredTrim]],
      email: ['', [requiredTrim, Validators.pattern(this.config.pattern.EMAIL)]],
      password: ['', [requiredTrim]],
      salary:['',requiredTrim],
      type:[this.type]
    });
  }

  

  public save() {
    this.httpCall = true;
    let data = this.adduserform.value;
    this.user.addUserByAdmin(data).subscribe((result: any) => {
      this.httpCall = false;
      var rs = result.json();
      if (rs.code == this.config.statusCode.success) {
        this.toaster.success(rs.message);
        this.router.navigate(['appuser/list/'+this.type]);
      } else {
        this.toaster.error(rs.message);
      }
    });
  }
}
