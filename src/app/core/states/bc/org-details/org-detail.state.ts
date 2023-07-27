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
import { OrgDetailAction } from '@core/states/bc/org-details/org-detail.action';
import { OrgStructureControllerService } from '../../../../api/services/org-structure-controller.service';
import {
  BcOrgHierarchyControllerService,
  BcOrgHierarchyTypeControllerService,
} from 'src/app/api/services';
import { BrowseBusinessContinuityState } from 'src/app/modules/_business-continuity/states/browse-business-continuity.state';
import {
  BcOrgHierarchy,
  BcOrgHierarchyType,
  PageBcOrgHierarchy,
  PageBcOrgHierarchyType,
} from 'src/app/api/models';

export interface OrgDetailStateModel {
  orgHir: PageBcOrgHierarchy;
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
  static orgHir(state: OrgDetailStateModel): BcOrgHierarchy[] {
    return state?.orgHir.content;
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
    const versionID = this.store.selectSnapshot(
      BrowseBusinessContinuityState.versionId
    );

    return this.orgHir
      .getAll15({
        versionId: versionID,
        isActive: true,
        pageable: payload,
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
    return this.orgHir.getOne5(payload).pipe(
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
    return this.orgHir.insertOne6({ body: payload }).pipe(
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
    return this.orgHir.update85({ body: payload }).pipe(
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
    return this.orgHir.deleteById4(payload).pipe(
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
    const versionID = this.store.selectSnapshot(
      BrowseBusinessContinuityState.versionId
    );

    return this.orgHirTypes
      .getAll14({
        versionId: versionID,
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
