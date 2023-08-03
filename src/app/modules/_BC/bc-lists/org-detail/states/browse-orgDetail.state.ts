import { EMPTY } from 'rxjs';
import { MessageHelper } from '@core/helpers/message.helper';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BrowseOrgDetailAction } from './browse-orgDetail.action';
import { OrgDetailAction } from '@core/states';
import { PageRequestModel } from '@core/models/page-request.model';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';
import { BcOrgHierarchy } from 'src/app/api/models';
import { TreeNode } from 'primeng/api';

export interface BrowseOrgDetailModel {
  pageRequest: PageRequestModel;
  selectedOrgHir: BcOrgHierarchy;
  selectedOrgHirNode: TreeNode;
}

export const BROWSE_ORG_DETAIL_UI_STATE_TOKEN =
  new StateToken<BrowseOrgDetailModel>('browse_bc_org_detail');

@State<BrowseOrgDetailModel>({
  name: BROWSE_ORG_DETAIL_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    selectedOrgHir: null,
    selectedOrgHirNode: {
      leaf: true,
      expandedIcon: 'pi pi-plus',
      collapsedIcon: 'pi pi-plus',
      draggable: false,
      droppable: false,
      expanded: false,
      parent: null,
      children: [],
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseOrgDetailState {
  /**
   *
   */

  constructor(
    private messageHelper: MessageHelper,
    private apiHelper: ApiHelper
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseOrgDetailState])
  static state(state: BrowseOrgDetailModel): BrowseOrgDetailModel {
    return state;
  }
  @Selector([BrowseOrgDetailState])
  static selectedOrgHir(state: BrowseOrgDetailModel): BcOrgHierarchy {
    return state?.selectedOrgHir;
  }
  @Selector([BrowseOrgDetailState])
  static selectedOrgHirNode(state: BrowseOrgDetailModel): TreeNode {
    return state?.selectedOrgHirNode;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseOrgDetailAction.UpdateOrgDetail)
  updateOrgDetail(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.UpdateOrgDetail
  ) {
    return dispatch(new OrgDetailAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseOrgDetailAction.GetOrgDetail)
  getOrgDetail(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.GetOrgDetail
  ) {
    return dispatch(new OrgDetailAction.GetOrgDetail(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseOrgDetailAction.GetOrgHierarchy)
  getOrgHierarchy(
    { dispatch, setState, getState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.GetOrgHierarchy
  ) {
    setState(
      patch<BrowseOrgDetailModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new OrgDetailAction.GetOrgHierarchy({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
      })
    );
  }

  @Action(BrowseOrgDetailAction.CreateOrgHierarchy)
  CreateOrgHierarchy(
    { dispatch, setState, getState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.CreateOrgHierarchy
  ) {
    return dispatch(new OrgDetailAction.CreateOrgHierarchy(payload)).pipe(
      tap((orgHir: any) => {
        const selectedOrgHirNode = getState().selectedOrgHirNode;
        setState(
          patch<BrowseOrgDetailModel>({
            selectedOrgHir: orgHir.result,
            selectedOrgHirNode: { ...selectedOrgHirNode, data: orgHir.result },
          })
        );
        this.messageHelper.success();
        dispatch([new BrowseOrgDetailAction.GetOrgHierarchy()]);
      }),

      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseOrgDetailAction.UpdateOrgHierarchy)
  UpdateOrgHierarchy(
    { dispatch, setState, getState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.UpdateOrgHierarchy
  ) {
    return dispatch(new OrgDetailAction.UpdateOrgHierarchy(payload)).pipe(
      tap((orgHir: any) => {
        const selectedOrgHirNode = getState().selectedOrgHirNode;
        setState(
          patch<BrowseOrgDetailModel>({
            selectedOrgHir: orgHir.result,
            selectedOrgHirNode: { ...selectedOrgHirNode, data: orgHir.result },
          })
        );
        this.messageHelper.success();
        dispatch([new BrowseOrgDetailAction.GetOrgHierarchy()]);
      }),

      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseOrgDetailAction.DeleteOrgHierarchy)
  DeleteOrgHierarchy(
    { dispatch, setState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.DeleteOrgHierarchy
  ) {
    return dispatch(new OrgDetailAction.DeleteOrgHierarchy(payload)).pipe(
      tap(() => {
        setState(
          patch<BrowseOrgDetailModel>({
            selectedOrgHir: null,
            selectedOrgHirNode: null,
          })
        );
        this.messageHelper.success();
        dispatch([new BrowseOrgDetailAction.GetOrgHierarchy()]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseOrgDetailAction.SelectNode)
  SelectNode(
    { setState }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.SelectNode
  ) {
    setState(
      patch<BrowseOrgDetailModel>({
        selectedOrgHirNode: payload,
        selectedOrgHir: payload?.data,
      })
    );
  }

  @Action(BrowseOrgDetailAction.GetOrgHierarchyTypes)
  getOrgHierarchyTypes(
    { dispatch }: StateContext<BrowseOrgDetailModel>,
    { payload }: BrowseOrgDetailAction.GetOrgHierarchyTypes
  ) {
    return dispatch(new OrgDetailAction.GetOrgHierarchyTypes(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
