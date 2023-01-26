import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { AppUtil } from '@core/utils/AppUtil';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
})
export class TaskInfoComponent implements OnInit {
  // UI
  @Input() task: any;
  @Output() updateStatus = new EventEmitter<string>();

  // Variables
  lang = 'en';
  status$: Observable<any[]>;
  assignee: { id: any; nameAr: any; nameEn: any; type: any };

  constructor(
    private translationService: TranslationService,
    private incidentService: IncidentsService,
    private customDate: CustomDatePipe,
    public directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.status$ = this.incidentService
      .getTasksStatus()
      .pipe(map((r) => r.result));
  }

  getFullName(userInfo) {
    if (!userInfo) {
      return '';
    }

    let userName = '';
    if (this.lang === 'en') {
      // en
      userName += userInfo?.firstNameEn + ' ';
      if (userInfo?.middleNameEn) {
        userName += userInfo?.middleNameEn + ' ';
      }
      userName += userInfo?.lastNameEn;
    } else {
      // ar
      userName += userInfo?.firstNameAr + ' ';
      if (userInfo?.middleNameEn) {
        userName += userInfo?.middleNameAr + ' ';
      }
      userName += userInfo?.lastNameAr;
    }
    return userName;
  }

  getTaskDeliverStatus(dueDate: any) {
    if (!dueDate) {
      return '';
    }

    const taskDueDateGMT = this.customDate.transform(dueDate);
    const closedDate = this.customDate.transform(this.task?.closedDate);
    const createdDate = this.customDate.transform(this.task?.createdDate);
    const diffInDays = DateTimeUtil.getDiffBetweenDates(taskDueDateGMT);

    const isCompleted =closedDate && closedDate < taskDueDateGMT;
    if(isCompleted){
      const dueDateFormatted = DateTimeUtil.format(
        closedDate,
        'DD/MM/YYYY HH:mm a'
      );
      return this.translationService.getWithArgs(
        'INCIDENTS.completedTask',
        { day: dueDateFormatted.toUpperCase() }
      );
     }
    if (diffInDays < 0  ) {
      // task due date elapsed.
      const dueDateFormatted = DateTimeUtil.format(
        taskDueDateGMT,
        'DD/MM/YYYY HH:mm a'
      );
      return this.translationService.getWithArgs(
        'INCIDENTS.delayedDeliverTask',
        { day: dueDateFormatted.toUpperCase() }
      );
    } else if (diffInDays === 0) {
      // task delivery day today or remain time is in hours.
      const diffInHours = DateTimeUtil.getDiffBetweenDates(
        taskDueDateGMT,
        null,
        'hours'
      );

      if (diffInHours > 0) {
        return this.translationService.getWithArgs(
          'INCIDENTS.remainDeliverTaskHours',
          { hours: diffInHours }
        );
      } else {
        const diffInMinutes = DateTimeUtil.getDiffBetweenDates(
          taskDueDateGMT,
          null,
          'minutes'
        );
        if (diffInMinutes > 0) {
          return this.translationService.getWithArgs(
            'INCIDENTS.remainDeliverTaskMinutes',
            { minutes: diffInMinutes }
          );
        }
        const dueDateFormatted = DateTimeUtil.format(
          taskDueDateGMT,
          'DD/MM/YYYY hh:mm a'
        );
        return this.translationService.getWithArgs(
          'INCIDENTS.delayedDeliverTask',
          { day: dueDateFormatted.toUpperCase() }
        );
      }
    } else {
      // task have one day or more to accomplish.
      //  const arabicNumber = AppUtil.getArabicNumber();
      return this.translationService.getWithArgs(
        'INCIDENTS.remainDeliverTaskDays',
        { days: diffInDays }
      );
    }
  }

  getTaskDeliverStatusBgColor(dueDate) {
    if (!dueDate) {
      return 'mx-2 text-dark font-weight-500 label label-lg label-inline';
    }
    if (this.task?.closedDate && this.task?.closedDate < dueDate) {
      return 'mx-2 text-dark font-weight-500 label label-lg label-inline ';
    }

    const taskDueDateGMT = this.customDate.transform(dueDate);
    const diffInDays = DateTimeUtil.getDiffBetweenDates(taskDueDateGMT);
    if (diffInDays < 0) {
      // task due date elapsed.
      return 'mx-2 font-weight-500 label label-lg label-inline label-danger text-white';
    } else if (diffInDays === 0) {
      // last day of task.
      const diffInHours = DateTimeUtil.getDiffBetweenDates(
        taskDueDateGMT,
        null,
        'hours'
      );

      if (diffInHours > 0) {
        return 'mx-2 font-weight-500 label label-lg label-inline label-warning text-white';
      } else {
        const diffInMinutes = DateTimeUtil.getDiffBetweenDates(
          taskDueDateGMT,
          null,
          'minutes'
        );
        if (diffInMinutes > 0) {
          return 'mx-2 font-weight-500 label label-lg label-inline label-warning text-white';
        }
        return 'mx-2 font-weight-500 label label-lg label-inline label-danger text-white';
      }
    }
    // task have good time before accomplish.
    return 'mx-2 font-weight-500 label label-lg label-inline label-success text-white';
  }
}
