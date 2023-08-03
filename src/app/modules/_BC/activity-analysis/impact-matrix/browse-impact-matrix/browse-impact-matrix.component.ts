import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactMatrixState, RtoState } from '@core/states';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import {
  BcActivityImpactMatrixDetailsDto,
  BcImpactLevel,
  BcImpactTypesDetails,
  Bcrto,
  BCRtoDetails,
} from 'src/app/api/models';
import { BrowseActivityAnalysisAction } from '../../states/browse-activity-analysis.action';
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
export class BrowseImpactMatrixComponent implements OnInit, OnDestroy {
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
      this.store.select(ActivityAnalysisState.activityAnalysis),
      this.store.select(ActivityAnalysisState.cycle),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadPage();
          this.loadImpactMatrixPage(cycle.versionId);
          this.loadImpactTypePage(cycle.versionId);
          this.loadRTOPage(cycle.versionId);
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
      tap(console.log),
      map(([activityImpact, impactMatrix, rtos]) => {
        const table = [];
        let impactTotal = 0;
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
              if (selectdRto?.bcImpactLevels) {
                bcImpactLevelId = selectdRto.bcImpactLevels.id;
                impactTotal++;
              }
            }
            row.bcRto.push({
              bcImpactLevelId: bcImpactLevelId,
              bcRtoId: rto?.id,
            });
          });

          table.push(row);
        });

        impactTotal =
          ((rtos?.length * impactMatrix?.length) / impactTotal) * 100;
        this.store.dispatch(
          new BrowseActivityAnalysisAction.setImpactTotal({ impactTotal })
        );
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
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadPage({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        cycleId: cycle?.id,
        activityId: activityAnalysis.activity.id,
      })
    );
  }
  public loadImpactMatrixPage(versionId, event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadImpactMatrix({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: versionId,
      })
    );
  }

  public loadImpactTypePage(versionId, event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadImpactLevel({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: versionId,
      })
    );
  }

  public loadRTOPage(versionId, event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.LoadRto({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        versionId: versionId,
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
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    console.log(this.selectedCells);

    const payload: BcActivityImpactMatrixDetailsDto = {
      bcImpactTypes: this.selectedCells,
      cycleId: cycle?.id,
      activityId: activityAnalysis.activity.id,
    };

    this.store.dispatch(
      new BrowseActivityImpactMatrixAction.UpdateImpactMatrix(payload)
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
