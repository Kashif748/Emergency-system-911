import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {RegxConst} from '@core/constant/RegxConst';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss'],
})
export class HospitalFormComponent implements OnInit {
  type: 'add' | 'edit';
  checked = false;

  lang: string;
  form: FormGroup;
  display: boolean;
  hospitals: any[];

  constructor(
    private ref: ChangeDetectorRef,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<HospitalFormComponent>,
    private alertsService: AlertsService,
    private incidentsService: IncidentsService
  ) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.loadHospitals();
    this.type = this.data ? 'edit' : 'add';
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      hospital: new FormControl(null, [Validators.required]),
      deaths: new FormControl(0, [
        Validators.required,
        Validators.max(999),
        Validators.min(0),
        Validators.pattern(RegxConst.NUMBER_ONLY_REGEX),
      ]),
      majorInjuries: new FormControl(0, [
        Validators.required,
        Validators.max(999),
        Validators.min(0),
        Validators.pattern(RegxConst.NUMBER_ONLY_REGEX),
      ]),
      normalInjuries: new FormControl(0, [
        Validators.required,
        Validators.max(999),
        Validators.min(0),
        Validators.pattern(RegxConst.NUMBER_ONLY_REGEX),
      ]),
      minorInjuries: new FormControl(0, [
        Validators.required,
        Validators.max(999),
        Validators.min(0),
        Validators.pattern(RegxConst.NUMBER_ONLY_REGEX),
      ]),
      staff: new FormControl(true, [Validators.required]),
    });

    if (this.type === 'edit') {
      this.patchValues(this.data);
    }

    this.display = true;

    this.ref.markForCheck();
  }

  loadHospitals() {
    this.incidentsService.getHospitals().subscribe(
      (data) => {
        if (data) {
          this.hospitals = [...data.result.content];
        }
      },
      (error) => {
      }
    );
  }

  patchValues(data) {
    this.data['hospital'] = this.data['hospital']['id'];
    this.form.patchValue(data);
  }

  submit() {
    const data = this.prepareToSend();
    this.matDialogRef.close(data);
  }

  prepareToSend() {
    const dataToSend = this.form.value;
    dataToSend.id = this.data?.id || new Date().getTime();
    // dataToSend.staff = this.checked;
    dataToSend.hospital = {...this.getHospital(this.form.value['hospital'])};
    return dataToSend;
  }

  changeValue(value) {
    this.checked = !value;
  }

  getHospital(id: number) {
    return this.hospitals.find((item) => item.id == id);
  }

  disableAddEditHospitalReport() {
    if (this.form.invalid) {
      return true;
    }
    const formValue = this.form.value;
    if (formValue.hospital == null) {
      return true;
    } else if (formValue.deaths === 0 && formValue.majorInjuries === 0 &&
      formValue.normalInjuries === 0 && formValue.minorInjuries === 0) {
      return true;
    }
    return false;
  }
}
