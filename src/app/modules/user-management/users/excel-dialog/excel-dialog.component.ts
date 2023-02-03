import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '@core/api/services/user.service';
import {UrlHelperService} from '@core/services/url-helper.service';
import {AlertsService} from '../../../../_metronic/core/services/alerts.service';


@Component({
  selector: 'app-excel-dialog',
  templateUrl: './excel-dialog.component.html',
  styleUrls: ['./excel-dialog.component.scss']
})
export class ExcelDialogComponent {
  // UI
  @ViewChild('stepper') stepper: any;
  dataSource = new MatTableDataSource<any>([]);
  // Variables
  filesData: any;
  displayedColumns: string[] = ['title', 'userName', 'phoneNumber', 'email', 'status'];
  totalSuccess = 0;
  totalFailed = 0;
  loading: boolean;
  isFileUploaded = false;


  constructor(private readonly urlHelper: UrlHelperService, private readonly userService: UserService,
              protected readonly alertService: AlertsService) {
  }


  async downloadExcelTemplate() {
    this.loading = true;
    const blob = await fetch(location.origin + '/assets/media/UsersProfileTemplate.xlsx').then(r => r.blob());
    this.urlHelper.downloadBlob(blob, 'UsersProfileTemplate.xlsx');
    this.isFileUploaded = false;
    this.loading = false;
  }

  uploadFile(e) {
    if (e && e?.length) {
      const formData = new FormData();
      formData.append('file', e[0]);
      this.loading = true;
      this.userService.uploadExcel(formData).subscribe((data) => {
        const result = data['result'];
        this.totalSuccess = result['success'];
        this.totalFailed = result['failed'];
        this.dataSource = new MatTableDataSource(this.customizeData(data['result']['response']));
        this.loading = false;
        this.isFileUploaded = true;
        this.stepper.next();
      }, (e) => {
        this.loading = false;
        this.isFileUploaded = false;
        this.alertService.openFailureSnackBar();
      });

    }
    document.getElementById('xlsfile')['value'] = '';
  }

  customizeData(data) {
    return data.map((el) => {
      if (el?.failed) {
        return {...el?.failed, status: 'failed'};
      } else {
        return {...el?.success, status: 'success'};
      }
    });
  }

  navigateToNextStep() {
    this.stepper.next();
  }


}
