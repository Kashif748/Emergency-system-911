import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch } from '@ngxs/store/operators';
import { finalize, tap } from 'rxjs/operators';
import { OrgStructure } from '../../../../api/models/org-structure';
import {OrgDetailAction} from '@core/states/bc/org-details/org-detail.action';
import { OrgStructureControllerService } from '../../../../api/services/org-structure-controller.service';
import {
  BcOrgHierarchyControllerService,
  BcOrgHierarchyTypeControllerService,
} from 'src/app/api/services';
import {
  BcOrgHierarchy,
  BcOrgHierarchyType,
  PageBcOrgHierarchy,
  PageBcOrgHierarchyType,
} from 'src/app/api/models';
import { PageBcOrgHierarchyProjection } from 'src/app/api/models/page-bc-org-hierarchy-projection';
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import {PageBcOrgHierarchyProjectionWithOutCoordinators} from "../../../../api/models/page-bc-org-hierarchy-projection-with-out-coordinators";
import {BcOrgHierarchyProjectionWithOutCoordinators} from "../../../../api/models/bc-org-hierarchy-projection-with-out-coordinators";

export interface OrgDetailStateModel {
  orgHir: PageBcOrgHierarchyProjection;
  orgHirSearch: PageBcOrgHierarchy;
  orgHirParent: PageBcOrgHierarchyProjectionWithOutCoordinators;
  orgHirTypes: PageBcOrgHierarchyType;
  org: OrgStructure;
  loading: boolean;
  blocking: boolean;
}

const RTO_STATE_TOKEN = new StateToken<OrgDetailStateModel>('orgDetail');

@State<OrgDetailStateModel>({ name: RTO_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OrgDetailState {
  /**
   *
   */
  constructor(
    private org: OrgStructureControllerService,
    private store: Store,
    private orgHir: BcOrgHierarchyControllerService,
    private orgHirTypes: BcOrgHierarchyTypeControllerService
  ) {}

  @Selector([OrgDetailState])
  static org(state: OrgDetailStateModel) {
    return state?.org;
  }

  @Selector([OrgDetailState])
  static orgHirParent(state: OrgDetailStateModel): BcOrgHierarchyProjectionWithOutCoordinators[] {
    return state?.orgHirParent.content;
  }

  @Selector([OrgDetailState])
  static orgHir(state: OrgDetailStateModel): BcOrgHierarchyProjection[] {
    return state?.orgHir.content;
  }

  @Selector([OrgDetailState])
  static orgHirSearch(state: OrgDetailStateModel): BcOrgHierarchy[] {
    return state?.orgHirSearch.content;
  }

  @Selector([OrgDetailState])
  static orgHirTypes(state: OrgDetailStateModel): BcOrgHierarchyType[] {
    return state?.orgHirTypes.content;
  }

  @Selector([OrgDetailState])
  static loading(state: OrgDetailStateModel) {
    return state?.loading;
  }

  @Selector([OrgDetailState])
  static blocking(state: OrgDetailStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(OrgDetailAction.GetOrgHierarchy, { cancelUncompleted: true })
  getOrgHierarchy(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgHierarchy
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
        loading: true,
      })
    );

    return this.orgHir
      .search16({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        name: payload?.name,
        parentId: payload?.parentId,
      })
      .pipe(
        tap((orgHir) => {
          setState(
            patch<OrgDetailStateModel>({
              orgHir: orgHir.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              blocking: false,
              loading: false,
            })
          );
        })
      );
  }

  /* ********************** ACTIONS ************************* */
  @Action(OrgDetailAction.GetOrgHierarchySearch, { cancelUncompleted: true })
  getOrgHierarchySearch(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgHierarchySearch
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
        loading: true,
      })
    );

    return this.orgHir
      .orgHierarchyForFilteration({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        name: payload?.name,
        parentId: payload?.parentId,
      })
      .pipe(
        tap((orgHirSearch) => {
          setState(
            patch<OrgDetailStateModel>({
              orgHirSearch: orgHirSearch.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              blocking: false,
              loading: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.GetOrgHierarchyParent, { cancelUncompleted: true })
  getOrgHierarchyParent(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgHierarchyParent
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
        loading: true,
      })
    );

    return this.orgHir
      .topLevelParentHierarchy({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        id: payload?.id,
      })
      .pipe(
        tap((orgHirSearch) => {
          setState(
            patch<OrgDetailStateModel>({
              orgHirParent: orgHirSearch.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              blocking: false,
              loading: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.GetOrgHierarchyNode, { cancelUncompleted: true })
  GetOrgHierarchyNode(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgHierarchyNode
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );
    return this.orgHir.getOne16(payload).pipe(
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(OrgDetailAction.CreateOrgHierarchy, { cancelUncompleted: true })
  CreateOrgHierarchy(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.CreateOrgHierarchy
  ) {
    setState(
      patch<OrgDetailStateModel>({
        loading: true,
      })
    );
    return this.orgHir.insertOne17({ body: payload }).pipe(
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            loading: false,
          })
        );
      })
    );
  }
  @Action(OrgDetailAction.UpdateOrgHierarchy, { cancelUncompleted: true })
  UpdateOrgHierarchy(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.UpdateOrgHierarchy
  ) {
    setState(
      patch<OrgDetailStateModel>({
        loading: true,
      })
    );
    return this.orgHir.update98({ body: payload }).pipe(
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            loading: false,
          })
        );
      })
    );
  }

  @Action(OrgDetailAction.DeleteOrgHierarchy, { cancelUncompleted: true })
  DeleteOrgHierarchy(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.DeleteOrgHierarchy
  ) {
    setState(
      patch<OrgDetailStateModel>({
        loading: true,
      })
    );
    return this.orgHir.deleteById16(payload).pipe(
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            loading: false,
          })
        );
      })
    );
  }

  @Action(OrgDetailAction.GetOrgHierarchyTypes, { cancelUncompleted: true })
  getOrgHierarchyTypes(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgHierarchyTypes
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );

    return this.orgHirTypes
      .getAll14({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((orgHir) => {
          setState(
            patch<OrgDetailStateModel>({
              orgHirTypes: orgHir.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.Update)
  update(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.Update
  ) {
    setState(
      patch<OrgDetailStateModel>({
        loading: true,
      })
    );
    return this.org.updateOrgStructureForBc({ body: payload }).pipe(
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            loading: false,
          })
        );
      })
    );
  }

  @Action(OrgDetailAction.GetOrgDetail, { cancelUncompleted: true })
  getOrgDetail(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgDetail
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<OrgDetailStateModel>({
          org: undefined,
        })
      );
      return;
    }
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );
    return this.org.getById5({ id: payload.id }).pipe(
      tap((orgDetail) => {
        setState(
          patch<OrgDetailStateModel>({
            org: orgDetail.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
