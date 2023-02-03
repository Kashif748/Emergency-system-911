import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { ModulesService } from 'src/app/_metronic/core/services/modules.service';
import { RoleService } from '@core/api/services/role.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { IStorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public lang = 'en';
  private role;
  public orgs$: Observable<any>;
  public id: any;
  public modules$ = new BehaviorSubject<any[]>(null);
  public loading = false;
  private subscriptions: Subscription[] = [];

  privilegesErrMsg = false;
  flatedModules = [];
  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
    private modulesService: ModulesService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private alertService: AlertsService,
    private storageService: IStorageService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();
    let assignedPrivs: any[] = [];
    if (this.id) {
      this.role = await this.roleService
        .getById(this.id)
        .pipe(map((r) => r.result))
        .toPromise();
      assignedPrivs = this.role.privileges;
      await this.getPrivileges(this.role.orgId?.id ?? 2);

      this.form.patchValue({
        ...this.role,
        orgId: this.role.orgId?.id ?? 2,
        isPublic: !this.role.orgId,
      });
    }
    let currentOrg =
      this.storageService.getItem('commonData')?.currentOrgDetails;
    this.orgs$ = this.roleService
      .getOrgById(currentOrg?.id)
      .pipe(map((r) => r.result));
  }
  checkParent(e, p, id) {
    if (e?.checked && p?.parent) {
      this.form
        .get('privileges')
        .get(`${id}`)
        .get(`${p.parent?.id}`)
        .setValue(true);
    }
    if (e.checked == false) {
      let parents = [];
      for (let el of this.flatedModules) {
        if (el.privileges.length) {
          for (let pr of el.privileges) {
            if (pr?.parent) {
              if (pr?.parent?.id == p.id) {
                parents.push({ prId: pr.id, mid: el?.module?.id });
              }
            }
          }
        }
      }

      for (let item of parents) {
        this.form
          .get('privileges')
          .get(`${item.mid}`)
          .get(`${item.prId}`)
          .setValue(false);
      }
    }
  }
  createForm() {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      desEn: ['', Validators.required],
      desAr: ['', Validators.required],
      orgId: [null, Validators.required],
      isPublic: false,
      isActive: true,
      inherited: false,
      privileges: this.fb.group({}),
    });
  }

  initPrivsForm(allModules) {
    const assignedPrivs = this.role?.privileges as any[];
    for (let m of allModules) {
      let privsGroup = this.form.get('privileges') as FormGroup;

      privsGroup.setControl(`${m.module.id}`, this.fb.group({}));
      let moduleGroup = this.form
        .get('privileges')
        .get(`${m.module.id}`) as FormGroup;

      for (let p of m.privileges) {
        moduleGroup.setControl(
          p.id,
          new FormControl(!!assignedPrivs?.find((pr) => pr.id == p.id))
        );
      }
    }
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    let privileges = [];
    Object.keys(this.form.value.privileges)
      .map((key) => this.form.value.privileges[key])
      .forEach((m) => {
        Object.keys(m).forEach((k) => {
          if (m[k]) {
            privileges = [...privileges, { id: k }];
          }
        });
      });

    if (privileges.length == 0) {
      this.privilegesErrMsg = true;
      return;
    } else {
      this.privilegesErrMsg = false;
    }
    try {
      if (this.id) {
        await this.roleService
          .update({
            ...this.role,
            ...this.form.value,
            inherited: this.form.get('inherited').value ? 1 : 0,
            privileges: privileges,
          })
          .toPromise();
      } else {
        await this.roleService
          .create({
            ...this.form.value,
            inherited: this.form.get('inherited').value ? 1 : 0,
            privileges: privileges,
          })
          .toPromise();
      }
      this.alertService.openSuccessSnackBar();
      this.router.navigate(['user-management/roles']);
    } catch {
      this.alertService.openFailureSnackBar();
    }
  }

  getPrivileges(id) {
    this.loading = true;
    let sub = this.modulesService.getByOrgId(id).subscribe(
      (modules) => {
        this.loading = false;
        this.flatedModules = [];
        this.flatModules(modules, this.flatedModules);
        this.initPrivsForm(this.flatedModules);
        this.modules$.next(this.flatedModules);
      },
      (error) => {
        this.loading = false;
        this.alertService.openFailureSnackBarWithMsg(
          this.lang == 'en'
            ? error?.error?.error?.messagEn
            : error?.error?.error?.messageAr
        );
      }
    );
    this.subscriptions.push(sub);
  }

  flatModules(
    modulesArr: { children: any[]; module: any; privileges: any }[],
    acc: any[]
  ) {
    modulesArr.forEach((m) => {
      if (m.privileges) {
        acc.push({ module: m.module, privileges: m.privileges });
      }
      if (Object.getOwnPropertyNames(m).includes('children')) {
        m.children.forEach((sm) => {
          this.flatModule(sm, acc);
        });
      }
    });
  }

  flatModule(m: { children: any[]; module: any; privileges: any }, acc: any[]) {
    if (m.privileges) {
      acc.push({ module: m.module, privileges: m.privileges });
    }
  }

  getcamelCase(name: string): string {
    return name && name.split(' ').join('').toLowerCase();
  }
}
