import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import {
  ActivityAnalysisStatusAction,
  BcActivityEmployees,
} from 'src/app/api/models';
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-content-employees',
  templateUrl: './content-employees.component.html',
  styleUrls: ['./content-employees.component.scss'],
})
export class ContentEmployeesComponent implements OnInit {

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  @Input()
  loading: boolean;
  @Input()
  page: BcActivityEmployees[];
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
