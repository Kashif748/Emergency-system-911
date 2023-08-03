import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationsState } from '@core/states/bc-setup/locations/locations.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { BcActivityLocations, BcLocations } from 'src/app/api/models';
import { BrowseLocationsState } from 'src/app/modules/_business-continuity-setup/location/states/browse-locations.state';
import { BrowseLocationsStateModel } from '../../states/browse-locations.state';
import {
  auditTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { BrowseActivityLocationsAction } from '../../states/browse-locations.action';
import { ActivityLocationsState } from '@core/states/activity-analysis/locations/locations.state';
import { BrowseActivityAnalysisState } from '../../../states/browse-activity-analysis.state';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss'],
})
export class LocationDialogComponent implements OnInit, OnDestroy {
  public page$: Observable<BcLocations[]>;

  public opened$: Observable<boolean>;

  @Select(LocationsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(LocationsState.loading)
  public loading$: Observable<boolean>;

  @Select(ActivityLocationsState.blocking)
  blocking$: Observable<boolean>;

  @Select(BrowseLocationsState.state)
  public state$: Observable<BrowseLocationsStateModel>;

  public selectedBCLocations: BcLocations;

  private auditLoadPage$ = new Subject<string>();

  currentLocation: BcActivityLocations;
  _locationId: number;

  get editMode() {
    return this._locationId !== undefined && this._locationId !== null;
  }
  set locationId(v: number) {
    this._locationId = v;
    if (v === undefined || v === null) {
      const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
      const activityAnalysis = this.store.selectSnapshot(
        ActivityAnalysisState.activityAnalysis
      );
      this.currentLocation = {
        cycle: {
          id: cycle.id,
        },
        isActive: true,
        activity: {
          internal: activityAnalysis.activity?.internal,
          id: activityAnalysis.activity.id,
        },
      };
      return;
    }
    this.store
      .dispatch(new BrowseActivityLocationsAction.GetLocation({ id: v }))
      .pipe(
        switchMap(() =>
          this.store.select(ActivityLocationsState.activityLocation)
        ),
        takeUntil(this.destroy$),
        take(1),
        tap((location) => {
          this.currentLocation = location;
          this.selectedBCLocations = location?.location;
        })
      );
  }

  destroy$ = new Subject();
  form: FormGroup;
  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.locationId = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened'),
      tap((opened) => {
        if (opened) {
          this.loadPage('', true);
        }
      })
    );

    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new BrowseActivityLocationsAction.LoadBCLocations({
            name: search,
          })
        );
      });
    this.page$ = this.store
      .select(LocationsState.page)
      .pipe(filter((p) => !!p));
  }
  toggleDialog(id?: number) {
    this.store.dispatch(new BrowseActivityLocationsAction.ToggleDialog({ id }));
  }

  submit() {
    if (!this.selectedBCLocations) {
      return;
    }
    this.currentLocation = {
      ...this.currentLocation,
      location: {
        id: this.selectedBCLocations?.id,
      },
    };
    if (this.editMode) {
      (this.currentLocation.id = this._locationId),
        this.store.dispatch(
          new BrowseActivityLocationsAction.Update(this.currentLocation)
        );
    } else {
      this.store.dispatch(
        new BrowseActivityLocationsAction.Create(this.currentLocation)
      );
    }
  }

  public loadPage(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new BrowseActivityLocationsAction.LoadBCLocations({
          pageRequest: {
            first: 0,
            rows: 50,
            filters: { name: search },
          },
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}