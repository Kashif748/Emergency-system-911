import { Directionality } from "@angular/cdk/bidi";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { PersonalInquiryService } from "src/app/_metronic/core/services/personal-inquiry.service";

import { TranslationService } from "../i18n/translation.service";

@Component({
  selector: "app-personal-inquiry",
  templateUrl: "./personal-inquiry.component.html",
  styleUrls: ["./personal-inquiry.component.scss"],
})
export class PersonalInquiryComponent implements OnInit {
  personalInfo: any;
  isSearchMode: boolean;

  lang = 'en';
  constructor(
    private piService: PersonalInquiryService,
    private cdr: ChangeDetectorRef,
    private aService: AlertsService,
    public translationService: TranslationService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }
  ngOnInit(): void {
  }

  clickEvent(eid: String) {
    //console.log("Emirates Id ", eid);
    this.isSearchMode = true;
    this.piService.getPersonalInfo(eid).subscribe(
      (ok) => {
        this.personalInfo = ok.result;
        this.isSearchMode = false;
        this.cdr.detectChanges();
        // this.aService.openSuccessSnackBar();
      },
      (er) => {
        //console.log(er);
        this.isSearchMode = false;
        this.aService.openFailureSnackBar();
      }
    );
  }
}
