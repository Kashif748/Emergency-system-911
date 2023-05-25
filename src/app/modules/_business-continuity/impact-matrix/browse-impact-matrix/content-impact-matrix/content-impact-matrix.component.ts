import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "../../../../../core/models/page-request.model";
import {Store} from "@ngxs/store";
import {ILangFacade} from "../../../../../core/facades/lang.facade";
import {BcImpactLevel} from "../../../../../api/models/bc-impact-level";
import {BcImpactMatrixDto} from "../../../../../api/models/bc-impact-matrix-dto";
import {BrowseImpactMatrixAction} from "../../states/browse-impact-matrix.action";

@Component({
  selector: 'app-content-impact-matrix',
  templateUrl: './content-impact-matrix.component.html',
  styleUrls: ['./content-impact-matrix.component.scss']
})
export class ContentImpactMatrixComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcImpactMatrixDto[];
  @Input()
  impactTypePage: BcImpactLevel[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  @Output()
  onImpactTypePageChange = new EventEmitter<LazyLoadEvent>();

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseImpactMatrixAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    // this.display = true;
  }
}
