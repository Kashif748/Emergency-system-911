import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { BcImpactLevel } from '../../../../../api/models/bc-impact-level';
import { BrowseImpactLevelAction } from '../../states/browse-impact-level.action';

@Component({
  selector: 'app-content-impact-level',
  templateUrl: './content-impact-level.component.html',
  styleUrls: ['./content-impact-level.component.scss'],
})
export class ContentImpactLevelComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcImpactLevel[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  public columns: string[] = ['levelAr', 'levelEn', 'color', 'active'];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onRowEditSave(item: BcImpactLevel) {
    this.store.dispatch(new BrowseImpactLevelAction.UpdateImpactLevel(item));
  }
}
