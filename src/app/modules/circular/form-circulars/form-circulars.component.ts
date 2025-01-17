import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/api/services/user.service';
import { UrlHelperService } from '@core/services/url-helper.service';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { CircularsService } from 'src/app/_metronic/core/services/circulars.service';
import { OrgsService } from 'src/app/_metronic/core/services/orgs.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  skip,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IStorageService } from 'src/app/core/services/storage.service';
import { LayoutDataService } from 'src/app/pages/layout.service';
import { MenuItem } from 'src/app/pages/_layout/components/header/header-menu/menu-item.model';
import { TranslationService } from '../../i18n/translation.service';
import { CommonService } from '@core/services/common.service';
import { concat } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { TreeHelper } from '@core/helpers/tree.helper';
import { IAuthService } from '@core/services/auth.service';
import { OrgAction, OrgState } from '@core/states';
import { OrgStructure } from 'src/app/api/models';
import { IncidentAction } from '@core/states/incident/incident.action';
import { IncidentState } from '@core/states/incident/incident.state';
import { Select, Store } from '@ngxs/store';
import { IncidentIdSubjectProjection } from 'src/app/api/models';

@Component({
  selector: 'app-form-circulars',
  templateUrl: './form-circulars.component.html',
  styleUrls: ['./form-circulars.component.scss'],
})
export class FormCircularsComponent implements OnInit, OnDestroy {
  // Variables

  users$: Observable<any>;
  toList: any[] = [];
  storage: any;
  toUsersList: any[] = [];
  managersList: any[] = [];
  filterManagersList = [];
  selectedManagerId: any;
  toOrgsList: any[] = [];
  toCCOrgsList: any[] = [];
  toCCUsersList: any[] = [];
  confidentialty: any[];
  priorities: any[];
  lang = 'en';
  id: any;
  form: FormGroup;
  user$: any;
  formId = '';
  circularStatus: any[];

  currentCir: any;
  currentMenu: MenuItem;
  toInternalOrgsList: any[];

  control = new FormControl('');

  @Select(IncidentState.transLoading)
  incidentLoading$: Observable<boolean>;

  @Select(IncidentState.incidents)
  incidents$: Observable<IncidentIdSubjectProjection[]>;

  private auditLoadIncidents$ = new Subject<string>();

  @Select(OrgState.orgs)
  public orgs$: Observable<OrgStructure[]>;

  @Select(OrgState.extOrgs)
  public extOrgs$: Observable<OrgStructure[]>;

  public internalOrgsTree$: Observable<TreeNode[]>;
  public externalOrgsTree$: Observable<TreeNode[]>;
  orgId: number;

  private destroy$ = new Subject();

  constructor(
    private translationService: TranslationService,
    private incidentservice: IncidentsService,
    private fb: FormBuilder,
    private orgsService: OrgsService,
    private userService: UserService,
    private cirService: CircularsService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private alertService: AlertsService,
    private storageService: IStorageService,
    private layoutDataService: LayoutDataService,
    private urlHelper: UrlHelperService,
    private readonly commonService: CommonService,
    private treeHelper: TreeHelper,
    private auth: IAuthService,
    private store: Store
  ) {
    this.orgId = this.auth.getClaim('orgId');
  }

  ngOnInit(): void {
    const commonData = this.commonService.getCommonData();
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((val) => typeof val === 'string'),
        startWith(''),
        debounceTime(800),
        distinctUntilChanged(),
        tap((val) => this.loadIncidents(val || '', true))
      )
      .subscribe();
    this.layoutDataService.currentMenuItem.subscribe((data) => {
      if (data) {
        this.currentMenu = data;
      }
    });
    if (commonData) {
      this.confidentialty = commonData['confidentialties'];
      this.priorities = commonData['priorities'];
      this.user$ = commonData['currentUserDetails'];
      this.circularStatus = commonData['circularStatus'];
      this.storage = commonData['currentOrgDetails'];
    }

    this.cirService.getCircularNumber().subscribe((data) => {
      if (data && data['status']) {
        this.formId = data['result']['ar'];
        this.form.get('number').setValue(this.formId);
        this.form.get('number').disable();
      }
    });

    this.createForm();

    this.store.dispatch(new OrgAction.LoadExtOrgs());
    this.store.dispatch(new OrgAction.LoadOrgs({ orgId: this.orgId }));

    this.externalOrgsTree$ = this.extOrgs$.pipe(
      filter((orgs) => !!orgs),
      map((orgs) => {
        const heighOrg = orgs.find((org) => org['parent']?.id === 1);
        return this.treeHelper.composeOrgTree({
          orgs: orgs as any,
          rootId: heighOrg?.id,
          mapper(o) {
            return {
              key: o.id as any,
              labelEn: o.nameEn,
              labelAr: o.nameAr,
              data: o,
            } as TreeNode;
          },
        });
      })
    );

