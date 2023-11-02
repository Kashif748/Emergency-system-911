import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 import {FormBuilder, FormGroup} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import { ActivityAnalysisStatusAction, BcActivityLocations } from 'src/app/api/models';
import { PageRequestModel } from '@core/models/page-request.model';
 import { LazyLoadEvent } from 'primeng/api';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";
import {ActivityAnalysisStatusAction} from "../../../../../../api/models/activity-analysis-status-action";

@Component({
  selector: 'app-content-locations',
  templateUrl: './content-locations.component.html',
  styleUrls: ['./content-locations.component.scss']
})
export class ContentLocationsComponent implements OnInit {

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  @Input()
  loading: boolean;
  @Input()
  page: BcActivityLocations[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Input()
  activityStatus: ActivityAnalysisStatusAction;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private lang: ILangFacade) {}

  ngOnInit(): void {}


}
