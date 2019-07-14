import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { UserService } from 'app/core/services/user.services';
import { requiredTrim } from "app/core/validators/validators";
@Component({
  selector: 'app-appuser-edit',
  preserveWhitespaces: false,
  templateUrl: './view/appuser_edit.view.html',
  providers: [
    UserService
  ]
})
export class AppuserEditComponent {

  public httpCall: any = false;
  public usrFrm: FormGroup;
  public userRoles: any = [];
  public userId:any;
  public mode:any;
  public type:any;
  constructor(
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public config: AppConfig,
    private formBuilder: FormBuilder,
    private utills: Utills,
    private tmpStorage: TmpStorage
  ) {
    this.usrFrm = formBuilder.group({
      firstname: ['', [requiredTrim]],
      lastname: ['', [requiredTrim]],
      email: ['', [requiredTrim, Validators.pattern(this.config.pattern.EMAIL)]]
    });
  }

  public save() {
    this.httpCall = true;
    this.activatedRoute.params.subscribe((param: any) => {
      let data = this.usrFrm.value;
      data.userId = param['id'];
      this.user.editAppuser(data).subscribe((result: any) => {
        this.httpCall = false;
        var rs = result.json();
        if (rs.code == this.config.statusCode.success) {
          this.toaster.success(rs.message);
          this.router.navigate(['appuser/list/'+this.type]);
        } else {
          this.toaster.error(rs.message);
        }
      });
    });
  }

  public ngOnInit() {
    this.type= this.activatedRoute.snapshot.params["type"];
    this.mode= this.activatedRoute.snapshot.params["mode"];
    console.log('5',this.mode)
    this.activatedRoute.params.subscribe((param: any) => {     
        this.user.getAppuser({ id: param['id'] }).subscribe((result: any) => {
          var rs = result.json();
          if (rs.code == this.config.statusCode.success) {            
            this.usrFrm.patchValue(rs.data);
          } else {
            this.toaster.error(rs.message);
            this.router.navigate(['appuser']);
          }
        });
    });
  }

  public back(){
   this.router.navigate(['appuser/list/'+this.type]);
  }

}
