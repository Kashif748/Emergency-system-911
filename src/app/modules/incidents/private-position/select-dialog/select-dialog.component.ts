import {map, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslationService} from '../../../i18n/translation.service';
import {IncidentsService} from '../../../../_metronic/core/services/incidents.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatSidenav} from '@angular/material/sidenav';
import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialogComponent implements OnInit, OnDestroy {

  // Ui
  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("assignedSearch") assignedSearch;
  @ViewChild('auto') statesAutocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  // Variables
  message = "";
  modifierValue = "";
  cancelButtonText = "Cancel";
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  showMap = false;
  public loading = false;
  title: any;
  formGroup: FormGroup;
  post: any = "";
  assignTo: any;
  showAssets = false;
  minDate: Date;
  maxDate: Date;
  incidentId: any;
  priorities: [] = [];
  assignedToList: any[] = [];
  openAll = false;
  selectedTypeValue: any;
  selectedpriorityValue: any;
  incidents: any;
  lang = "en";
  id;
  private subscription: Subscription[] = [];
  public incidentSearchCtrl = new FormControl();
  // tslint:disable-next-line:variable-name
  private _incidents: any[] = [];
  incidents$ = new BehaviorSubject<any[]>([]);
  private incidentsPageNumber = 0;
  incidentsCompleted = false;
  limit = 7;
  assetsOffset = 0;
  orgId;
  categoryId;
  totalAsstes = 0;
  assetsPageNumber = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private incidentsService: IncidentsService,
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SelectDialogComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }

    this.title = this.route.snapshot.paramMap.get("title");
    this.incidentId = this.route.snapshot.paramMap.get("id");
    this.id = this.route.snapshot.params["tid"];

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  async ngOnInit() {
    await this.getNextIncidents();
    this.createForm();
    if (this.id) {
      this.loading = true;
      const incident = await this.incidentsService
        .getIncidentsByFilterQuery(0, { sr: this.incidentId })
        .pipe(map((res) => res?.result?.content[0]))
        .toPromise();
      this.incidentSearchCtrl.patchValue(incident?.subject);
      await this.getNextIncidents();
    }

    this.loading = false;
    this.lang = this.translationService.getSelectedLanguage();
  }

  async loadIncidents(subject?) {
    const { content } = await this.incidentsService
      .getIncidentsByFilterQuery(this.incidentsPageNumber, { subject })
      .pipe(map((r) => r.result))
      .toPromise<{ content: any[]; totalElements: number }>();
    this._incidents = [...this._incidents, ...content];
    this.incidents$.next(this._incidents);
    this.incidentsCompleted = content.length == 0;
  }
  async getNextIncidents() {
    await this.loadIncidents(this.incidentSearchCtrl?.value);
    this.incidentsPageNumber++;
  }


  async filterIncidents(value) {
    this.incidentsPageNumber = 0;
    this._incidents = [];
    this.incidentsCompleted = false;
    await this.getNextIncidents();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskType: [null, [Validators.required]],
      assigned: [null, [Validators.required]],
      assets: [null],
      date: [null, [Validators.required]],
      status: [null],
      qty: [null],
      Pqty: [null],
      category: [null],
      newLocation: [false],
      location: [null],
      body: [null, [Validators.required]],
      details: [null],
      incidentType: [parseInt(this.incidentId), [Validators.required]],
    });
    this.cd.detectChanges();
  }


  onConfirmClick(): void {
 //   this.router.navigate(["incidents/private-position"]);
    this.dialogRef.close(true);
  }

  getInc(inc){
    this.modifierValue = inc.id;
  //  console.log(this.modifierValue , inc,"hello")
  }


  redirect()
{
  localStorage.setItem('incident', this.modifierValue);
  this.dialogRef.close(this.modifierValue);
}

redirectTo(uri: string){

}

autocompleteScroll() {
  setTimeout(() => {
    if (
      this.statesAutocompleteRef &&
      this.autocompleteTrigger &&
      this.statesAutocompleteRef.panel
    ) {
      fromEvent(this.statesAutocompleteRef.panel.nativeElement, 'scroll')
        .pipe(
          map(x => this.statesAutocompleteRef.panel.nativeElement.scrollTop),
          takeUntil(this.autocompleteTrigger.panelClosingActions)
        )
        .subscribe(x => {
          const scrollTop = this.statesAutocompleteRef.panel.nativeElement
            .scrollTop;
          const scrollHeight = this.statesAutocompleteRef.panel.nativeElement
            .scrollHeight;
          const elementHeight = this.statesAutocompleteRef.panel.nativeElement
            .clientHeight;
          const atBottom = scrollHeight === scrollTop + elementHeight;
          if (atBottom) {
            // fetch more data
           this.getNextIncidents();
          }
        });
    }
  });
}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
