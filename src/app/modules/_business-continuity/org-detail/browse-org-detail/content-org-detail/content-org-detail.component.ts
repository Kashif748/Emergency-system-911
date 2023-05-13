import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {BcLocationTypes} from "../../../../../api/models/bc-location-types";

@Component({
  selector: 'app-content-org-detail',
  templateUrl: './content-org-detail.component.html',
  styleUrls: ['./content-org-detail.component.scss']
})
export class ContentOrgDetailComponent implements OnInit {
  form: FormGroup;
  @Input()
  loading: boolean;
  @Input()
  page: BcLocationTypes[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [GenericValidators.arabic, Validators.required]],
      nameEn: [null, [GenericValidators.english, Validators.required]],
      desc: [null],
      employee: [null],
      activities: [null],
      id: 0,
    });
  }
}
