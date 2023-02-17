import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../i18n/translation.service';
import { EmergenciesPhonebookService } from '../emergencies-phonebook.service';

@Component({
  selector: 'app-phonebook-dialog',
  templateUrl: './phonebook-dialog.component.html',
  styleUrls: ['./phonebook-dialog.component.scss'],
})
export class PhonebookDialogComponent implements OnInit {
  lang = 'en';
  item: any;
  isAddMode: boolean;
  form: FormGroup;

  //
  constructor(
    private formBuilder: FormBuilder,
    private _service: EmergenciesPhonebookService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<PhonebookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data['type'] == 'edit') {
      this.item = this.data['item'];
    }

    this.isAddMode = !this.item;
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      orgName: [null, [Validators.required]],
      jobTitle: [null, [Validators.required]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      mobileNumber: [null, [Validators.required]],
      title: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
      id: 0,
    });

    if (!this.isAddMode) {
      this.form.patchValue(this.item);
    }
  }
  private createItem(newItem) {
    this._service.createPhoneItem(newItem).subscribe((res) => {
      if (res && res['status']) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    });
  }

  private updateItem(newItem) {
    this._service.updatePhoneItem(newItem).subscribe((res) => {
      if (res && res['status']) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    });
  }

  onSubmit() {
    let newItem = {
      ...this.form.value,
      mobileNumber: this.form.get('mobileNumber').value?.number,
    };

    if (this.form.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }
}
