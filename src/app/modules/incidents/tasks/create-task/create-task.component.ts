import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {DatePipe, Location} from '@angular/common';
import {ThemePalette} from '@angular/material/core';
import {UserService} from '@core/api/services/user.service';
import {GroupService} from '@core/api/services/group.service';
import {CommonService} from '@core/services/common.service';
import {FilesListComponent} from '@shared/attachments-list/files-list/files-list.component';
import {UrlHelperService} from 'src/app/core/services/url-helper.service';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, of, Subject, Subscription} from 'rxjs';
import {auditTime, catchError, map, switchMap, tap} from 'rxjs/operators';
import {CategoryService} from 'src/app/_metronic/core/services/categories.service';
import {AssetService} from 'src/app/core/api/services/asset.service';
import {MapService} from 'src/app/shared/components/map/services/map.service';
import {TranslationService} from '../../../i18n/translation.service';
import {AlertsService} from '../../../../_metronic/core/services/alerts.service';
import {IncidentsService} from '../../../../_metronic/core/services/incidents.service';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import * as moment from 'moment';
import {MapViewType} from '@shared/components/map/utils/MapViewType';
import {TaskIncidentGisData} from '@shared/components/map/utils/TaskIncidentGisData';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';
import {MapActionType} from '@shared/components/map/utils/MapActionType';

export enum AssignType {
  USER = 'user',
  Group = 'group',
  Orgnaization = 'org'
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [DatePipe, CustomDatePipe],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('assignedSearch') assignedSearch;
  formGroup: FormGroup;
  @ViewChild('picker') picker: any;
  @ViewChild('filesList') filesList: FilesListComponent;

  // Variables
  public loading = false;
  title: any;
  post: any = '';
  assignTo: any;
  minDate = new Date();
  maxDate: Date;
  incidentId: any;
  priorities: any[] = [];
  incidents: any;
  lang = 'en';
  id: number;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  private subscription: Subscription[] = [];
  status$ = this.incidentsService.getTasksStatus().pipe(map((r) => r.result));
  categories$ = this.commonService.getCommonDataState().pipe(map((d) => d.assetsCategory));
  afuConfig: any;
  private filterIncidentsThrottel = new Subject();
  private filterIncidentsThrottel$ = this.filterIncidentsThrottel.asObservable().pipe(auditTime(1500));
  public incidentSearchCtrl = new FormControl();
  // tslint:disable-next-line:variable-name
  private _incidents: any[] = [];
  incidents$ = new BehaviorSubject<any[]>(this._incidents);
  private incidentsPageNumber = 0;
  incidentsCompleted = false;
  limit = 7;
  assetsOffset = 0;
  orgId;
  categoryId;
  totalAssets = 0;
  assetsPageNumber = 0;
  private assets = [];
  private assetsStore = new BehaviorSubject([]);
  assets$ = this.assetsStore.asObservable();
  assignePageNumber = 0;
  completeAssigne = false;
  private assigneList = [];
  assigneSearchCtrl: FormControl = new FormControl();
  private assigneStore = new BehaviorSubject(this.assigneList);
  assigne$ = this.assigneStore.asObservable();
  private completeUsers = false;
  private completeGroups = false;
  private orgList = [];
  private filterAssignedThrottle = new Subject();
  private filterAssignedThrottle$ = this.filterAssignedThrottle
    .asObservable()
    .pipe(auditTime(1500));
  isAdmin;
   task;
  private taskTypes: any[];
  taskTypes$ = this.incidentsService.getTaskTypes().pipe(
    map((r) => r.result),
    tap((t) => {
      this.taskTypes = t;
    })
  );
  priorities$ = this.incidentsService.getPriorities().pipe(
    map((r) => r.result.content),
    tap((p) => {
      this.priorities = p;
    })
  );
  public submitting$ = new Subject<boolean>();
  attachments = [];

