import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { GroupService } from '@core/api/services/group.service';
import { UserService } from '@core/api/services/user.service';
import { OrgService } from '@core/api/services/org.service';
import * as _ from 'lodash';
import { CommonService } from 'src/app/core/services/common.service';
import { AbstractCreateFormComponent } from '../abstract-create-form/abstract-create-form.component';
import { TranslationService } from '../../../i18n/translation.service';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { OrgsService } from '../../../../_metronic/core/services/orgs.service';
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
  selector: 'app-civil-defence-form',
  templateUrl: './civil-defence-form.component.html',
  styleUrls: ['./civil-defence-form.component.scss'],
  providers: [DatePipe],
})
export class CivilDefenceFormComponent
  extends AbstractCreateFormComponent
  implements OnInit
{
  // UI.
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker1: any;

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

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected incidentsService: IncidentsService,
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
      incidentsService,
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
}
