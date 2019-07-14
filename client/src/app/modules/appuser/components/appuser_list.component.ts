import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/primeng';
import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { UserService } from 'app/core/services/user.services';
@Component({
  selector: 'app-appuser-list',
  preserveWhitespaces: false,
  templateUrl: './view/appuser_list.view.html',
  providers: [
    UserService
  ]
})
export class AppuserListComponent {

  constructor(
    public config: AppConfig,
    private toaster: ToastrService,
    private user: UserService,
    private router: Router,
    private utills: Utills,
    private tmpStorage: TmpStorage,
    private confirmationService: ConfirmationService,
    private aroute: ActivatedRoute

  ) {
  this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
      }


  /*------------------ Listing Elements --------------------*/
  public show:boolean=true
  public type:any=''
  public loading: boolean = true;
  public listData: any = [];
  public totalItems: number = 0;
  public params: any = {
    'page': 1,
    'limit': this.config.perPageDefault,
    'firstname': '',
    'lastname': '',
    'email': '',
    'type':''
  };

  public setRecordPerPage(records: number): void {
    this.params.page = 1;
    this.params.limit = records;
    this.getAll();
  }

  public pageChanged(event: any): void {
    this.params.page = event.page;
    this.getAll();
  }

  public resetSearch(): void {
    this.params.firstname = '';
    this.params.lastname = '';
    this.params.email = '';
    this.getAll()
  }

  public changePageLimit(pageLimit: any){
    this.params.limit = pageLimit;
    this.getAll()
  }

  public getAll() {
    this.loading = true;
    this.params.type=this.type
    this.user.getAppuserList(this.params).subscribe((result) => {
      let rs = result.json();
      if (rs.code == this.config.statusCode.success) {
      this.show=true
        console.log('++++++',rs);
        this.listData = rs.returnData.data;
        this.totalItems = rs.returnData.total_count;
      } else {
        this.show=false
        this.toaster.error(rs.message);
      }
      this.loading = false;
    });
  }
  /*------------------ Listing Elements --------------------*/

  public remove(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.user.deleteAppuser({ userId: id }).subscribe((result) => {
          let rs = result.json();
          if (rs.code == this.config.statusCode.success) {
            this.getAll();
            this.toaster.success(rs.message);
          } else {
            this.toaster.error(rs.message);
          }
          this.loading = false;
        });
      },
      reject: () => {
      }
    });
  }

  public ngOnInit(): void {
  this.type= this.aroute.snapshot.params["type"];
   console.log('sszfsf',this.type)
    this.getAll();
  }

  public adduser(){
    this.router.navigate(['/appuser/add/'+this.type])
  }

  public editview(id,type){
  this.router.navigate(['/appuser/edit/'+id+'/'+type+'/'+this.type])
  }

}