  // Functions.
  public addLocationToMapFunc: (ref: TaskIncidentGisData) => Promise<void>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private incidentsService: IncidentsService,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private urlHelper: UrlHelperService,
    private location: Location,
    private categoryService: CategoryService,
    private assetService: AssetService,
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private groupService: GroupService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    private readonly customDatePipe: CustomDatePipe
  ) {
    this.title = this.route.snapshot.paramMap.get('title');
    this.incidentId = this.route.snapshot.paramMap.get('id');

    this.id = this.route.snapshot.params['tid'];

    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  async loadIncidents(incidentId?: number, subject?: string) {
    const {content} = await this.incidentsService
      .getIncidentsByFilterQuery(this.incidentsPageNumber, {sr: incidentId, subject, status: 1})
      .pipe(map((r) => r.result))
      .toPromise<{ content: any[]; totalElements: number }>();
    this._incidents = [...this._incidents, ...content];
    this.incidents$.next(this._incidents);
    this.incidentsCompleted = content.length === 0;
  }

  async getNextIncidents() {
    // load opened incidents only and not show closed incidents.
    await this.loadIncidents(null, this.incidentSearchCtrl?.value);
    this.incidentsPageNumber++;
  }

  filterIncidents() {
    this.filterIncidentsThrottel.next();
  }

  back() {
    this.location.back();
  }

  initAssets() {
    this.assetsPageNumber = 0;
    this.totalAssets = 0;
    this.assetsStore.next([]);
    this.assets = [];
  }

  async getAssets() {
    if (this.orgId) {
      const page = await this.incidentsService
        .getAssetsByCategoryId(
          this.orgId,
          {id: this.categoryId},
          this.assetsPageNumber,
          this.limit
        )
        .pipe(
          tap((r) => {
            this.totalAssets = r.result.totalElements;
          }),
          map((r) => r.result.content)
        )
        .toPromise();
      this.assets = [...this.assets, ...page];
      this.assetsStore.next(this.assets);
      this.assetsOffset += this.limit;
    }
  }

  async getNextAssets() {
    this.assetsPageNumber++;
    await this.getAssets();
  }

  initAssigne() {
    this.assignePageNumber = 0;
    this.assigneList = [];
    this.completeAssigne = false;
    this.completeGroups = false;
    this.completeUsers = false;
  }

  async getAssigne() {
    if (this.incidentId) {
      await (this.completeUsers
          ? of({result: {content: []}})
          : this.userService.getAll(
            this.assigneSearchCtrl.value,
            this.assignePageNumber
          )
      )
        .pipe(
          tap((res) => {
            this.completeUsers = res.result.content.length === 0;
          }),
          map((r2) => {
            return r2.result.content.map((u) => {
              return {
                id: u?.id,
                uid: `${u?.id}_user`,
                type: 'user',
                nameAr: u.nameAr,
                nameEn: u.nameEn,
              };
            });
          }),
          catchError((_) => of([])),
          switchMap((users) => {
            return this.completeGroups
              ? of([])
              : this.groupService
                .getAllNonGlobal(
                  this.assigneSearchCtrl.value,
                  this.assignePageNumber
                )
                .pipe(
                  tap((res) => {
                    this.completeGroups = res.result.content.length === 0;
                  }),
                  map((res) => {
                    return [
                      ...users,
                      ...res.result.content.map((g) => {
                        return {
                          id: g.id,
                          uid: `${g?.id}_group`,
                          type: 'group',
                          nameAr: g.nameAr,
                          nameEn: g.nameEn,
                        };
                      }),
                    ];
                  }),
                  catchError((_) => of([...users]))
                );
          }),
          tap((list) => {
            this.completeAssigne = list?.length === 0;
          }),
          tap((res) => {
            const filterd =
              this.assignePageNumber > 0
                ? []
                : this.orgList.filter(
                  (a) =>
                    a?.nameEn
                      ?.toLowerCase()
                      ?.indexOf(
                        this.assigneSearchCtrl.value?.toLowerCase()
                      ) >= 0 ||
                    a?.nameAr
                      ?.toLowerCase()
                      ?.indexOf(
                        this.assigneSearchCtrl.value?.toLowerCase()
                      ) >= 0
                );
            this.assigneList = [...this.assigneList, ...filterd, ...res];
            this.assigneStore.next(this.assigneList);
          })
        )
        .toPromise();
    }
  }

  async getNextAssigne() {
    this.assignePageNumber++;
    await this.getAssigne();
  }

  filterAssigned() {
    this.filterAssignedThrottle.next();
  }

  async ngOnInit() {
    this.lang = this.translationService.getSelectedLanguage();
    this.filterAssignedThrottle$.subscribe(async (_) => {
      this.initAssigne();
      await this.getAssigne();
    });

    this.filterIncidentsThrottel$.subscribe(async () => {
      this.incidentsPageNumber = 0;
      this._incidents = [];
      this.incidentsCompleted = false;
      await this.getNextIncidents();
    });

    if (this.incidentId) {
      await this.loadIncidents(this.incidentId, null);
      this.incidentsPageNumber++;
    } else {
      await this.getNextIncidents();
    }

    this.createForm();

    const sub = this.formGroup.get('category').valueChanges.subscribe((v) => {
      this.categoryId = v;
      this.initAssets();
      this.getAssets();
    });

    this.subscription = [...this.subscription, sub];

    this.formGroup.get('taskType').valueChanges.subscribe((v) => {
      if (v === 2) {
        this.formGroup.get('assets')?.setValidators([Validators.required]);
      } else {
        this.formGroup.get('assets')?.setValidators([]);
        this.formGroup.get('qty')?.setValidators([]);
      }
      this.formGroup.get('assets')?.updateValueAndValidity();
      this.formGroup.get('qty')?.updateValueAndValidity();
    });

    this.formGroup.get('assigned').valueChanges.subscribe((v) => {
      if (v && this.task && v.split('_')[1] !== this.task?.assignTo?.type) {
        this.formGroup.get('assigned').setErrors({notSameType: true});
        this.cd.detectChanges();
        return;
      }
      if (v) {
        const uid = v.split('_');
        this.orgId = uid[1] === 'org' ? uid[0] : null;
      } else {
        this.orgId = null;
      }
      this.initAssets();
      this.getAssets();
    });
    this.formGroup.get('assets').valueChanges.subscribe(value => {
      if (value) {
        this.changeMinMax(value);
      }
    });

    if (this.id) {
      this.loading = true;

      await this.incidentsService
        .viewTask(this.id)
        .pipe(
          tap(async (data) => {
            this.task = data?.result;

            this.incidentId = data?.result?.incidentId;
            this.isAdmin = !!data?.result?.admin;
            this.formGroup.patchValue({
              incidentType: parseInt(data.result.incidentId),
              title: data.result.title,
              priority: data.result.priorityId,
              taskType: data.result.taskType.typeId,
              Assignedto: data.result.assignTo.type,

              assigned:
                data.result.assignTo.assigneeId +
                '_' +
                data.result.assignTo.type,
              assets: parseInt(data.result.taskType.asset?.id),
              date: this.datePipe.transform(this.customDatePipe.transform(data.result.dueDate),
                'yyyy-MM-ddThh:mm:ss.SSS'),
              status: data.result.statusId,
              modifiable: data.result?.modifiable,
              qty: data.result.taskType.requestQuantity,
              body: data.result.body,
              details: data.result.taskType.desc,
              Pqty: data.result.taskType.provisionedQuantity,
              featureName: data.result.featureName,
            });
            this.getFiles();
            this.formGroup
              .get('category')
              .patchValue(data.result?.taskType?.asset?.assetsCategory?.id);
          })
        )
        .toPromise();
      const incid = await this.incidentsService
        .getIncidentsByFilterQuery(0, {sr: this.incidentId})
        .pipe(map((res) => res?.result?.content[0]))
        .toPromise();

      if (
        !!incid?.subject &&
        this.incidentSearchCtrl.value !== incid?.subject
      ) {
        this.incidentSearchCtrl.patchValue(incid?.subject);
        this.filterIncidents();
      }

      this.cd.detectChanges();
    }

    await this.loadAssignList(this.incidentId);

    this.loading = false;

    // file uploader config
    this.afuConfig = {
      multiple: true,
      formatsAllowed: '.jpg,.png,.pdf,.docx, .txt,.gif,.jpeg',
      maxSize: '2',
      uploadAPI: {
        url: `${environment.apiUrl}/dms/upload`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        params: {recordId: '', tagId: 4},
        responseType: 'json',
      },
      theme: 'dragNDrop',
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: false,
      replaceTexts: {
        selectFileBtn: this.translationService.get('SHARED.SELECT_FILES'),
        resetBtn: this.translationService.get('SHARED.RESET'),
        uploadBtn: this.translationService.get('SHARED.UPLOAD'),
        dragNDropBox: this.translationService.get('SHARED.DRAG_N_DROP'),
        attachPinBtn: this.translationService.get('SHARED.ATTACH_FILES'),
        afterUploadMsg_success: this.translationService.get(
          'SHARED.SUCCESS_UPLOAD'
        ),
        afterUploadMsg_error: this.translationService.get(
          'SHARED.FAILD_UPLOAD'
        ),
        sizeLimit: this.translationService.get('SHARED.SIZE_LIMIT'),
      },
    };
  }

  async loadAssignList(incidentId) {
    this.initAssigne();
    this.incidentId = incidentId;
    if (incidentId) {
      await this.groupService
        .getAllNonGlobal()
        .pipe(
          map((r1) => r1.result),
          catchError((_) => of({content: [], totalElements: 0})),
          switchMap((groups) =>
            this.userService.getAll().pipe(
              map((r2) => {
                return {
                  users: r2.result.content,
                  groups: groups.content,
                  groupsCount: groups.totalElements,
                  usersCount: r2.totalElements,
                };
              }),
              catchError((_) =>
                of({
                  users: [] as any,
                  groups: groups.content,
                  groupsCount: groups.totalElements,
                  usersCount: 0 as any,
                })
              ),
              switchMap((r) =>
                this.incidentsService.getIncidentOrgs(incidentId).pipe(
                  catchError((_) => of({result: []})),
                  map((r3) => {
                    let list = (r3.result as any[]).map((o) => {
                      return {
                        id: o?.orgStructure?.id,
                        uid: `${o?.orgStructure?.id}_org`,
                        type: 'org',
                        nameAr: o?.orgStructure?.nameAr,
                        nameEn: o?.orgStructure?.nameEn,
                      };
                    });

                    list = list.concat(
                      (r.users as any[]).map((u) => {
                        return {
                          id: u?.id,
                          uid: `${u?.id}_user`,
                          type: 'user',
                          nameAr: u.nameAr,
                          nameEn: u.nameEn,
                        };
                      })
                    );

                    list = list.concat(
                      (r.groups as any[]).map((g) => {
                        return {
                          id: g.id,
                          uid: `${g?.id}_group`,
                          type: 'group',
                          nameAr: g.nameAr,
                          nameEn: g.nameEn,
                        };
                      })
                    );
                    this.orgList = list.filter((a) => a.type === 'org');

                    return list;
                  })
                )
              )
            )
          ),
          catchError((err) => of([])),
          tap(async (res) => {
            this.assigneList = [];
            this.assigneList = [...this.assigneList, ...res];
            this.assigneStore.next(this.assigneList);
            const assigned = this.formGroup.get('assigned').value as string;
            if (assigned && !this.assigneList.find((a) => a.uid === assigned)) {
              const uid = assigned.split('_');
              switch (uid[1]) {
                case 'user':
                  try {
                    const user = await this.userService
                      .getById(uid[0])
                      .pipe(map((res) => res.result))
                      .toPromise();
                    this.assigneSearchCtrl.patchValue(
                      this.lang === 'ar' ? user.nameAr : user.nameEn
                    );
                    this.filterAssigned();
                  } catch {
                  }
                  break;
                case 'group':
                  try {
                    const group = await this.groupService
                      .getById(uid[0])
                      .pipe(map((res) => res.result))
                      .toPromise();
                    this.assigneSearchCtrl.patchValue(
                      this.lang === 'ar' ? group.nameAr : group.nameEn
                    );
                    this.filterAssigned();
                  } catch {
                  }
                  break;
              }
            }
          })
        )
        .toPromise();
    }
  }

  onNewLocationChange(event) {
    this.mapService
      .openMap({
        mapType: MapViewType.TASK,
        zoomModel: {
          referenceId: this.task?.id,
          featureName: this.task?.featureName,
        },
        showLayers: false,
      })
      .subscribe((response) => {
        this.addLocationToMapFunc = response?.ff;
        this.formGroup.get('featureName').patchValue(response?.gType);
        if (response) {
          this.formGroup.get('newLocation').patchValue(true);
        }
        this.cd.detectChanges();
      });
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskType: [null, [Validators.required]],
      assigned: [null, [Validators.required]],
      assets: [null],
      date: [new Date(), [Validators.required]],
      status: [null],
      qty: [
        null,
        [
          Validators.max(1000),
          Validators.min(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      Pqty: [null],
      category: [null],
      newLocation: [false],
      modifiable :[true],
      featureName: [null],
      body: [null, [Validators.required]],
      details: [null],
      incidentType: [
        !this.incidentId ? null : parseInt(this.incidentId),
        [Validators.required],
      ],
    });
    this.cd.detectChanges();
  }

  getAssetMaxQuantity(assetId: number) {
    const asset = this.assets.find((value) => value.id == assetId);
    if (!asset) {
      return 1000;
    }

    return asset.quantity;
  }

  changeMinMax(assetId: any) {
    const maxQuantity = this.getAssetMaxQuantity(assetId);
    const quantity = this.formGroup.get('qty');
    const provisionedQuantity = this.formGroup.get('Pqty');
    quantity?.setValidators([
      Validators.required,
      Validators.max(maxQuantity),
      Validators.min(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);

    provisionedQuantity?.setValidators([
      Validators.max(maxQuantity),
      Validators.min(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]);
    quantity.updateValueAndValidity();
    provisionedQuantity.updateValueAndValidity();
  }

  download(att) {
    this.urlHelper.download(att);
  }

  async onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.post = this.formGroup.value;
    let assign = this.assigneList?.find((a) => a?.uid === this.post.assigned);
    if (!assign && this.post.assigned) {
      // check if form group has assign.
      const assignTo = this.post.assigned.toString().split('_');
      assign = {
        id: parseInt(assignTo[0]),
        type: assignTo[1],
      };
    }
    const body = {
      assignTo: {
        assigneeId: assign?.id,
        type: assign?.type,
      },
      body: this.post.body,
      dueDate: this.post.date,
      incidentId: parseInt(this.incidentId),
      featureName: this.post.featureName,
      priorityId: this.post.priority,
      statusId: this.post.status ?? 2,
      taskType: {
        typeId: this.post.taskType,
        type: this.taskTypes
          .find((t) => t.id === this.post.taskType)
          ?.nameEn?.toLowerCase(),
        requestQuantity: this.post.qty,
        asset: {
          id: this.post.assets,
        },
        desc: this.post.details,
        provisionedQuantity: this.id ? parseInt(this.post.Pqty ?? 0) : 0,
      },
      title: this.post.title,
      modifiable : this.post?.modifiable,
    };
    if (this.post.taskType !== 2) { 
      delete body.taskType.asset;
      delete body.taskType.requestQuantity;
      delete body.taskType.provisionedQuantity;
    }

    try {
      const commonData = JSON.parse(localStorage.getItem('commonData'));
      const currentOrg = commonData['currentOrgDetails'];
      this.submitting$.next(true);
      if (this.id) {
        await this.incidentsService.updateTask(body, this.id).toPromise();
        this.alertService.openSuccessSnackBar();
        this.router.navigate(['/incidents/tasks/outgoing']);

        if (this.addLocationToMapFunc) {
          const priority = this.priorities.find(
            (p) => p.id == body?.priorityId
          );
          const type = this.taskTypes.find((t) => t.id == this.post.taskType);
          await this.addLocationToMapFunc({
            refId: this.id,
            title: body?.title,
            orgName: currentOrg?.code,
            levelId: 1,
            priorityId: `${priority?.nameAr ?? ''} / ${priority?.nameEn ?? ''}`,
            dueDate: this.datePipe.transform(
              DateTimeUtil.getUtcFromIncorrectUtC(new Date(body?.dueDate)),
              'yyyy-MM-dd HH:mm:ss'
            ),
            type: `${type?.nameAr ?? ''} / ${type?.nameEn ?? ''}`,
            inc_ref_id: body.incidentId,
          });
        } else {
          let layer;
          switch (this.task?.featureName) {
            case MapActionType.TASK_POINT:
              layer = await this.mapService.getTaskPointLayer();
              break;
            case MapActionType.TASK_POLYLINE:
              layer = await this.mapService.getTaskLineLayer();
              break;
            case MapActionType.TASK_POLYGON:
              layer = await this.mapService.getTaskPolygonLayer();
              break;
          }
          if (!body?.featureName) {
            if (this.task?.featureName) {
              // clear task locations from task layers
              if (layer) {
                const featureSet = await this.mapService.queryGraphic(
                  layer,
                  'task',
                  this.id
                );
                await this.mapService.applyEdits(
                  featureSet.features,
                  layer,
                  'deleteFeatures'
                );
              } else {
                const layers = [
                  await this.mapService.getTaskPointLayer(),
                  await this.mapService.getTaskLineLayer(),
                  await this.mapService.getTaskPolygonLayer(),
                ];
                for (const l of layers) {
                  const featureSet = await this.mapService.queryGraphic(
                    l,
                    'task',
                    this.id
                  );
                  await this.mapService.applyEdits(
                    featureSet.features,
                    l,
                    'deleteFeatures'
                  );
                }
              }
            }
          } else if (layer) {
            const featureSet = await this.mapService.queryGraphic(
              layer,
              'task',
              this.id
            );
            const graphics = featureSet?.features?.map((g) => {
              const priority = this.priorities.find(
                (p) => p.id == body?.priorityId
              );
              g.setAttribute(
                'PRIORITY',
                `${priority?.nameAr ?? ''} / ${priority?.nameEn ?? ''}`
              );
              g.setAttribute('NAME', body?.title);

              g.setAttribute(
                'DUE_DATE',
                this.datePipe.transform(
                  DateTimeUtil.getUtcFromIncorrectUtC(new Date(body?.dueDate)),
                  'yyyy-MM-dd HH:mm:ss'
                )
              );
              const type = this.taskTypes.find(
                (t) => t.id == this.post.taskType
              );
              g.setAttribute(
                'TASK_TYPE',
                `${type?.nameAr ?? ''} / ${type?.nameEn ?? ''}`
              );
              return g;
            });
            await this.mapService.applyEdits(graphics, layer, 'updateFeatures');
          }
        }
        await this.uploadFiles(this.id, false);
      } else {
        const task = await this.incidentsService
          .createTask(body)
          .pipe(map((r) => r?.result))
          .toPromise();
        if (this.addLocationToMapFunc) {
          const priority = this.priorities.find(
            (p) => p.id == body?.priorityId
          );
          const type = this.taskTypes.find((t) => t.id == this.post.taskType);
          await this.addLocationToMapFunc({
            refId: task?.id,
            title: task?.title,
            orgName: currentOrg?.code,
            levelId: 1,
            priorityId: `${priority?.nameAr ?? ''} / ${priority?.nameEn ?? ''}`,
            dueDate: this.datePipe.transform(
              DateTimeUtil.getUtcFromIncorrectUtC(new Date(body?.dueDate)),
              'yyyy-MM-dd HH:mm:ss'
            ),
            type: `${type?.nameAr ?? ''} / ${type?.nameEn ?? ''}`,
            inc_ref_id: body.incidentId,
          });
        }

        await this.uploadFiles(task?.id);
        this.alertService.openSuccessSnackBar();
      }
    } catch (error) {
      this.alertService.customFailureSnackBar(
        this.lang === 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar
      );
    }
    this.submitting$.next(false);
  }

  async uploadFiles(id: number, modifyEndpoint = true) {
    try {
      await this.filesList?.upload(id, modifyEndpoint);
      await this.router.navigate(['/incidents/tasks/outgoing']);
    } catch (error) {
      this.alertService.openFailureSnackBarWithMsg(
        this.lang === 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar
      );
    }
  }

  getFiles() {
    this.incidentsService.getTaskFiles(this.id).subscribe((r) => {
      this.attachments = r.result;
    });
  }


  getAssetMaxQuantityError() {
    const errors: any = this.formGroup.get('qty').errors;
    if (errors.required) {
      return this.translationService.get('SHARED.REQUIRED_FIELD');
    } else if (errors.max) {
      return this.translationService.getWithArgs('INCIDENTS.maxQuantity', {
        qty: errors.max.max,
      });
    } else if (errors.min) {
      return this.translationService.getWithArgs('INCIDENTS.minQuantity', {
        qty: errors.min.min,
      });
    }
    return '';
  }

  getMaxProvidedQuantityError() {
    const errors: any = this.formGroup.get('Pqty').errors;
    if (errors.required) {
      return this.translationService.get('SHARED.REQUIRED_FIELD');
    } else if (errors.max) {
      return this.translationService.getWithArgs('INCIDENTS.maxQuantity', {
        qty: errors.max.max,
      });
    } else if (errors.min) {
      return this.translationService.getWithArgs('INCIDENTS.minQuantity', {
        qty: errors.min.min,
      });
    }
    return '';
  }

  taskAssignedToValueChange($event: string) {
    if (!this.id) {
      // enable change in task type.
      this.formGroup.get('taskType')?.patchValue(null);
    }
  }


  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
