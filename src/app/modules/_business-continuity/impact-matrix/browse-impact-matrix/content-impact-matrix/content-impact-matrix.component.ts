import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DATA} from "../../../tabs.const";
import {LazyLoadEvent} from "primeng/api";
import {PageRequestModel} from "../../../../../core/models/page-request.model";
import {BcLocationTypes} from "../../../../../api/models/bc-location-types";
import {BrowseLocationTypeAction} from "../../../location-type/states/browse-locationType.action";
import {Store} from "@ngxs/store";
import {ILangFacade} from "../../../../../core/facades/lang.facade";
import {BcImpactTypes} from "../../../../../api/models/bc-impact-types";
import {BcImpactLevel} from "../../../../../api/models/bc-impact-level";

@Component({
  selector: 'app-content-impact-matrix',
  templateUrl: './content-impact-matrix.component.html',
  styleUrls: ['./content-impact-matrix.component.scss']
})
export class ContentImpactMatrixComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcLocationTypes[];
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
  //public loading = false;
  //public columns: string[] = ['impactType', 'low', 'medium', 'hight', 'action'];
  //public page = [];

  constructor(
    private translate: TranslateService,
    private lang: ILangFacade,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.onPageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });
    this.onImpactTypePageChange.emit({
      first: this.pageRequest?.first,
      rows: this.pageRequest?.rows,
    });

    /*this.page = DATA.impactAnalysis.map((item) => {
      return {
        ...item,
        actions: [
          {
            label: this.translate.instant('ACTIONS.EDIT'),
            icon: 'pi pi-pencil',
            command: () => {
              // this.openDialog(item.id);
            },
          },
        ],
      };
    });*/
  }

  openView(Id?: number) {
    this.store.dispatch(new BrowseLocationTypeAction.OpenView({ id: Id }));
  }

  openDialog(Id?: number) {
    // this.display = true;
  }
}
