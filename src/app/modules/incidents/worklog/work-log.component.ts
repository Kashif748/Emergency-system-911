import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {isEmpty} from 'lodash';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {environment} from 'src/environments/environment';
import {AngularFileUploaderComponent} from 'angular-file-uploader';
import {DmsService} from '@core/api/services/dms.service';
import {TranslationService} from '../../i18n/translation.service';
import {AlertsService} from '../../../_metronic/core/services/alerts.service';
import {CommonService} from '../../../_metronic/core/services/common.service';
import {LayoutService} from '../../../_metronic/core';
import {UploadTagIdConst} from '@core/constant/UploadTagIdConst';
import {AppCommonData} from '@core/entities/AppCommonData';
import {AppCommonDataService} from '@core/services/app-common-data.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss'],
})
export class WorkLogComponent implements OnInit {
  // UI
  @Input()
  incId;
  @Input()
  tId;
  @Output() completed: EventEmitter<void> = new EventEmitter();
  @ViewChild('fileUploader')
  private fileUploader: AngularFileUploaderComponent;
  @Output() uploading = new EventEmitter<boolean>(false);

  // Variables.
  colorsGrayGray100: string;
  colorsGrayGray700: string;
  colorsThemeBaseSuccess: string;
  colorsThemeLightSuccess: string;
  fontFamily: string;
  chartOptions: any = {};
  date;
  notes = '';
  commonData: AppCommonData;
  selectedFiles: FileList;
  lang = 'en';
  afuConfig: any;

  constructor(
    private layout: LayoutService,
    private incidentService: IncidentsService,
    private translationService: TranslationService,
    private commonService: CommonService,
    private alertService: AlertsService,
    private dmsService: DmsService,
    private appCommonDataService: AppCommonDataService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.colorsGrayGray100 = this.layout.getProp('js.colors.gray.gray100');
    this.colorsGrayGray700 = this.layout.getProp('js.colors.gray.gray700');
    this.colorsThemeBaseSuccess = this.layout.getProp(
      'js.colors.theme.base.success'
    );
    this.colorsThemeLightSuccess = this.layout.getProp(
      'js.colors.theme.light.success'
    );
    this.fontFamily = this.layout.getProp('js.fontFamily');
  }

  ngOnInit(): void {
    this.commonData = this.appCommonDataService.getCommonData();
    this.chartOptions = this.getChartOptions();
    this.date = new Date();
    // file uploader config
    this.afuConfig = {
      multiple: true,
      formatsAllowed: '.jpg,.png,.pdf,.docx, .txt,.gif,.jpeg',
      maxSize: '2',
      uploadAPI: {
        url: `${environment.apiUrl}/dms/upload`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        params: {recordId: '', tagId: UploadTagIdConst.TASK_WORK_LOG},
        responseType: 'json',
      },
      theme: 'dragNDrop',
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: false,
      replaceTexts: {
        selectFileBtn: this.translationService.get('SHARED.SELECT_FILES'),
        resetBtn: this.translationService.get('SHARED.RESET'),
        uploadBtn: this.translationService.get('SHARED.UPLOAD'),
        dragNDropBox: this.translationService.get('SHARED.DRAG_N_DROP'),
        attachPinBtn: this.translationService.get('SHARED.ATTACH_FILES'),
        afterUploadMsg_success: this.translationService.get(
          'SHARED.SUCCESS_UPLOAD'
        ),
        afterUploadMsg_error: this.translationService.get(
          'SHARED.FAILD_UPLOAD'
        ),
        sizeLimit: this.translationService.get('SHARED.SIZE_LIMIT'),
      },
    };
  }

  getChartOptions() {
    return {
      series: [74],
      chart: {
        type: 'radialBar',
        height: 200,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '65%',
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false,
              fontWeight: '700',
            },
            value: {
              color: this.colorsGrayGray700,
              fontSize: '30px',
              fontWeight: '700',
              offsetY: 12,
              show: true,
            },
          },
          track: {
            background: this.colorsThemeLightSuccess,
            strokeWidth: '100%',
          },
        },
      },
      colors: [this.colorsThemeBaseSuccess],
      stroke: {
        lineCap: 'round',
      },
      labels: ['Progress'],
      legend: {},
      dataLabels: {},
      fill: {},
      xaxis: {},
      yaxis: {},
      states: {},
      tooltip: {},
      markers: {},
    };
  }

  async uploadFiles(id: number) {
    this.uploading.emit(true);
    try {
      await this.dmsService
        .uploadFiles(this.fileUploader.allowedFiles, id, 6)
        .toPromise();
      this.completed.emit();
      this.uploading.emit(false);
    } catch {
      this.alertService.openFailureSnackBar();
      this.uploading.emit(false);
    }
  }

  addWorkLog() {
    if (!this.notes || this.notes.length === 0) {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('WORK_LOG_LIST.FILL_YOUR_NOTES')
      );
      return;
    }

    if (isEmpty(this.incId)) {
      this.addTaskWorkLog();
      return;
    }

    const body = {
      createdBy: {
        id: this.getUserId(),
      },
      createdOn: this.date.toISOString(),
      id: 0,
      notes: this.notes,
    };
    this.incidentService.addWorkLog(this.incId, body).subscribe(
      async (data) => {
        if (data) {
          this.commonService.announceDataUpdates('success');
          this.alertService.openSuccessSnackBar();
          await this.uploadFiles(data.result.id);
          this.notes = '';
        }
      },
      (error) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  addTaskWorkLog() {
    const body = {
      createdBy: {id: this.getUserId()},
      createdOn: this.date.toISOString(),
      id: 0,
      notes: this.notes,
      taskId: {id: +this.tId},
    };
    this.incidentService.addTaskWorkLog(this.tId, body).subscribe(
      async (data) => {
        if (data) {
          this.commonService.announceTaskWorklogUpdates('success');
          this.alertService.openSuccessSnackBar();
          await this.uploadFiles(data.result.id);
          this.notes = '';
        }
      },
      (error) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  addFiles(files: FileList) {
    this.selectedFiles = files;
  }

  getUserId() {
    return this.commonData.currentUserDetails.id;
  }
}
