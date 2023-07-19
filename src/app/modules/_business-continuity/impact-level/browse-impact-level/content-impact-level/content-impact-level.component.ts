import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PageRequestModel } from '@core/models/page-request.model';
import { Store } from '@ngxs/store';
import { BcImpactLevel } from '../../../../../api/models/bc-impact-level';
import { BrowseImpactLevelAction } from '../../states/browse-impact-level.action';
import { TranslateService } from '@ngx-translate/core';
import {BusinessContinuityState} from "@core/states/bc/business-continuity/business-continuity.state";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
  clonedLevels: { [s: string]: BcImpactLevel } = {};
  public colorOptions = [
    '#9e0142',
    '#d53e4f',
    '#f46d43',
    '#fdba53',
    '#f3d639',
    '#6dc266',
    '#4c9945',
    '#359dde',
    '#0c5dba',
    '#8b8b8b'];

  public disableButton: boolean
  public version$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.version$ = this.route.queryParams.pipe(
      map((params) => params['_version']),
      tap((v) => {
        this.store
          .select(BusinessContinuityState.versions)
          .pipe(filter((p) => !!p))
          .subscribe((res) => {
            const shouldDisable = res.some((item) => {
              if (item.id == v) {
                return item.status.id !== 1;
              }
              return false;
            });

            this.disableButton = shouldDisable;
          });
      })
    );
    this.version$.subscribe();
  }
  onRowEditInit(level: BcImpactLevel) {
    this.clonedLevels[level.id] = { ...level };
  }

  onRowEditSave(level: BcImpactLevel, event: Event) {
    const updatedLevel: BcImpactLevel = {
      id: this.clonedLevels[level.id].id,
      versionId: this.clonedLevels[level.id].versionId,
      nameAr: this.clonedLevels[level.id].nameAr,
      nameEn: this.clonedLevels[level.id].nameEn,
      colorCode: this.clonedLevels[level.id].colorCode,
      isActive: this.clonedLevels[level.id].isActive
    };
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('UPDATE'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'mx-3 py-1',
      rejectButtonStyleClass: 'mx-3 py-1',
      accept: () => {
        this.store.dispatch(
          new BrowseImpactLevelAction.UpdateImpactLevel(
            updatedLevel
          )
        );
      },
      reject: () => {},
    });
  }
  onRowEditCancel(level: BcImpactLevel, index: number) {
    delete this.clonedLevels[level.id];
  }
}
