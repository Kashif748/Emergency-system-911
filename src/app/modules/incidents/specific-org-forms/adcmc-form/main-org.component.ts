import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import * as _ from 'lodash';
import { OrgsService } from 'src/app/_metronic/core/services/orgs.service';
import { GroupService } from '@core/api/services/group.service';
import { UserService } from '@core/api/services/user.service';
import { OrgService } from '@core/api/services/org.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AbstractCreateFormComponent } from '../abstract-create-form/abstract-create-form.component';
import { TranslationService } from '../../../i18n/translation.service';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { PushNotificationsService } from '../../../../_metronic/core/services/push.notifications.service';
import { MapService } from '@shared/components/map/services/map.service';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import * as moment from 'moment';
import { DialogService } from '@core/services/dialog.service';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { Directionality } from '@angular/cdk/bidi';
import { Store } from '@ngrx/store';
import {ShareLocationService} from "../../../share-location/shareLocation.service";

@Component({
  selector: 'app-main-org',
  templateUrl: './main-org.component.html',
  styleUrls: ['./main-org.component.scss'],
  providers: [DatePipe],
})
export class MainOrgComponent
  extends AbstractCreateFormComponent
  implements OnInit
{
  // Variables.
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public normalView = false;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected incidentService: IncidentsService,
    protected groupService: GroupService,
    protected userService: UserService,
    protected orgService: OrgService,
    protected commonService: CommonService,
    protected translationService: TranslationService,
    protected alertService: AlertsService,
    protected location: Location,
    protected notificationsService: PushNotificationsService,
    protected cdr: ChangeDetectorRef,
    protected mapService: MapService,
    protected orgsService: OrgsService,
    protected datePipe: DatePipe,
    protected customDatePipe: CustomDatePipe,
    protected appCommonDataService: AppCommonDataService,
    protected dialogService: DialogService,
    public directionality: Directionality,
    protected store: Store,
    protected shareLocationService: ShareLocationService
  ) {
    super(
      router,
      route,
      formBuilder,
      incidentService,
      groupService,
      userService,
      orgService,
      commonService,
      translationService,
      alertService,
      location,
      notificationsService,
      cdr,
      mapService,
      orgsService,
      datePipe,
      customDatePipe,
      appCommonDataService,
      dialogService,
      directionality,
      store,
      shareLocationService
    );
  }

  getStatusId(id) {
    const status = _.find(this.commonData.incidentStatus, ['id', id]);
    if (!_.isEmpty(status)) {
      return this.lang === 'en' ? status.nameEn : status.nameEn;
    } else {
      return '';
    }
  }

  onChange(event: any) {
    this.normalView = event.checked;
  }
}
