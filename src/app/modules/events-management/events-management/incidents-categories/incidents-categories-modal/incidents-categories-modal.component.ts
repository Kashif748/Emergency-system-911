import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { IStorageService } from 'src/app/core/services/storage.service';

import { EventsManagementService } from '../../../events-management.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-incidents-categories-modal',
  templateUrl: './incidents-categories-modal.component.html',
  styleUrls: ['./incidents-categories-modal.component.scss'],
})
export class IncidentsCategoriesModalComponent implements OnInit {
  lang = 'en';
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  localRisks: any = [];
  private currentOrg;
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<IncidentsCategoriesModalComponent>,
    private storageService: IStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let commonData = this.storageService.getItem('commonDate');
    this.currentOrg = commonData?.currentOrgDetails;
  }

  ngOnInit(): void {
    if (this.data['type'] == 'edit') {
      this.id = this.data['item'].id;
    }
    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();
    this._service.getLocalRisks().subscribe((data) => {
      this.localRisks = data.result;
    });

    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, Validators.required],
      serialNumber: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
      isActive: [false, [Validators.required]],
      orgStructure: { id: this.currentOrg?.id },
      parent: this.data['parentId'] ? { id: this.data['parentId'] } : null,
      id: 0,
      chatBotEnabled: [null],
      localRisk: [null],
    });

    if (!this.isAddMode) {
      this.formGroup.patchValue({
        ...this.data['item'],
        localRisk: this.data['item']?.localRisk?.id,
      });
    }
  }

  private createItem(newItem) {
    newItem.parent =
      newItem.parent?.id == null ? null : { id: newItem.parent?.id };

    this._service.createIncidentsCategry(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }

  private updateItem(newItem) {
    this._service.updateIncidentsCategry(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }
  onSubmit() {
    let newItem = this.formGroup.value;
    const localRisk = this.localRisks.find(
      (el) => el.id == this.formGroup.value.localRisk
    );

    if (this.formGroup.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createItem({ ...newItem, localRisk });
    } else {
      this.updateItem({ ...newItem, localRisk });
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
