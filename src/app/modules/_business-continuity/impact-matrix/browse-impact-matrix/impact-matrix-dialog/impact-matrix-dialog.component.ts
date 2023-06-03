import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GenericValidators} from "@shared/validators/generic-validators";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ImpactMatrixAction, UserState} from "@core/states";
import {Select, Store} from "@ngxs/store";
import {IAuthService} from "@core/services/auth.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ActivatedRoute} from "@angular/router";
import {FormUtils} from "@core/utils/form.utils";
import {BrowseImpactMatrixAction} from "../../states/browse-impact-matrix.action";
import {ImpactMatrixState} from "@core/states/bc/impact-matrix/impact-matrix.state";
import {ImpactLevelState} from "@core/states/bc/impact-level/impact-level.state";
import {BcImpactLevel} from "../../../../../api/models/bc-impact-level";
import {BcImpactMatrixDto} from "../../../../../api/models/bc-impact-matrix-dto";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-impact-matrix-dialog',
  templateUrl: './impact-matrix-dialog.component.html',
  styleUrls: ['./impact-matrix-dialog.component.scss']
})
export class ImpactMatrixDialogComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;
  public dynamicFields$: Observable<BcImpactLevel[]>;

  @Select(ImpactMatrixState.blocking)
  blocking$: Observable<boolean>;

  public display = false;
  form: FormGroup;

  _Id: number;
  get loggedinUserId() {
    return this.auth.getClaim('sub');
  }
  get editMode() {
    return this._Id !== undefined && this._Id !== null;
  }

  destroy$ = new Subject();

  @Input()
  set Id(v: number) {
    this._Id = v;
    this.buildForm();
    if (v === undefined || v === null) {
      return;
    }

    this.store
      .dispatch(new ImpactMatrixAction.GetImpactMatrix({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ImpactMatrixState.impactMatrix)),
        takeUntil(this.destroy$),
        take(1),
        tap((impactMatrix) => {
          const sortedImpactMatrix = impactMatrix.bcImpactLevelMatrixDtoList?.slice().sort((a, b) => {
            return a.id - b.id;
          });
          const levelsControl = this.form.get('bcImpactLevelMatrixDtoList') as FormArray;
          let levelsControlIndex = -1;
          const levelFormGroups = sortedImpactMatrix?.map((level) => {
            levelsControlIndex = levelsControl.controls.findIndex(control => control.get('id').value === level.id);
            if (levelsControlIndex !== -1) {
              // Level found in levelsControl
              const control = levelsControl.at(levelsControlIndex);
              if (control) {
                control.patchValue({
                  descAr: level.descAr,
                  descEn: level.descEn
                });
                // levelsControlIndex++;
              }
            }

          });
        })
      )
      .subscribe(() => {
        this.store
          .select(ImpactMatrixState.impactMatrix)
          .pipe(take(1))
          .subscribe((impactMatrix) => {
            this.form.patchValue({
              typeEn: impactMatrix.bcImpactTypes.nameEn,
              typeAr: impactMatrix.bcImpactTypes.nameAr,
              isActive: impactMatrix.bcImpactTypes.isActive
            });
          });
      });
  }

  constructor(
    private formBuilder: FormBuilder,
    private lang: ILangFacade,
    private store: Store,
    private route: ActivatedRoute,
    private auth: IAuthService,
    private translate: TranslateService,
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.Id = id;
      });

    this.viewOnly$ = this.route.queryParams.pipe(
      map((params) => params['_mode'] === 'viewonly'),
      tap((v) => {
        if (this.form) {
          try {
            if (v) {
              this.form.disable();
            } else {
              this.form.enable();
            }
          } catch {}
        }
      })
    );
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
    this.buildForm();
  }

  dynamicForm() {
    const levelsArray = this.form.get('bcImpactLevelMatrixDtoList') as FormArray;
    this.store.select(ImpactLevelState.page).pipe(filter((p) => !!p),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      tap((sortedArray) => {
        levelsArray.clear();
        sortedArray.forEach((v) => {
          if (v.isActive) {
            levelsArray.push(this.createLevelFormGroup(v));
          }
        });

      })
    ).subscribe();
  }

  createLevelFormGroup(levels): FormGroup {
    return this.formBuilder.group({
      id: levels.id,
      label: this.translate.currentLang === 'en' ? levels.nameEn : levels.nameAr,
      descAr: ['', [Validators.required, GenericValidators.arabic]], // Add validation as needed
      descEn: ['', [Validators.required, GenericValidators.english]] // Add validation as needed
    });
  }

  openDialog(Id?: number) {
    this.store.dispatch(new BrowseImpactMatrixAction.ToggleDialog({ id: Id }));
  }

  buildForm() {
    this.form = this.formBuilder.group({
       typeEn: [null, [Validators.required, GenericValidators.english]],
       typeAr: [null, [Validators.required, GenericValidators.arabic]],
      bcImpactLevelMatrixDtoList:  this.formBuilder.array( []) ,
      isActive: [true]
    });
    this.dynamicForm();
  }

  getLevelsControls(): AbstractControl[] {
    return (this.form.get('bcImpactLevelMatrixDtoList') as FormArray).controls;
  }

  close() {
    this.store.dispatch(new BrowseImpactMatrixAction.ToggleDialog({}));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }

    const impactMartixForm = {
      ...this.form.getRawValue(),
    };

    const impactMatrix: BcImpactMatrixDto = {
      bcImpactLevelMatrixDtoList: [],
      bcImpactTypes: {}
    }

    impactMatrix.bcImpactLevelMatrixDtoList = impactMartixForm.bcImpactLevelMatrixDtoList;
    impactMatrix.bcImpactTypes.isActive = impactMartixForm.isActive;
    impactMatrix.bcImpactTypes.nameAr = impactMartixForm.typeAr;
    impactMatrix.bcImpactTypes.nameEn = impactMartixForm.typeEn;

    if (this.editMode) {
      impactMatrix.bcImpactTypes.id = this._Id;
      this.store.dispatch(new BrowseImpactMatrixAction.UpdateImpactMatrix(impactMatrix));
    } else {
      this.store.dispatch(new BrowseImpactMatrixAction.CreateImpactMatrix(impactMatrix));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
