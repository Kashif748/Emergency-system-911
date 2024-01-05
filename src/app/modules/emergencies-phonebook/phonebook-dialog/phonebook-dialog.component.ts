import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PhonebookAction } from '@core/states/phonebook/phonebook.action';
import { PhonebookState } from '@core/states/phonebook/phonebook.state';
import { FormUtils } from '@core/utils/form.utils';
import { Select, Store } from '@ngxs/store';
import { GenericValidators } from '@shared/validators/generic-validators';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { IdNameProjection } from 'src/app/api/models';
import { BrowsePhonebookAction } from '../states/browse-phonebook.action';

@Component({
  selector: 'app-phonebook-dialog',
  templateUrl: './phonebook-dialog.component.html',
  styleUrls: ['./phonebook-dialog.component.scss'],
})
export class PhonebookDialogComponent implements OnInit, AfterViewInit {
  @Input() orgs: IdNameProjection[];
  externalsOrgs: any[];
  phonebookTypes = [];

  opened$: Observable<boolean>;
  form: FormGroup;
  destroy$ = new Subject();
  _phonebook: number;

  @Select(PhonebookState.blocking)
  blocking$: Observable<boolean>;

  @Input()
  set phonebookId(v: number) {
    this._phonebook = v;
    this.createForm();
    if (v === undefined || v === null) {
      return;
    }
    this.store
      .dispatch(new PhonebookAction.GetPhonebook({ id: v }))
      .pipe(
        switchMap(() => this.store.select(PhonebookState.phonebook)),
        takeUntil(this.destroy$),
        take(1),
        tap((phonebook) => {
          console.log(phonebook);

          this.form.patchValue(phonebook);
        })
      )
      .subscribe();
  }
  get editMode() {
    return this._phonebook !== undefined && this._phonebook !== null;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.phonebookId = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened')
    );
  }
  ngAfterViewInit(): void {
    this.phonebookTypes = [
      {
        icon: 'pi pi-bars',
        name: 'PHONEBOOK.EXTERNAL',
        value: false,
      },
      {
        icon: 'pi pi-th-large',
        name: 'PHONEBOOK.INTERNAL',
        value: true,
      },
    ];
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      orgName: [null, [Validators.required]],
      orgStructure: [null, [Validators.required]],
      jobTitle: [null],
      phoneNumber: [null, [Validators.pattern(/^-?([0-9]\d*)?$/)]],
      mobileNumber: [null, [Validators.required]],
      title: [null],
      notes: [null],
      isInternal: [true, [Validators.required]],
      isActive: [true, [Validators.required]],
      id: 0,
    });
  }
  close() {
    this.store.dispatch(new BrowsePhonebookAction.ToggleDialog({}));
  }
  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }
    let phonebook = {
      ...this.form.value,
    };
    const isInternal = this.form.get('isInternal');
    if (isInternal) {
      phonebook['orgStructure'] = {
        orgId: this.form.get('orgStructure').value?.id,
      };
      phonebook['orgName'] = this.form.get('org').value?.nameAr;
    }

    phonebook.mobileNumber = phonebook.mobileNumber?.number;
    phonebook.id = this._phonebook;
    return;
    if (this.editMode) {
      this.store.dispatch(new BrowsePhonebookAction.UpdatePhonebook(phonebook));
    } else {
      this.store.dispatch(new BrowsePhonebookAction.CreatePhonebook(phonebook));
    }
  }

  // onSubmit() {
  //   let newItem = {
  //     ...this.form.value,
  //     mobileNumber: this.form.get('mobileNumber').value?.number,
  //   };

  //   if (this.form.invalid) {
  //     return;
  //   }
  //   if (this.isAddMode) {
  //     this.createItem(newItem);
  //   } else {
  //     this.updateItem(newItem);
  //   }
  // }
}
