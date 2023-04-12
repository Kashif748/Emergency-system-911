import {
  ChangeDetectorRef,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import * as _ from 'lodash';
import { NgxPaginationModule } from 'ngx-pagination';
import { map, takeUntil } from 'rxjs/operators';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TaskChartsComponent } from './task-charts/task-charts.component';
import { BaseComponent } from '@shared/components/base.component';
import { AppCommonData } from '@core/entities/AppCommonData';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';

@Component({
  selector: 'app-incident-task',
  templateUrl: './incident-task.component.html',
  styleUrls: ['./incident-task.component.scss'],
})
export class IncidentTaskComponent extends BaseComponent implements OnInit {
  // UI.
  @Input() incidentDetails;
  private commonData: AppCommonData;
  // Variables.
  public incidentId = null;
  public lang = 'en';
  public incidentTasks: any[] = [];

  public paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
  };
  private taskTypes: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translation: TranslationService,
    private incidentsService: IncidentsService,
    private appCommonService: AppCommonDataService,
    private alertService: AlertsService,
    public cd: ChangeDetectorRef
  ) {
    super();
  }

  async ngOnInit() {
    this.lang = this.translation.getSelectedLanguage();
    this.commonData = this.appCommonService.getCommonData();
    this.incidentId = this.route.snapshot.params['id'];
    this.taskTypes = await this.incidentsService
      .getTaskTypes()
      .pipe(map((r) => r.result))
      .toPromise();

    this.incidentsService
      .getIncidentTasks(this.incidentId, this.paginationConfig)
      .pipe(map(this.taskMap), takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data) {
            this.incidentTasks = data.tasks;
            this.paginationConfig.totalItems = data.totalElements;
            this.cd.detectChanges();
          }
        },
        (e) => {
          console.log(e);
          this.alertService.openFailureSnackBar();
          this.cd.detectChanges();
        }
      );
  }

  taskMap = (data) => {
    const tasks = data.result.content as any[];
    for (const task of tasks) {
      {
        // set task type
        if (!_.isEmpty(this.taskTypes)) {
          const taskType = _.find(this.taskTypes, ['id', task?.taskType?.id]);
          task.taskType.name =
            this.lang === 'en' ? taskType.nameEn : taskType.nameAr;
        }

        // set task priority
        if (!_.isEmpty(this.commonData)) {
          const priority = _.find(this.commonData.priorities, [
            'id',
            task?.priority?.id,
          ]);
          task.priority.name =
            this.lang === 'en' ? priority?.nameEn : priority?.nameAr;
        }

        // set task status
        if (!_.isEmpty(this.commonData)) {
          const status = _.find(this.commonData.taskStatus, [
            'id',
            task?.status?.id,
          ]);
          if (!_.isEmpty(status)) {
            task.status.name =
              this.lang === 'en' ? status.nameEn : status.nameAr;
          }
        }
      }
    }
    return { tasks, totalElements: data?.result?.totalElements };
  };

  viewTask(id) {
    this.router.navigate(['incidents/viewTask', id], {
      queryParams: { _redirect: this.router.url },
    });
  }

  pageChangedForMyTasks(event) {
    this.paginationConfig.currentPage = event.pageIndex;
    this.paginationConfig.itemsPerPage = event.pageSize;

    this.incidentsService
      .getIncidentTasks(this.incidentId, this.paginationConfig)
      .pipe(map(this.taskMap), takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data) {
            this.incidentTasks = data.tasks;
            this.paginationConfig.totalItems = data.totalElements;
            this.cd.markForCheck();
          }
        },
        (e) => {
          console.log(e);
          this.alertService.openFailureSnackBar();
          this.cd.markForCheck();
        }
      );
  }

  createTasks(id) {
    this.router.navigate(
      [
        'incidents/createTask',
        {
          title: this.incidentDetails ? this.incidentDetails.subject : 'any',
          id,
        },
      ],
      { queryParams: { _redirect: this.router.url } }
    );
  }

  updateTask(id) {
    this.router.navigate(['incidents/updateTask', id], {
      queryParams: { _redirect: this.router.url },
    });
  }
}

@NgModule({
  declarations: [IncidentTaskComponent, TaskChartsComponent],
  imports: [
    TranslationModule,
    InlineSVGModule,
    MatTooltipModule,
    SharedModule,
    NgxPaginationModule,
    NgApexchartsModule,
  ],
})
export class IncidentTaskModule {}
