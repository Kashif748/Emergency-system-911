import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonDataState, GroupState } from '@core/states';
import { GisAction } from '@core/states/gis/gis.action';
import { GisState } from '@core/states/gis/gis.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { OrgStructureProjection } from 'src/app/api/models';
import { BrowseGroupsAction } from '../../../states/browse-groups.action';

@Component({
  selector: 'app-group-gis',
  templateUrl: './group-gis.component.html',
  styleUrls: ['./group-gis.component.scss'],
})
export class GroupGisComponent implements OnInit, OnDestroy {
  @Output()
  onSelectContructor = new EventEmitter<LazyLoadEvent>();
  @Output()
  onShowMap = new EventEmitter<LazyLoadEvent>();

  @Select(GisState.contractors)
  contractors$: Observable<any[]>;

  @Select(GisState.loading)
  loading$: Observable<any>;

  contracQuery = '';
  currentOrg: OrgStructureProjection;
  private destroy$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentOrg = this.store.selectSnapshot(CommonDataState.currentOrg);

    this.store
      .select(GroupState.groupContract)
      .pipe(
        takeUntil(this.destroy$),
        filter((contract) => !!contract),
        tap((contract) => {
          this.contracQuery = contract.contractNo;
          this.filterContractors();
        })
      )
      .subscribe();
  }

  filterContractors() {
    this.store.dispatch(
      new GisAction.GetContractor({
        contractorNO: this.contracQuery,
        mapGisLayer: this.currentOrg.mapGisLayer,
      })
    );
  }

  selectContructor(event) {
    this.onSelectContructor.emit(event.value?.attributes);
  }
  showOnMap(contractor) {
    this.onShowMap.emit(contractor);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
