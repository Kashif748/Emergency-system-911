import { Component, OnInit } from "@angular/core";
import { AvailabilityService } from "@core/api/services/availability.service";
import { Observable } from "rxjs";
import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-reports-list",
  templateUrl: "./reports-list.component.html",
  styleUrls: ["./reports-list.component.scss"],
})
export class ReportsListComponent implements OnInit {
  lang = "en";

  reportsList: Observable<any[]>;
  constructor(
    private translationService: TranslationService,
    private _service: AvailabilityService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    this.reportsList = this._service.availabilityChanged$;
  }

  customSort(event) {
    // this.loading = true;
    // this.sort = event;
    // this.getIncidents(0, event);
  }
}
