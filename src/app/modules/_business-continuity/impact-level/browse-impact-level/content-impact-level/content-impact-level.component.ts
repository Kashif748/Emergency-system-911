import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "@core/models/page-request.model";
import {Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {BcImpactLevel} from "../../../../../api/models/bc-impact-level";
import {BrowseImpactLevelAction} from "../../states/browse-impact-level.action";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericValidators} from "@shared/validators/generic-validators";
import {FormUtils} from "@core/utils/form.utils";

@Component({
  selector: 'app-content-impact-level',
  templateUrl: './content-impact-level.component.html',
  styleUrls: ['./content-impact-level.component.scss']
})
export class ContentImpactLevelComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcImpactLevel[];
/*  @Input()
  columns: string[];*/
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();
  form: FormGroup;
  public display = false;
  public columns: string[] = ['levelAr', 'levelEn', 'color', 'active'];

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseImpactLevelAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    this.display = true;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null],
      nameAr: [null],
      colorCode: [null],
      isActive: [false]
    });
  }

  onValueChange(value: string): void {
    this.form.patchValue({
      colorCode: value
    });
  }

  submit() {
    /*if (!this.form.valid) {
      this.form.markAllAsTouched();
      FormUtils.ForEach(this.form, (fc) => {
        fc.markAsDirty();
      });
      return;
    }*/

    const impactLevel = {
      ...this.form.getRawValue(),
    };

    impactLevel.versionId = 1;
    // impactLevel.isActive = true;
    this.store.dispatch(new BrowseImpactLevelAction.CreateImpactLevel(impactLevel));

    /*if (this.editMode) {
      this.store.dispatch(new BrowseUsersAction.UpdateUser(user));
    } else {
      this.store.dispatch(new BrowseUsersAction.CreateUser(user));
    }*/
  }

}
