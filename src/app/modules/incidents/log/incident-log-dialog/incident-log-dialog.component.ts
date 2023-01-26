import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

import { TranslationService } from "src/app/modules/i18n/translation.service";
import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";
import { OrgService } from "@core/api/services/org.service";

@Component({
  selector: "app-incident-log-dialog",
  templateUrl: "./incident-log-dialog.component.html",
  styleUrls: ["./incident-log-dialog.component.scss"],
})
export class IncidentLogDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<IncidentLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incident: any,
    private translation: TranslationService,
    private incidentservice: IncidentsService,
    private orgSerivce: OrgService
  ) {}

  public lang = "en";
  public priority;
  async ngOnInit() {
    this.lang = this.translation.getSelectedLanguage();
    this.allOrgs = this.incident.incidentOrgs;
    this.filteredOrgs = this.orgCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => (fruit ? this._filter(fruit) : this.allOrgs))
    );
  }

  priorities$ = this.incidentservice
    .getPriorities()
    .pipe(map((r) => r.result.content));

  ok() {
    const response = { privateOrgs: this.orgs, priority: this.priority };
    this.dialogRef.close(response);
  }

  // orgs
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orgCtrl = new FormControl();
  filteredOrgs: Observable<any[]>;
  orgs: any[] = [];
  allOrgs: any[] = [];

  @ViewChild("orgInput") orgInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  remove(org: any): void {
    const index = this.orgs.indexOf(org);

    if (index >= 0) {
      this.orgs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.orgs.indexOf(event.option.value) < 0) {
      this.orgs.push(event.option.value);
    }
    this.orgInput.nativeElement.value = "";
    this.orgCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    if (typeof value !== "string") {
      return this.allOrgs;
    }
    const filterValue = value?.toLowerCase();
    return this.allOrgs.filter(
      (org) =>
        org.nameEn?.toLowerCase()?.indexOf(filterValue) === 0 ||
        org.nameAr?.toLowerCase()?.indexOf(filterValue) === 0
    );
  }
}
