import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {SYSTEMS} from "../../../tempData.conts";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ILangFacade} from "@core/facades/lang.facade";
import { BcActivityLocations } from 'src/app/api/models';
import { PageRequestModel } from '@core/models/page-request.model';
 import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-content-locations',
  templateUrl: './content-locations.component.html',
  styleUrls: ['./content-locations.component.scss']
})
export class ContentLocationsComponent implements OnInit {
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

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private lang: ILangFacade) {}

  ngOnInit(): void {}


}
