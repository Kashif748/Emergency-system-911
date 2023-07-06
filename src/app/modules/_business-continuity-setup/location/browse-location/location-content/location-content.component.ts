import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngxs/store";
import { BcLocations } from 'src/app/api/models';
import { PageRequestModel } from '@core/models/page-request.model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-location-content',
  templateUrl: './location-content.component.html',
  styleUrls: ['./location-content.component.scss']
})
export class LocationContentComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcLocations[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public display = false;
  // public loading = false;
  // public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  constructor(
    private store: Store,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

}
