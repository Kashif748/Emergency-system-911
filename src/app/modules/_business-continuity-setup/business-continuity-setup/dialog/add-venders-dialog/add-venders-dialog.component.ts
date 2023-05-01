import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {IncidentsService} from "../../../../../_metronic/core/services/incidents.service";
import {RegxConst} from "@core/constant/RegxConst";

@Component({
  selector: 'app-add-venders-dialog',
  templateUrl: './add-venders-dialog.component.html',
  styleUrls: ['./add-venders-dialog.component.scss']
})
export class AddVendersDialogComponent implements OnInit {

  public criticalityType = [
    {id: 1, nameEn: "Critical", nameAr: "مهم"},
    {id: 2, nameEn: "Non-Critical", nameAr: "غير مهم"},
  ];
  // variable
  public display = false;
  form: FormGroup;
  private defaultFormValue: { [key: string]: any } = {};



  constructor(
    private formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected incidentService: IncidentsService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  openDialog(groupId?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      criticalityType: [null, [Validators.required]],
      address: [null, [Validators.required]],
      supply_services: [null],
      service_level_Agree: [null],
      p_nameEn: [null, [Validators.required, GenericValidators.english]],
      p_nameAr: [null, [Validators.required, GenericValidators.arabic]],
      s_nameEn: [null, [Validators.required, GenericValidators.english]],
      s_nameAr: [null, [Validators.required, GenericValidators.arabic]],
      landlineNumber: [null, [Validators.pattern(/^-?([0-9]\d*)?$/)]],
      mobileNumber: [null, [Validators.required]],
      homeNumber: [null, [Validators.pattern(/^-?([0-9]\d*)?$/)]],
      email: [
        null,
        [Validators.required, Validators.pattern(RegxConst.EMAIL_REGEX)],
      ],
    });

    this.defaultFormValue = {
      ...this.defaultFormValue
    };
  }
}
