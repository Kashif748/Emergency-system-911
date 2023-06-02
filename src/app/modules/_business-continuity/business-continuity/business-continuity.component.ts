import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';
import { GenericValidators } from '@shared/validators/generic-validators';
import { MenuItem } from 'primeng/api';
import {Observable, Subject, Subscription} from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TABS } from '../tabs.const';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BrowseBusinessContinuityAction } from '../states/browse-business-continuity.action';
import { FormUtils } from '@core/utils/form.utils';
import {BCAction, RtoState} from '@core/states';
import { BusinessContinuityState } from '@core/states/bc/business-continuity/business-continuity.state';
import { BcVersions } from '../../../api/models/bc-versions';
import { IAuthService } from '@core/services/auth.service';
import { BrowseBusinessContinuityState } from '../states/browse-business-continuity.state';

@Component({
  selector: 'app-business-continuity',
  templateUrl: './business-continuity.component.html',
  styleUrls: ['./business-continuity.component.scss'],
})
export class BusinessContinuityComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  items: MenuItem[] = [];
  sidebar = false;

  form: FormGroup;
  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
  );
  public smallScreen: boolean;

  @Select(BrowseBusinessContinuityState.versionsDialogOpend)
  public versionsDialogOpend$: Observable<boolean>;

  @Select(BusinessContinuityState.loading)
  public loading$: Observable<boolean>;

  @Select(BusinessContinuityState.blocking)
  blocking$: Observable<boolean>;

  @Select(BusinessContinuityState.versions)
  public versions$: Observable<BcVersions[]>;

  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }

  private versionsSubscription: Subscription;
  public showVersionForm = false;
  selectedVersion: BcVersions;
  private destroy$ = new Subject();
  constructor(
    private router: Router,
    private langFacade: ILangFacade,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private store: Store,
    private auth: IAuthService
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const version = params['_version'];
        if (version) {
          this.store.dispatch(
            new BrowseBusinessContinuityAction.SetGlobalVersion({
              id: version,
            })
          );
          this.versionsSubscription = this.versions$.subscribe(versions => {
            // Assuming you have a condition to select a specific version
            // Replace the condition with your own logic
            const selectedVersion = versions?.find((versions) => {
              if (versions.id == version) {
                return versions;
              }
            });

            if (selectedVersion) {
              this.selectedVersion = selectedVersion;
            }
          });
        } else {
          this.toggleDialog();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.store.dispatch(new BCAction.LoadPage({ page: 0, size: 25 }));

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
    this.createForm();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.translateMenu(TABS);
      this.cdr.detectChanges();
    }, 1000);
  }
  translateMenu(items: MenuItem[]): MenuItem[] {
    return items.map((tab) => {
      tab.label = this.translate.instant(tab.label);
      tab.queryParamsHandling = 'merge';
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

  setValueGlobally(value: number) {
    this.store.dispatch(
      new BrowseBusinessContinuityAction.SetGlobalVersion({
        id: value,
      })
    );
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
      id: this.loggedinUserId,
    };
    businessCon.isActive = true;
    this.store
      .dispatch(
        new BrowseBusinessContinuityAction.CreateBusinessContinuity(businessCon)
      )
      .pipe(takeUntil(this.destroy$),
      tap(() => {
        this.form.reset();
        this.showVersionForm = false;
        this.router.navigate(['business-continuity/org/org-details']);
        this.toggleDialog();
      }))
      .subscribe();
  }

  toggleDialog() {
    this.store.dispatch(new BrowseBusinessContinuityAction.ToggleDialog());
  }
}
