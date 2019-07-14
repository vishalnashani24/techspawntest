import { UserService } from '../../../../app/core/services/user.services';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/primeng';
import { AppConfig } from '../../../../app/core/config/app.config';
import { Utills } from '../../../../app/core/utility/utills';
import { TmpStorage } from '../../../../app/core/utility/temp.storage';
declare var google: any;
import { WebStorage } from '../../../../app/core/utility/web.storage';
@Component({
    selector: 'dashboard-component',
    preserveWhitespaces: false,
    templateUrl: './view/dashboard.component.html',
    styleUrls:['./css/dashboard.css']
})
 
export class DashboardComponent {
  constructor(
    private user: UserService,
    public config: AppConfig,
    private toaster: ToastrService,
    private router: Router,
    private storage: WebStorage,
    private utills: Utills,
    private tmpStorage: TmpStorage,
    private confirmationService: ConfirmationService
  ) { }

  public loading: boolean = true;
  public listData: any = [];
  public id:any={};
  public num:any;
  public data:any;
  public jsonArray:any=[]
  public requestArray: any = [];  
  public params: any = {
    'page': 1,
    'limit': this.config.perPageDefault,
    'firstname': '',
    'lastname': '',
    'email': '',
  };
public range: any = {}
  public getAllUsers() {
    this.loading = true;
    this.user.getAppuserList(this.params).subscribe((result) => {
      let rs = result.json();
      if (rs.code == this.config.statusCode.success) {
        this.listData = rs.returnData.data;
      } else {
        this.toaster.error(rs.message);
      }
      this.loading = false;
    });
  }
 
ngOnInit() {
	

    }
}
