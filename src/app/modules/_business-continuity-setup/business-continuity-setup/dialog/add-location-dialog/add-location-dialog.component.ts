import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {IncidentsService} from "../../../../../_metronic/core/services/incidents.service";
import {LocationInfoModel} from '@shared/components/map/utils/map.models';

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.scss']
})
export class AddLocationDialogComponent implements OnInit {
  public locType = [
    {id: 1, nameEn: "choose from map", nameAr: "test1"},
    {id: 2, nameEn: "list", nameAr: "test2"},
  ];
  // variable
  public display = false;
  form: FormGroup;



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
      locType: [null, [Validators.required, GenericValidators.english]],
      District: [null, [Validators.required]],
      longitude: [null],
      latitude: [null]
    });
  }
}
