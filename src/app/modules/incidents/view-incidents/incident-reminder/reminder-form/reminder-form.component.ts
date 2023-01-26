import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../../../_metronic/core/services/alerts.service";
import {TranslationService} from "../../../../i18n/translation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Reminder} from "../model/Incident-Reminder";
import {IncidentReminderService} from "../incident-reminder.service";
import {ActivatedRoute} from "@angular/router";
import {CustomDatePipe} from "@shared/pipes/custom-date.pipe";

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {
  //variable

  type: "add" | "edit";
  lang: string;
  form: FormGroup;
  display: boolean;
  public incidentId: number;
  public reminderID: number
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  constructor(
    private ref: ChangeDetectorRef,
    private reminder: IncidentReminderService,
    private translation: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    public MatDialogRef: MatDialogRef<ReminderFormComponent>,
    private alert: AlertsService,
    protected customDatePipe: CustomDatePipe,
  ) {}

  ngOnInit(): void {
    this.lang = this.translation.getSelectedLanguage();
    this.type = this.data['reminder'] ? "edit" : "add";
    this.incidentId = this.data['incID'] ? this.data['incID'] : "";
    if (this.type === "edit") {
      this.reminderID = this.data['reminder'].id ? this.data['reminder'].id : "";
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      reminderDate: new FormControl(null, [Validators.required]),
    });

    if (this.type === "edit") {
      this.patchValues(this.data['reminder']);
    }

    this.display = true;

    this.ref.markForCheck();
  }

  patchValues(data: Reminder) {
    this.form.patchValue(data);
    this.form.patchValue({
      reminderDate: this.customDatePipe.transform(data.reminderDate),
    });
  }
  public checkStatus(): boolean {
    return false; //this.incidentStatus != 1 && !this.isAddMode && !this.loading;
  }

    submit() {
    if (!this.form.dirty) return;

    const data = this.prepareToSend();

    if (this.type == "add") {
      this.reminder
        .addReminder(data)
        .then((res) => {
          if (res) {
            this.alert.openSuccessSnackBarWithMsg(
              this.translation.translateAWord("COMMON.SUCCESSFULLY_ADDED")
            );
            this.MatDialogRef.close();
          }
        })
        .catch((err) => {
          this.alert.openSuccessSnackBarWithMsg(
            this.translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
          );
        });
    }
    if (this.type == "edit") {
      this.reminder
        .editReminder(data)
        .then((res) => {
          if (res) {
            this.alert.openSuccessSnackBarWithMsg(
              this.translation.translateAWord("COMMON.SUCCESSFULLY_UPDATED")
            );
            this.MatDialogRef.close();
          }
        })
        .catch((err) => {
          this.alert.openSuccessSnackBarWithMsg(
            this.translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
          );
        });
    }
  }

  prepareToSend() {
    const dataToSend: Reminder = new Reminder(this.form.value, this.incidentId);
    dataToSend.id = this.reminderID ? this.reminderID : 0;
    return dataToSend;
  }
}
