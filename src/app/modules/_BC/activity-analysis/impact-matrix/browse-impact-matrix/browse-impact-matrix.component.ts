import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { ImpactMatrixState, RtoState } from '@core/states';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import {
  BcActivityImpactMatrixDetailsDto,
  BcImpactLevel,
  BcImpactTypesDetails,
  BcImpactTypesResponse,
  Bcrto,
  BCRtoDetails,
} from 'src/app/api/models';
import { BrowseActivityAnalysisAction } from '../../states/browse-activity-analysis.action';
import { BrowseActivityImpactMatrixAction } from '../states/browse-impact-matrix.action';
import {
  BrowseActivityImpactMatrixState,
  BrowseActivityImpactMatrixStateModel,
} from '../states/browse-impact-matrix.state';
import { BcImpactTypes } from '../../../../../api/models/bc-impact-types';
import { ImpactLevelState } from '@core/states/bc/impact-level/impact-level.state';
import { BcImpactLevelMatrixDto } from '../../../../../api/models/bc-impact-level-matrix-dto';
import { BcImpactMatrixDto } from '../../../../../api/models';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { ActivityAnalysisStatusAction } from '../../../../../api/models/activity-analysis-status-action';

@Component({
  selector: 'app-browse-impact-matrix',
  templateUrl: './browse-impact-matrix.component.html',
  styleUrls: ['./browse-impact-matrix.component.scss'],
})
export class BrowseImpactMatrixComponent implements OnInit, OnDestroy {
  @ViewChild('accordion') accordion: any;

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;

  @Select(ActivityImpactMatrixState.loading)
  public loading$: Observable<boolean>;

  @Select(ActivityImpactMatrixState.blocking)
  public blocking$: Observable<boolean>;

  public state$: Observable<BrowseActivityImpactMatrixStateModel>;

  public rtosPage$: Observable<Bcrto[]>;

  public impactLevelPage$: Observable<BcImpactLevel[]>;

  public tableValue$: Observable<any[]>;

  @Select(ImpactMatrixState.page)
  public impactMatrix$: Observable<BcImpactMatrixDto[]>;

  display: boolean = false;
  public dialogDescription: BcImpactLevelMatrixDto;
  dialogHeader: BcImpactTypes;

  dialogdescription$: Observable<BcImpactLevelMatrixDto>;

  selectedCells: BcImpactTypesDetails[] = [];
  private destroy$ = new Subject();

  constructor(
    private lang: ILangFacade,
    private store: Store,
    private translateObj: TranslateObjPipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.state$ = this.store.select(BrowseActivityImpactMatrixState.state).pipe(
      takeUntil(this.destroy$),
      filter((s) => !!s),
      tap(() => this.loadTableData())
    );

    if (this.accordion) {
      this.accordion.activeIndex = -1;
    }

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
          (impactTotal * 100) / (rtos?.length * impactMatrix?.length);

        this.calcImpactAnalysisRes(activityImpact, rtos);
        this.store.dispatch(
          new BrowseActivityAnalysisAction.setImpactTotal({ impactTotal })
        );
        return table;
      })
    );

    // represent table columns
    this.rtosPage$ = this.store.select(RtoState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id))
    );

    this.impactLevelPage$ = this.store.select(ImpactLevelState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id))
    );
  }

  loadTableData() {
    combineLatest([
      this.store.select(ActivityAnalysisState.activityAnalysis),
      this.store.select(ActivityAnalysisState.cycle),
    ])
      .pipe(
        filter(([activity, cycle]) => !!activity && !!cycle),
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadPage();
          this.loadImpactMatrixPage(cycle.versionId);
          this.loadImpactTypePage(cycle.versionId);
          this.loadRTOPage(cycle.versionId);
        })
      )
      .subscribe();
  }
  // for currecnt activiy analysis
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
  // impact materix related to version id
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
          sortField: 'id',
          sortOrder: 'asc',
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

  calcImpactAnalysisRes(
    activityImpact: BcImpactTypesResponse[],
    rtos: Bcrto[]
  ) {
    // Step 1: reshape data then sort based on impact level id
    let rtosList = activityImpact
      .map((impact) => impact.bcRto)
      .flat()
      .filter((rto) => !!rto.bcImpactLevels)
      .sort((a, b) => a.id - b.id);

    const minLevel = Math.min(...rtosList.map((o) => o.bcImpactLevels.id));
    const secondLevel = rtosList.find(
      (obj) => obj.bcImpactLevels.id !== minLevel
    );
    let tragetRto;
    if (secondLevel) {
      tragetRto = rtos.find((rto) => rto.id === secondLevel.id);
    } else if (rtos.length >= 1) {
      tragetRto = rtos[0];
    }

    this.store.dispatch(
      new BrowseActivityAnalysisAction.setImpactAnalysisRes({
        impactAnalysisRes: tragetRto,
      })
    );
  }
  save() {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );

    const payload: BcActivityImpactMatrixDetailsDto = {
      bcImpactTypes: this.selectedCells,
      cycleId: cycle?.id,
      activityId: activityAnalysis.activity.id,
    };

    this.store
      .dispatch(
        new BrowseActivityImpactMatrixAction.UpdateImpactMatrix(payload)
      )
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openDialog(impactType: BcImpactTypes): void {
    this.dialogHeader = impactType;
    // this.dialogdescription$ = of(impactMatrixDescription);
    this.display = true;
  }
  // Method to close the dialog
  close(): void {
    this.display = false;
    // Close all accordion tabs when the dialog is closed
    if (this.accordion) {
      this.accordion.activeIndex = -1;
    }
  }

  /*MatrixDescription(id) {
    this.store.select(ImpactMatrixState.page).pipe(
      filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.bcImpactTypes.id - b.bcImpactTypes.id))
    );
  }*/
  MatrixDescription(id): boolean {
    this.store
      .select(ImpactMatrixState.page)
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        filter((p) => !!p),
        map((page) => {
          const matchingMatrix = page.find(
            (item) => item.bcImpactTypes.id === this.dialogHeader.id
          );
          return matchingMatrix?.bcImpactLevelMatrixDtoList.find(
            (des) => des.id === id
          );
        })
      )
      .subscribe((description) => {
        this.dialogDescription = description;
      });
    return true;
  }
}
