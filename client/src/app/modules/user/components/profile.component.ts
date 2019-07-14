import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../../core/services/user.services";
import { AppConfig } from "../../../core/config/app.config";
import { requiredTrim } from "../../../core/validators/validators";
import { WebStorage } from "../../../core/utility/web.storage";

@Component({
    selector: 'profile-component',
    templateUrl: './view/profile.component.html',
    styleUrls:['./css/profile.css'],
    providers: [
      UserService
  ]
})
export class ProfileComponent {

  public profileFrm: FormGroup;
  public httpCall: any = false;

  constructor(
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public config: AppConfig,
    private storage: WebStorage,
    private formBuilder: FormBuilder
  ) {
    this.profileFrm = formBuilder.group({
      firstname: ['', [requiredTrim]],
      lastname: ['', [requiredTrim]],
      email: ['', [requiredTrim, Validators.pattern(this.config.pattern.EMAIL)]],
    });
  }
  public id:any={}
  public ngOnInit() {
    this.id =this.storage.get('erSuperAdminUser')._id;
        this.user.getAdminProfile({ id: this.id}).subscribe((result: any) => {
          var rs = result.json();
          if (rs.code == this.config.statusCode.success) {    
            this.profileFrm.patchValue(rs.data);
          } else {
            this.toaster.error(rs.message);
          }
        });
  }

  public save() {
    this.id =this.storage.get('erSuperAdminUser')._id;
    this.httpCall = true;
    this.activatedRoute.params.subscribe((param: any) => {
      let data = this.profileFrm.value;
      data._id = this.id;
      this.user.adminProfileUpdate(data).subscribe((result: any) => {
        this.httpCall = false;
        var rs = result.json();
        if (rs.code == this.config.statusCode.success) {
          this.storage.localStore(this.config.token.userKey,rs.data);
          this.toaster.success(rs.message);
          this.router.navigate(['dashboard']);
          // location.reload();
        } else {
          this.toaster.error(rs.message);
        }
      });
    });
  }

}
