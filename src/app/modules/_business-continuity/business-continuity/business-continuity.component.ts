import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILangFacade} from '@core/facades/lang.facade';
import {TranslateService} from '@ngx-translate/core';
import {GenericValidators} from '@shared/validators/generic-validators';
import {MenuItem} from 'primeng/api';
import {Observable, Subject} from 'rxjs';
import {map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {TABS} from '../tabs.const';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {BrowseBusinessContinuityAction} from "../states/browse-business-continuity.action";
import {FormUtils} from "@core/utils/form.utils";
import {BCAction} from "@core/states";
import {BusinessContinuityState} from "@core/states/bc/business-continuity/business-continuity.state";
import {BcVersions} from "../../../api/models/bc-versions";

@Component({
  selector: 'app-business-continuity',
  templateUrl: './business-continuity.component.html',
  styleUrls: ['./business-continuity.component.scss'],
})
export class BusinessContinuityComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  opened$: Observable<boolean>;
  items: MenuItem[] = [];
  visible = false;
  sidebar = false;

  form: FormGroup;
  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
  );
  public smallScreen: boolean;
  private destroy$ = new Subject();

  public versions: BcVersions[];

  /*@Input()
  set versionId(v: number) {
    // this._rtoId = v;
    this.createForm();
    this.store
      .dispatch(new BCAction.GetBc({ id: v }))
      .pipe(
        switchMap(() => this.store.select(BusinessContinuityState.bc)),
        takeUntil(this.destroy$),
        take(1),
        tap((bc) => {
          this.form.patchValue({
            ...bc,
          });
        })
      )
      .subscribe();
  }*/

  selectedVersion;
  constructor(
    private langFacade: ILangFacade,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        // this.versionId = id;
      });
    // this.selectedVersion = this.versions[0];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    console.log('test run');
    this.createForm();
    this.store
      .dispatch(new BCAction.LoadPage({ page: 0, size: 20 }))
      .pipe(
        switchMap(() => this.store.select(BusinessContinuityState.page)),
        takeUntil(this.destroy$),
        take(1),
        tap((bc) => {
          // this.versions = {...bc}
          this.versions = bc;
        })
      )
      .subscribe();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        map((c) => c.matches),
        tap((c) => {
          this.smallScreen = c;
          c ? (this.sidebar = false) : (this.sidebar = true);
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.translateMenu(TABS);
      this.visible = true;
      this.cdr.detectChanges();
    }, 1000);
  }
  translateMenu(items: MenuItem[]): MenuItem[] {
    return items.map((tab) => {
      tab.label = this.translate.instant(tab.label);
      if (tab.items && tab.items.length > 0) {
        tab.items = this.translateMenu(tab.items);
      }
      return tab;
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
    });
  }

  onChange(selectedValue: any) {
    // Handle the change event here
    console.log('Selected value:', selectedValue);
    this.setValueGlobally(selectedValue.id);
    // Perform additional actions as needed
  }

  setValueGlobally(value: any) {
    this.store.dispatch(new BrowseBusinessContinuityAction.SetGlobalVersion(value));
  }


  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const businessCon = {
      ...this.form.getRawValue(),
    };
    businessCon.orgStructure = {
      id: 4,
      label: 'OrgStructure'
    };
    businessCon.isActive = true;
    this.store.dispatch(new BrowseBusinessContinuityAction.CreateBusinessContinuity(businessCon)).pipe(
      tap(() => {
        this.visible = false;
        this.store
          .dispatch(new BCAction.LoadPage({ page: 0, size: 20 }))
          .pipe(
            switchMap(() => this.store.select(BusinessContinuityState.page)),
            takeUntil(this.destroy$),
            take(1),
            tap((bc) => {
              // this.versions = {...bc}
              this.versions = bc;
            })
          )
          .subscribe();
        takeUntil(this.destroy$);
        take(1);
      })
    ).subscribe();
  }

  openDialog(id?: number) {
    this.visible = true;
    // this.store.dispatch(new BrowseBusinessContinuityAction.ToggleDialog({ Id: id }));
  }

  close() {
    this.visible = false;
    // this.store.dispatch(new BrowseBusinessContinuityAction.ToggleDialog({}));
  }
}
