import { CommonModule } from "@angular/common";
import {
  Component,
  forwardRef,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";

import { MatSelectInfiniteScrollModule } from "ng-mat-select-infinite-scroll";

import { BehaviorSubject, of, Subject, Subscription } from "rxjs";
import { auditTime, catchError, map, switchMap, tap } from "rxjs/operators";

import { TranslationModule } from "src/app/modules/i18n/translation.module";
import { TranslationService } from "src/app/modules/i18n/translation.service";

import { MaterialModule } from "../../material.module";
import { GroupService } from "../../../core/api/services/group.service";
import { OrgService } from "../../../core/api/services/org.service";
import { UserService } from "../../../core/api/services/user.service";

@Component({
  selector: "app-oug-input",
  templateUrl: "./oug-input.component.html",
  styleUrls: ["./oug-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OugInputComponent),
      multi: true,
    },
  ],
})
export class OugInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() waitLabel: string = "";
  @Input() noDataLabel: string = "";
  @Input() incidentId: number;
  @Input() required = false;

  @Input() searchPlaceholder: string = "";
  @Input() appearance: string = "outline";

  @ViewChild("searchInput") searchInput;
  @Input() taskMode: boolean = false;

  public lang = "en";
  constructor(
    private orgService: OrgService,
    private userService: UserService,
    private groupService: GroupService,
    private translationService: TranslationService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  control: FormControl = new FormControl();
  onChange: any = () => {};

  onTouch: any = () => {};

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  value: any;
  writeValue(obj: any): void {
    if(!obj){
      this.searchCtrl.setValue('')
      this.filterAssigned('')
    }
    this.value = obj;
    this.control.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  disabled: boolean;
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.control.disable() : this.control.enable();
  }

  private filterAssignedThrottel = new Subject();
  private filterThrottel$ = this.filterAssignedThrottel
    .asObservable()
    .pipe(auditTime(1500));
  filterAssigned(txt) {
    this.filterAssignedThrottel.next();
  }

  pageNumber = 0;
  complete = false;
  loading = false;
  private list = [];
  searchCtrl: FormControl = new FormControl();
  private store = new BehaviorSubject(this.list);
  list$ = this.store.asObservable();
  private completeUsers = false;
  private completeGroups = false;
  private orgList = [];

  async loadPage(page: number) {
    this.loading =true;
    await (this.completeUsers
      ? of({ result: { content: [] } })
      : this.userService.getAll(this.searchCtrl.value, page)
    )
      .pipe(
        tap((res) => {
          this.completeUsers = res.result.content.length == 0;
    this.loading =false;

        }),
        map((r2) => {
          let users = r2.result.content.map((u) => {
            return {
              id: u?.id,
              uid: `${u?.id}_user`,
              type: "user",
              nameAr: u.nameAr,
              nameEn: u.nameEn,
            };
          });
          return users;
        }),
        catchError((_) => of([])),
        switchMap((users) => {
          return this.completeGroups
            ? of([])
            : this.groupService
                .getAllNonGlobal(this.searchCtrl.value, page)
                .pipe(
                  tap((res) => {
                    this.completeGroups = res.result.content.length == 0;
                  }),
                  map((res) => {
                    return [
                      ...users,
                      ...res.result.content.map((g) => {
                        return {
                          id: g.id,
                          uid: `${g?.id}_group`,
                          type: "group",
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
          this.complete = list?.length == 0;
        }),
        tap((res) => {
          const filterd =
            page > 0
              ? []
              : this.orgList.filter(
                  (a) =>
                    a?.nameEn
                      ?.toLowerCase()
                      ?.indexOf(this.searchCtrl.value?.toLowerCase()) >= 0 ||
                    a?.nameAr
                      ?.toLowerCase()
                      ?.indexOf(this.searchCtrl.value?.toLowerCase()) >= 0
                );
          this.list = [...this.list, ...filterd, ...res];
          this.store.next(this.list);
        })
      )
      .toPromise();
    this.loading =false;
     

  }

  initPagination() {
    this.pageNumber = 0;
    this.list = [];
    this.complete = false;
    this.completeGroups = false;
    this.completeUsers = false;
  }

  async _firstPage() {
    this.initPagination();
    if (this.taskMode && !this.incidentId) return;

    await this.groupService
      .getAllNonGlobal()
      .pipe(
        map((r1) => r1.result),
        catchError((_) => of({ content: [], totalElements: 0 })),
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
              (this.taskMode
                ? this.orgService.getIncidentOrgs(this.incidentId)
                : this.orgService.getAll()
              ).pipe(
                catchError((_) => of({ result: [] })),
                map((r3) => {
                  let list = (<any[]>r3.result).map((o) => {
                    if (o?.orgStructure) {
                      return {
                        id: o?.orgStructure?.id,
                        uid: `${o?.orgStructure?.id}_org`,
                        type: "org",
                        nameAr: o?.orgStructure?.nameAr,
                        nameEn: o?.orgStructure?.nameEn,
                      };
                    } else {
                      return {
                        id: o?.id,
                        uid: `${o?.id}_org`,
                        type: "org",
                        nameAr: o?.nameAr,
                        nameEn: o?.nameEn,
                      };
                    }
                  });

                  list = list.concat(
                    (<any[]>r.users).map((u) => {
                      return {
                        id: u?.id,
                        uid: `${u?.id}_user`,
                        type: "user",
                        nameAr: u.nameAr,
                        nameEn: u.nameEn,
                      };
                    })
                  );

                  list = list.concat(
                    (<any[]>r.groups).map((g) => {
                      return {
                        id: g.id,
                        uid: `${g?.id}_group`,
                        type: "group",
                        nameAr: g.nameAr,
                        nameEn: g.nameEn,
                      };
                    })
                  );
                  this.orgList = list.filter((a) => a.type == "org");

                  return list;
                })
              )
            )
          )
        ),
        catchError((err) => of([])),
        tap(async (res) => {
          this.list = [];
          this.list = [...this.list, ...res];
          this.store.next(this.list);
          const assigned = this.control.value as string;
          if (assigned && !this.list.find((a) => a.uid == assigned)) {
            const uid = assigned.split("_");
            switch (uid[1]) {
              case "user":
                try {
                  const user = await this.userService
                    .getById(uid[0])
                    .pipe(map((res) => res.result))
                    .toPromise();
                  this.searchCtrl.patchValue(
                    this.lang == "ar" ? user.nameAr : user.nameEn
                  );
                  this.filterAssigned("");
                } catch {}
                break;
              case "group":
                try {
                  const group = await this.groupService
                    .getById(uid[0])
                    .pipe(map((res) => res.result))
                    .toPromise();
                  this.searchCtrl.patchValue(
                    this.lang == "ar" ? group.nameAr : group.nameEn
                  );
                  this.filterAssigned("");
                } catch {}
                break;
              default:
                break;
            }
          }
        })
      )
      .toPromise();
  }

  async _nextPage() {
    this.pageNumber++; 
    await this.loadPage(this.pageNumber);
   
  }
  async ngOnInit() {
    let sub = this.filterThrottel$.subscribe(async (_) => {
      this.initPagination();
      await this.loadPage(this.pageNumber);
    });
    this.subscriptions.push(sub);
    await this._firstPage();
    sub = this.control.valueChanges.subscribe(this.onChange);
    this.subscriptions.push(sub);
  }
}

@NgModule({
  declarations: [OugInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    MatSelectInfiniteScrollModule,
  ],
  exports: [OugInputComponent],
})
export class OugInputModule {}
