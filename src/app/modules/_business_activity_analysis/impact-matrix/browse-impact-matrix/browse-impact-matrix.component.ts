import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactLevelState, ImpactMatrixState, RtoState } from '@core/states';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  BcImpactLevel,
  BcImpactMatrixDto,
  BcImpactTypes,
  BcImpactTypesDetails,
  BcImpactTypesResponse,
  Bcrto,
  BCRtoDetails,
} from 'src/app/api/models';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { SYSTEMS } from '../../tempData.conts';
import { BrowseActivityImpactMatrixAction } from '../states/browse-impact-matrix.action';
import {
  BrowseActivityImpactMatrixState,
  BrowseActivityImpactMatrixStateModel,
} from '../states/browse-impact-matrix.state';

@Component({
  selector: 'app-browse-impact-matrix',
  templateUrl: './browse-impact-matrix.component.html',
  styleUrls: ['./browse-impact-matrix.component.scss'],
})
export class BrowseImpactMatrixComponent implements OnInit {
  @Select(ImpactMatrixState.loading)
  public loading$: Observable<boolean>;

  @Select(ImpactMatrixState.blocking)
  public blocking$: Observable<boolean>;

  @Select(BrowseActivityImpactMatrixState.state)
  public state$: Observable<BrowseActivityImpactMatrixStateModel>;

  public rtosPage$: Observable<Bcrto[]>;
  public tableValue$: Observable<any[]>;

  display: boolean = false;

  selectedCells: BcImpactTypesDetails[] = [];
  private destroy$ = new Subject();

  constructor(private lang: ILangFacade, private store: Store) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(BrowseActivityAnalysisState.cycleId),
      this.store.select(BrowseActivityAnalysisState.activityId),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activityId, cycleId]) => {
          this.loadPage();
          this.loadImpactMatrixPage();
          this.loadImpactTypePage();
          this.loadRTOPage();
        })
      )
      .subscribe();

    this.tableValue$ = combineLatest([
      this.store.select(ActivityImpactMatrixState.page),
      this.store.select(ImpactMatrixState.page),
      this.store.select(RtoState.page),
    ]).pipe(
      takeUntil(this.destroy$),
      filter(
        ([activityImpact, impactMatrix, rtos]) =>
          !!activityImpact && !!impactMatrix && !!rtos
      ),
      map(([activityImpact, impactMatrix, rtos]) => {
        const table = [];
        impactMatrix.forEach((impact) => {
          const selectdImpact = activityImpact.find(
            (item) => item.id === impact.bcImpactTypes.id
          );
          let row = {
            impactType: impact.bcImpactTypes,
            bcRto: [],
          };
          rtos.forEach((rto) => {
            let bcImpactLevelId = null;
            if (selectdImpact) {
              const selectdRto = selectdImpact.bcRto.find(
                (item) => item.id === rto.id
              );
              if (selectdRto) {
                bcImpactLevelId = selectdRto.bcImpactLevels.id;
              }
            }
            row.bcRto.push({
              bcImpactLevelId: bcImpactLevelId,
              bcRtoId: rto?.id,
            });
          });
          table.push(row);
        });
        return table;
      })
    );

    // represent table columns
    this.rtosPage$ = this.store.select(RtoState.page).pipe(
      filter((p) => !!p),
      tap(console.log),
      map((page) => [...page].sort((a, b) => a.id - b.id))
    );
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }
  public loadImpactMatrixPage(event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadImpactMatrix({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: cycle.versionId,
      })
    );
  }

  public loadImpactTypePage(event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);

    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadImpactLevel({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: cycle.versionId,
      })
    );
  }

  public loadRTOPage(event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);

    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadRto({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: cycle.versionId,
      })
    );
  }

  setImpactType(event: BcImpactLevel, selectedRow, selectedCell: BCRtoDetails) {
    let row = this.selectedCells.find(
      (row) => row.bcImpactTypeId === selectedRow.impactType?.id
    );
    if (row) {
      let cell = row.bcRto.find(
        (cell) => cell.bcRtoId === selectedCell.bcRtoId
      );
      if (cell) {
        cell.bcImpactLevelId = event.id;
      } else {
        row.bcRto.push({
          bcImpactLevelId: event.id,
          bcRtoId: selectedCell.bcRtoId,
        });
      }
    } else {
      this.selectedCells.push({
        bcImpactTypeId: selectedRow.impactType?.id,
        bcRto: [
          {
            bcImpactLevelId: event.id,
            bcRtoId: selectedCell.bcRtoId,
          },
        ],
      });
    }
  }

  save() {
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.UpdateImpactMatrix(
        this.selectedCells
      )
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
