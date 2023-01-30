import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { EventsManagementService } from '../../../events-management.service';
import { NavigationModalComponent } from '../../navigations/navigation-modal/navigation-modal.component';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss'],
})
export class NotificationsModalComponent implements OnInit {
  lang = 'en';
  item: any;
  isAddMode: boolean;
  formGroup: FormGroup;

  //
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<NavigationModalComponent>,
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
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      active: [true, [Validators.required]],
      code: ['', Validators.required],
      emailNotif: [true, Validators.required],
      smsNotif: [true, Validators.required],
      pushNotif: [true, Validators.required],
      id: 0,
    });

    if (!this.isAddMode) {
      this.formGroup.patchValue(this.item);
    }
  }
  private createItem(newItem) {}

  private updateItem(newItem) {
    this._service.updateNotifications(newItem).subscribe((res) => {
      if (res && res['status']) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    });
  }

  onSubmit() {
    let newItem = this.formGroup.value;

    if (this.formGroup.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }
}
