import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {OtherAction} from "@core/states/bc-resources/other/other.action";
import {BcResourcesNonItInfrastructureControllerService} from "../../../../api/services/bc-resources-non-it-infrastructure-controller.service";
import {PageBcResourcesNonItInfrastructure} from "../../../../api/models/page-bc-resources-non-it-infrastructure";
import {BcResourcesNonItInfrastructure} from "../../../../api/models/bc-resources-non-it-infrastructure";

export interface OtherStateModel {
  page: PageBcResourcesNonItInfrastructure;
  other: BcResourcesNonItInfrastructure;
  loading: boolean;
  blocking: boolean;
}

const OTHER_STATE_TOKEN =
  new StateToken<OtherStateModel>('other');

@State<OtherStateModel>({ name: OTHER_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OtherState {
  /**
   *
   */
  constructor(
    private other: BcResourcesNonItInfrastructureControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([OtherState])
  static page(state: OtherStateModel) {
    return state?.page?.content;
  }

  @Selector([OtherState])
  static other(state: OtherStateModel) {
    return state?.other;
  }

  @Selector([OtherState])
  static totalRecords(state: OtherStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([OtherState])
  static loading(state: OtherStateModel) {
    return state?.loading;
  }

  @Selector([OtherState])
  static blocking(state: OtherStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(OtherAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<OtherStateModel>,
    { payload }: OtherAction.LoadPage
  ) {
    setState(
      patch<OtherStateModel>({
        loading: true,
      })
    );
    return this.other
      .search13({
        resourceId: payload.resourceId,
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<OtherStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<OtherStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<OtherStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(OtherAction.Create)
  create(
    { setState }: StateContext<OtherStateModel>,
    { payload }: OtherAction.Create
  ) {
    setState(
      patch<OtherStateModel>({
        blocking: true,
      })
    );
    return this.other
      .insertOne8({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<OtherStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OtherAction.Update)
  update(
    { setState }: StateContext<OtherStateModel>,
    { payload }: OtherAction.Update
  ) {
    setState(
      patch<OtherStateModel>({
        blocking: true,
      })
    );
    return this.other
      .update87({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<OtherStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OtherAction.GetOther, { cancelUncompleted: true })
  getOther(
    { setState }: StateContext<OtherStateModel>,
    { payload }: OtherAction.GetOther
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<OtherStateModel>({
          other: undefined,
        })
      );
      return;
    }
    setState(
      patch<OtherStateModel>({
        blocking: true,
      })
    );
    return this.other.getOne9({ id: payload.id }).pipe(
      tap((records) => {
        setState(
          patch<OtherStateModel>({
            other: records.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<OtherStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
