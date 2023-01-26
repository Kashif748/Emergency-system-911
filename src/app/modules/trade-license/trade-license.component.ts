import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { TradeLicenseService } from "src/app/_metronic/core/services/trade-license.service";
import { TranslationService } from "../i18n/translation.service";

@Component({
  selector: "app-trade-license",
  templateUrl: "./trade-license.component.html",
  styleUrls: ["./trade-license.component.scss"],
})
export class TradeLicenseComponent implements OnInit {
  companyDetails: any;
  isSearchMode: boolean;
  constructor(
    private tlService: TradeLicenseService,
    private cdr: ChangeDetectorRef,
    private aService: AlertsService,
    public translationService: TranslationService
  ) {}

  lang = "en";

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
  }

  clickEvent(cn: number) {
    //console.log("company number ", cn)
    this.isSearchMode = true;
    this.tlService.getLicenseDetails(cn).subscribe(
      (ok) => {
        this.companyDetails = ok.result;
        this.isSearchMode = false;
        this.cdr.detectChanges();
        // this.aService.openSuccessSnackBar();
      },
      (er) => {
        //console.log(er)
        this.aService.openFailureSnackBar();
      }
    );
  }
}
