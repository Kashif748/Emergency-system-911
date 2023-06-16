import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../../../../../_metronic/core/services/incidents.service";
import {GenericValidators} from "@shared/validators/generic-validators";
import {RegxConst} from "@core/constant/RegxConst";
import {ActivatedRoute} from "@angular/router";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-vender-dialog',
  templateUrl: './vender-dialog.component.html',
  styleUrls: ['./vender-dialog.component.scss']
})
export class VenderDialogComponent implements OnInit {
  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== VenderDialogComponent;
  }
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
    private route: ActivatedRoute,
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
  close() {
    if (this.asDialog) {
      this.display = false;
      // this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
    } else {
      // this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
}
