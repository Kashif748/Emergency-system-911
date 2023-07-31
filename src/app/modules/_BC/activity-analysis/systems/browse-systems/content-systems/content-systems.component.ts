import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';
import { BcActivitySystems } from 'src/app/api/models';
import { SYSTEMS } from '../../../tempData.conts';

@Component({
  selector: 'app-content-systems',
  templateUrl: './content-systems.component.html',
  styleUrls: ['./content-systems.component.scss'],
})
export class ContentSystemsComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcActivitySystems[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private lang: ILangFacade) {}

  ngOnInit(): void {}
}
