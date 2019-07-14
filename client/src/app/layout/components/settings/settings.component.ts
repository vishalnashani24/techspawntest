import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConfig } from 'app/core/config/app.config';
import { Utills } from 'app/core/utility/utills';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { SettingsService } from 'app/core/services/settings.services';
import { requiredTrim } from "app/core/validators/validators";

@Component({
  selector: 'app-settings',
  preserveWhitespaces: false,
  templateUrl: './view/settings.view.html',
  providers: [
    SettingsService
  ]
})
export class SettingsComponent {

  public httpCall: any = false;
  public settingsFrm: FormArray;

  constructor(
    private toaster: ToastrService,
    private settings: SettingsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public config: AppConfig,
    private formBuilder: FormBuilder,
    private utills: Utills,
    private tmpStorage: TmpStorage
  ) {
    this.settingsFrm = this.formBuilder.array([]);
  }

  public save() {
    this.httpCall = true;
    let data = this.settingsFrm.controls.map((item: any) => { return item.value; });
    this.settings.updateSettings(data).subscribe((result: any) => {
      this.httpCall = false;
      var rs = result.json();
      if (rs.status == this.config.statusCode.success) {
        this.toaster.success(rs.message);
      } else {
        this.toaster.error(rs.message);
      }
    });
  }

  public ngOnInit() {
    this.settings.getSettings({}).subscribe((result: any) => {
      var rs = result.json();
      if (rs.status == this.config.statusCode.success) {
        rs.data.map((item: any) => {
          this.settingsFrm.controls.push(this.formBuilder.group({
            field: [item.value, [requiredTrim]],
            data: [item]
          }));
        });
      } else {
        this.toaster.error(rs.message);
      }
    });
  }

}
