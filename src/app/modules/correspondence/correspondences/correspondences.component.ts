import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSelectionListChange} from '@angular/material/list';
import {debounceTime, distinctUntilChanged, filter, map, startWith, takeUntil} from 'rxjs/operators';
import {CorrService} from 'src/app/_metronic/core/services/correspondence.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {SplitAreaDirective} from 'angular-split';
import {Subject} from 'rxjs';
import {CorrespondenceFormComponent} from '../correspondence-form/correspondence-form.component';
import {CorrespondenceReplyComponent} from '../correspondence-reply/correspondence-reply.component';
import {Correspondence} from '../models/correspondence.model';
import {TranslationService} from '../../i18n/translation.service';

@Component({
  selector: 'app-correspondences',
  templateUrl: './correspondences.component.html',
  styleUrls: ['./correspondences.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CorrespondencesComponent implements OnInit, OnDestroy {
  // UI
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;

  // Variables.
  currentTab: string = 'IN';
  lang = 'en';
  type: string = 'IN';
  searchType: any;
  attachments: any[];
  selectedMessageId: number;
  confidentialties: any[] = [];
  displayMessage = false;
  selectedMessage: any;
  correspondenceStatus: any[] = [];
  displayedMessages: any[] = [];
  criteria: FormGroup;
  splitScreenDirection: 'rtl' | 'ltr';
  destroy$: Subject<boolean> = new Subject();
  filterTypes = [
    {
      id: 1,
      key: 'filter',
      label: 'CORRERSPONDENCE.SUBJECT_AND_BODY',
    },
    {
      id: 2,
      key: 'orgMail',
      label: 'CORRERSPONDENCE.ORGANIZATION_MAIL',
    },
    {
      id: 3,
      key: 'circularNumber',
      label: 'CORRERSPONDENCE.CIRCULAR_NUMBER',
    },
    {
      id: 4,
      key: 'createdByName',
      label: 'CORRERSPONDENCE.SENDER',
    },
  ];


  constructor(
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private corrService: CorrService,
    private alertService: AlertsService,
    private bottomSheet: MatBottomSheet,
    private translationService: TranslationService
  ) {
  }

  ngOnInit(): void {
    this.type = 'IN';
    //this.currentTab = this.type;

    this.criteria = new FormGroup({
      filter: new FormControl(''),
      filterType: new FormControl('filter'),
      sort: new FormControl('desc'),
      size: new FormControl(10),
      page: new FormControl(0),
    });

    this.searchType = this.getFilterType('filter');

    this.criteria
      .get('filter')
      .valueChanges.pipe(
      filter((val) => typeof val === 'string' && !!val),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.criteria.get('page').setValue(0);
      this.displayedMessages = [];
      this.loadCorrPage(this.type);
    });

    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.confidentialties = commonData.confidentialties;
    this.correspondenceStatus = commonData.correspondenceStatus;
    this.lang = this.translationService.getSelectedLanguage();
    this.splitScreenDirection = this.lang == 'ar' ? 'rtl' : 'ltr';

    this.corrService.corrChanged$
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.map((corr) => new Correspondence(corr)))
      )
      .subscribe((data) => {
        this.handleRequest(data);
      });
  }

  changeCurrentTab(tab) {
    this.currentTab = tab.index;
    this.typeChanged(tab.index);
  }

  handleRequest(data) {
    this.displayedMessages.push(...data);
    this.setSelectedMessage(0);
    this.ref.detectChanges();
  }

  typeChanged(type: string) {
    this.currentTab = type;
    this.type = type.split('_')[0];
    this.criteria.patchValue({
      type: this.type,
      page: 0,
    });

    this.displayedMessages = [].slice(0);
    this.type = type;
    this.loadCorrPage(this.type);
    this.ref.detectChanges();
  }

  loadCorrPage(type = 'IN') {
    this.displayMessage = false;

    switch (type) {
      case 'IN':
        // this.areasEl.last.expand();
        this.getReceiving();
        break;
      case 'IN_WITH_CIRCULAR':
        // this.areasEl.last.expand();
        this.getReceiving(true);
        break;
      case 'IN_EXTERNAL':
        // this.areasEl.last.expand();
        this.getReceiving(null, true);
        break;
      case 'OUT':
        // this.areasEl.last.collapse(0,'left');
        this.getSending();
        break;
      case 'OUT_WITH_CIRCULAR':
        // this.areasEl.last.expand();
        this.getSending(true);
        break;
      case 'OUT_EXTERNAL':
        // this.areasEl.last.expand();
        this.getSending(null, true);
        break;
      default:
        break;
    }
  }

  getReceiving(withCircular: boolean = null, External: boolean = null) {
    const value = this.criteria.value;

    this.corrService.getReceiving(
      value['page'],
      {fitlerType: value['filterType'], filter: value['filter']},
      withCircular,
      External
    ).subscribe(data => console.log(data));
  }

  getSending(withCircular: boolean = false, External: boolean = null) {
    const value = this.criteria.value;

    this.corrService.getSending(
      this.criteria.value['page'],
      {fitlerType: value['filterType'], filter: value['filter']},
      withCircular,
      External
    );
  }

  setSelectedMessage(messageId: number) {
    this.displayMessage = true;
    if (this.displayedMessages.length == 0) {
      this.selectedMessage = null;
      this.selectedMessageId = null;
      return;
    }

    if (this.selectedMessage?.id == this.displayedMessages[messageId]?.id) {
      return;
    }

    this.selectedMessage = null;
    this.selectedMessageId = messageId;
    this.selectedMessage = {...this.displayedMessages[messageId]};

    if (this.type.split('_')[0] === 'IN') {
      if (!this.selectedMessage.readingStatus) {
        this.updateStatus(this.selectedMessage.id);
      }
    }
  }

  updateStatus(id) {
    const status = this.correspondenceStatus.filter((item) => item.id == 2);
    this.corrService.updateStatus(id, status[0]).subscribe(
      (data) => {
        const result = data.result;
        if (result && result.length > 0) {
          for (const element of result) {
            for (
              let index = 0; index < this.selectedMessage.toList.length; index++) {
              if (this.selectedMessage.toList[index].id == element.id) {
                this.selectedMessage.toList[index] = {...element};
                this.selectedMessage.toList[index].correspondenceStatus =
                  status[0];
              }
            }
          }

          this.selectedMessage.readingStatus = true;

          this.displayedMessages = this.displayedMessages.map((corr) => {
            if (corr.id === id) {
              corr = {...this.selectedMessage};
            } else {
              corr = {...corr};
            }

            return corr;
          });

          this.ref.detectChanges();

          this.alertService.openSuccessSnackBarWithMsg(
            this.translationService.translateAWord(
              'CORRERSPONDENCE.STATUS_UPDATED_SUCCESSFULLY'
            )
          );
        }
      },
      (error) => {
        this.alertService.openFailureSnackBarWithMsg(
          this.translationService.translateAWord(
            'CORRERSPONDENCE.CANT_UPDATE_THE_STATUS'
          )
        );
      }
    );
  }

  onScroll() {
    let currentPage = this.criteria.get('page').value;
    currentPage++;

    this.criteria.get('page').setValue(currentPage);

    this.loadCorrPage(this.type);
  }

  reply(id) {
    this.bottomSheet
      .open(CorrespondenceReplyComponent, {
        hasBackdrop: false,
        direction: this.lang == 'en' ? 'ltr' : 'rtl',
        autoFocus: true,
        panelClass: 'my-component-bottom-sheet',
        data: this.selectedMessage,
      })
      .afterDismissed()
      .subscribe((data) => {
        if (data) {
          this.displayedMessages[this.selectedMessageId].isRepliedByOther =
            true;
        }
      });
  }

  add() {
    this.bottomSheet
      .open(CorrespondenceFormComponent, {
        hasBackdrop: true,
        direction: this.lang == 'en' ? 'ltr' : 'rtl',
        autoFocus: true,
        panelClass: 'my-component-bottom-sheet',
      })
      .afterDismissed()
      .subscribe((data) => {
      });
  }

  filterTypeChanged(event: MatSelectionListChange) {
    this.criteria.get('filterType').setValue(event.options[0].value);
    this.criteria.get('filterType').updateValueAndValidity();
    this.searchType = this.getFilterType(event.options[0].value);
  }

  getFilterType(type: any) {
    return this.filterTypes.find((item) => item.key == type);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