    this.internalOrgsTree$ = this.orgs$.pipe(
      filter((orgs) => !!orgs),
      tap((orgs) => console.log('interanl', orgs)),
      map((orgs) =>
        this.treeHelper.composeOrgTree({
          orgs: orgs as any,
          rootId: this.orgId,
          mapper(o) {
            return {
              key: o.id as any,
              labelEn: o.nameEn,
              labelAr: o.nameAr,
              data: o,
            } as TreeNode;
          },
        })
      )
    );
    this.lang = this.translationService.getSelectedLanguage();

    this.users$ = this.userService
      .getAll()
      .pipe(map((users) => users.result.content));
    this.cirService.onManagersChange.subscribe((data) => {
      this.managersList = data;
      this.filterManagersList = this.managersList;
    });
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.cirService.getById(this.id).subscribe((cir) => {
        this.currentCir = cir;
        const obj = {
          confidentialtyID: cir.confidentialty.id,
          priority: cir.priority?.id,
          manager: '',
          createdOrg: cir.createdOrg,
          createdBy: cir.createdBy,
          number: cir.number,
          //posission: cir.posission,
          subject: cir.subject || null,
          procedure: cir.procedure,
          date: cir.date,
          createdDate: cir.createdDate,
          sentDate: cir.sentDate,
          coordinatorMail: cir.coordinatorMail,
          coordinatorMobil: cir.coordinatorMobil,
          coordinatorPhone: cir.coordinatorPhone,
          id: cir.id,
          cc: cir.cc,
          incidentId: cir?.incident?.id || null,
          orgs: cir.orgs
            .map((item) => {
              if (item.internal == false) {
                return {
                  key: item?.orgStructure?.id,
                  labelAr: item?.orgStructure?.nameAr,
                  labelEn: item?.orgStructure?.nameEn,
                  data: item?.orgStructure,
                };
              }
            })
            .filter((i) => !!i),
          internalOrgs: cir.orgs
            .map((item) => {
              if (item.internal == true) {
                return {
                  key: item?.orgStructure?.id,
                  labelAr: item?.orgStructure?.nameAr,
                  labelEn: item?.orgStructure?.nameEn,
                  data: item?.orgStructure,
                };
              }
            })
            .filter((i) => !!i),
        };

        this.loadIncidents('', true, cir.incident?.id);
        this.form.patchValue(obj);
        this.cirService.onManagersChange.subscribe((data) => {
          this.getCurrentManager(cir.manager.id);
        });
      });
    }
    this.form
      .get('orgs')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((orgs) => {
        this.toOrgsList = [];
        if (orgs?.length === 0) {
          this.form.get('internalOrgs').setValidators([Validators.required]);
          return;
        } else {
          this.form.get('internalOrgs').setValidators([]);
          this.form.get('internalOrgs').updateValueAndValidity();
        }
        orgs.forEach((org) => {
          this.toOrgsList.push({
            id: 0,
            internal: false,
            orgStructure: {
              id: org?.key,
            },
          });
        });
      });

    this.form
      .get('internalOrgs')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((orgs) => {
        this.toInternalOrgsList = [];
        if (orgs?.length === 0) {
          this.form.get('orgs').setValidators([Validators.required]);
          return;
        } else {
          this.form.get('orgs').setValidators([]);
          this.form.get('orgs').updateValueAndValidity();
        }

        orgs.forEach((org) => {
          this.toInternalOrgsList.push({
            id: 0,
            internal: true,
            orgStructure: {
              id: org?.key,
            },
          });
        });
      });

    this.form.get('cc').valueChanges.subscribe((users) => {
      this.toCCUsersList = [];
      if (!users.length) {
        return;
      }
      users.forEach((user) => {
        this.toCCUsersList.push({ id: 0, user: { id: user.id } });
      });
    });
    this.form.get('manager').valueChanges.subscribe((data) => {
      this.applyFilter(data);
    });
  }

  loadIncidents(searchText?: string, direct = false, id?: number) {
    if (direct) {
      this.store.dispatch(
        new IncidentAction.LoadIncidents({
          status: [1, 2],
          subject: searchText,
          id,
        })
      );
      return;
    }
    this.auditLoadIncidents$.next(searchText);
  }
  // Functions
  onChange($event) {
    if ($event && typeof $event === 'object') {
      this.form.get('incidentId').setValue($event);
    }
  }

  displayWith(value) {
    if (value) {
      return value['subject'];
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createForm() {
    const currentDate = new Date();
    this.form = this.fb.group({
      internalOrgs: [[], [Validators.required]],
      // number: ['',[ Validators.required,Validators.pattern(reg)]],
      number: ['', [Validators.required]],
      //posission: ['', Validators.required],
      subject: ['', Validators.required],
      procedure: ['', Validators.required],
      date: [new Date(), Validators.required],
      incidentId: [null],
      id: 0,
      createdOrg: { id: this.storage?.id },
      orgs: ['', Validators.required],
      cc: [''],
      confidentialtyID: ['', Validators.required],
      coordinatorMail: [
        '',
        Validators.required,
        // 'ops@adloc.gov.ae',
        // Validators.compose([
        //   Validators.required,
        //   Validators.email,
        //   Validators.minLength(3),
        //   Validators.maxLength(320),
        // ]),
      ],
      coordinatorMobil: [
        '',
        [
          Validators.required,
          Validators.pattern(/((971|0){1}(50|51|52|54|55|56|58){1}([0-9]{7}))/),
        ],
      ],
      coordinatorPhone: [
        '',
        [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)],
      ],
      manager: ['', Validators.required],
      createdBy: {
        id: this.user$['id'],
      },
      createdDate: [currentDate, Validators.required],
      sentDate: [currentDate, Validators.required],
      priority: [null],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  isRequiredField(field: string) {
    const form_field = this.form.get(field);
    if (!form_field.validator) {
      return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return validator && validator.required;
  }

  /* Date */
  formatDate(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 30);
    this.form.get('date').setValue(convertDate, {
      onlyself: true,
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    let val = this.form.value;

    val.confidentialty = { id: this.form.value.confidentialtyID || null };
    delete this.form.value.cc;
    delete this.form.value.orgs;
    delete this.form.value.confidentialtyID;
    delete this.form.value.internalOrgs;
    val['cc'] = this.toCCUsersList;
    val['orgs'] = this.toOrgsList.concat(this.toInternalOrgsList);
    val['manager'] = {
      id: val['manager']['id'],
    };

    val['incident'] =
      val.incidentId != null
        ? {
            id: val.incidentId,
          }
        : null;
    val['date'] = new Date();

    val = { ...val, number: this.form.get('number').value };

    if (!this.id) {
      this.cirService.create(val).then((x) => {
        if (x && x['status']) {
          this.alertService.openSuccessSnackBar();
          this.currentCir = x['result'];
          this.id = this.currentCir['id'];
          this.reviewPdf(this.id);
          this.backClicked();
        } else {
          this.alertService.openFailureSnackBar();
        }
      });
    } else {
      val.id = this.id;

      this.cirService.update(val).then((x) => {
        if (x && x['status']) {
          this.alertService.openSuccessSnackBar();
          this.currentCir = x['result'];
          this.id = this.currentCir['id'];
          this.reviewPdf(this.id);
          this.backClicked();
        } else {
          this.alertService.openFailureSnackBar();
        }
      });
    }
  }

  reviewPdf(id) {
    this.cdr.detectChanges();

    this.cirService.review(id).subscribe((response) => {
      const newBlob = new Blob([response], { type: 'application/pdf' });
      this.urlHelper.downloadBlob(newBlob);
    });
  }

  sendCircular() {
    const managerId = this.form.value['manager']['id'];
    this.cirService.sendCircular(this.id, managerId).subscribe(
      (data) => {
        if (data && data['status']) {
          this.alertService.openSuccessSnackBar();

          this.currentCir = data['result'];

          this.cirService.updateItem(data['result']);
          this.cdr.detectChanges();
          this.backClicked();
        } else {
          this.alertService.openFailureSnackBar();
        }
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  approval() {
    this.cirService.approval(this.id).subscribe((data) => {
      if (data && data['status']) {
        this.alertService.openSuccessSnackBar();
        this.currentCir = data['result'];
        this.cirService.publish(this.id).then((data) => {
          this.currentCir = data['result'];
          this.cirService.getCirculars(0, 10, 'desc');
          this.cdr.detectChanges();
          this.backClicked();
        });
      }
    });
  }

  reject() {
    this.cirService.reject(this.id).subscribe((data) => {
      if (data && data['status']) {
        this.alertService.openSuccessSnackBar();

        this.currentCir = data['result'];
        this.cirService.updateItem(data['result']);
        this.cdr.detectChanges();
        this.backClicked();
      }
    });
  }

  archive() {
    this.cirService.archive(this.id).subscribe((data) => {});
  }

  backClicked() {
    this.location.back();
  }

  applyFilter(value) {
    const filterValue = value;
    if (typeof value == 'string' && filterValue.replace(/\s/g, '').length) {
      this.filterManagersList = this.managersList.filter((item) => {
        const fullNameAr = item['firstNameAr'] + item['lastNameAr'];
        const fullNameEn = item['firstNameEn'] + item['lastNameEn'];

        if (
          fullNameAr.toLowerCase().indexOf(filterValue) > -1 ||
          fullNameEn.toLowerCase().indexOf(filterValue) > -1 ||
          item.email.toLowerCase().indexOf(filterValue) > -1
        ) {
          return item;
        }
      });
    } else {
      this.filterManagersList = this.managersList;
    }
  }

  getCurrentManager(managerId) {
    this.managersList.filter((item) => {
      if (item['id'] === managerId) {
        this.form.get('manager').setValue(item);
      }
      return item;
    });
  }

  displayFn(subject) {
    return subject ? subject.firstNameEn + ' ' + subject.lastNameEn : undefined;
  }

  getCircularStatus() {
    if (this.id && this.currentCir) {
      return this.circularStatus.find(
        (x) => x.id === this.currentCir.status['id']
      );
    } else {
      return { nameEn: 'New', nameAr: ' جديد' };
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
}
