import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

import { CommonService } from "@core/services/common.service";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { commonDataItem } from "../common-data-keys";
import { EventsManagementService } from "../events-management.service";
import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-events-management",
  templateUrl: "./events-management.component.html",
  styleUrls: ["./events-management.component.scss"],
})
export class EventsManagementComponent implements OnInit, OnDestroy {
  // Variables
  commonDataItem = commonDataItem;
  orgCode;

  filterCommonDataItems = this.commonDataItem;
  currentTab = commonDataItem.find((k) => !k.hidden).key;
  commonDataLengths: any[] = [];
  listSpinner = false;
  loading = false;
  commonData: any;
  org: any;
  lang = "en";
  private destroy$ = new Subject();

  constructor(
    private translationService: TranslationService,
    private service: EventsManagementService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {
    this.commonData = this.commonService.getCommonData();
    this.org = this.commonData?.currentOrgDetails?.code;
    if (this.org == "ADCMC") {
      this.filterCommonDataItems.forEach((item) => {
        if (item.hidden) {
          item.hidden = false;
        }
      });
    }
    if (this.org !== "ADCDA"){
      this.filterCommonDataItems.forEach((item) => {
        if (item.key == 'assetsGroup') {
          item.hidden = true;
        }
      });
    }

    if (this.org == 'SLAMAH' || this.org == 'DMT'){
      this.filterCommonDataItems.forEach((item) => {
        if (item.key == 'localRisks') {
          item.hidden = false;
        }
      });
    }

    if (this.org == 'SLAMAH'){
      this.filterCommonDataItems.forEach((item) => {
        if (item.key == 'localRisks') {
          item.hidden = false;
        }
      });
    }
    


  }


  ngOnInit(): void {
    this.service.changeCurrentTab$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
        this.cdr.detectChanges();
      });
    this.commonDataLengths = this.service.commonDataLengths;
    this.lang = this.translationService.getSelectedLanguage();
    this.commonService.getCommonDataState().subscribe((data) => {
      if (data) {
        this.orgCode = data?.currentOrgDetails['code'];
      }
   
    });

  }

  applyFilter(event: Event) {
    this.listSpinner = true;
    const filterValue = (event.target as HTMLInputElement).value;
    if (
      typeof filterValue == "string" &&
      filterValue.replace(/\s/g, "").length
    ) {
      this.filterCommonDataItems = this.commonDataItem.filter((item) => {
        if (
          item.key &&
          this.translationService
            .get("EVENTSMODULES." + item.key)
            ?.toLowerCase()
            ?.includes(filterValue?.toLowerCase())
        ) {
          return item;
        }
      });
    } else {
      this.filterCommonDataItems = this.commonDataItem;
    }
    setTimeout(() => {
      this.listSpinner = false;
      this.cdr.detectChanges();
    }, 500);
  }

  changeCurrentTab(tab) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.currentTab = tab.key;
      this.cdr.detectChanges();
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
