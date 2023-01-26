import {ChangeDetectorRef, NgModule, OnDestroy} from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActivatedRoute} from '@angular/router';

import {InlineSVGModule} from 'ng-inline-svg';

import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {NodataTableModule} from 'src/app/shared/components/nodata-table/nodata-table.module';

import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {TranslationModule} from '../../i18n/translation.module';

import {ChallengesService} from './challenges.service';

import {ChallengeFormComponent} from './challenge-form/challenge-form.component';
import {Challenge} from './model/Challenge';
import {ILangFacade} from '@core/facades/lang.facade';
import {TranslationService} from '../../i18n/translation.service';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
})
export class ChallengesComponent implements OnInit, OnDestroy {

  // UI
  @Input() incidentId: number;

  // Variables
  currentOrg: any;
  lang = 'en';
  displayedColumns: string[] = [
    'id',
    'challenge',
    'requmendations',
    'organization',
    'actions',
  ];
  dataSource: MatTableDataSource<Challenge> = new MatTableDataSource([]);
  totalElement$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();
  loading = true;
  public dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));


  constructor(
    public matDialog: MatDialog,
    private challengesService: ChallengesService,
    private translationService: TranslationService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private langFacade: ILangFacade
  ) {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.currentOrg = commonData['currentOrgDetails'];
  }


  ngOnInit(): void {
    this.incidentId = this.activatedRoute.snapshot.params['id'];
    this.challengesService.setIncidentId(this.incidentId);

    this.lang = this.translationService.getSelectedLanguage();
    this.totalElement$ = this.challengesService.totalElementChanged$;
    this.challengesService.chalengesChanged$.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [...data];
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    );

    this.challengesService.getContent();
  }

  applyFilter() {
  }

  add() {
    this.matDialog.open(ChallengeFormComponent, {
      panelClass: 'modal',
    });
  }

  edit(challenge: Challenge) {
    this.matDialog.open(ChallengeFormComponent, {
      data: challenge,
      maxWidth: '50vw',
      panelClass: 'modal',
      disableClose: true,
    });
  }

  delete(id: number) {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.challengesService.deleteChallenge(id);
        }
      });
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
    this.challengesService.getContent(event.pageIndex, event.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}

@NgModule({
  declarations: [ChallengesComponent],
  imports: [
    MatToolbarModule,
    TranslationModule,
    MatTableModule,
    InlineSVGModule,
    MatPaginatorModule,
    NodataTableModule,
    MatTooltipModule,
    MatProgressBarModule,
    PerfectScrollbarModule,
  ],
})
export class ChallengesModule {
}
