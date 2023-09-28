import {Injectable} from '@angular/core';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ActivityFrquencyStateModel} from '@core/states/bc/activity-frquency/activity-frquency.state';
import {BcPartnersControllerService} from "../../../../api/services/bc-partners-controller.service";
import {BcPartners} from "../../../../api/models/bc-partners";
import {PageBcPartners} from "../../../../api/models/page-bc-partners";
import {VenderAction} from "@core/states/bc-setup/venders/vender.action";
import {LocationsStateModel} from "@core/states/bc-setup/locations/locations.state";
import {LocationsAction} from "@core/states/bc-setup/locations/locations.action";

export interface VenderStateModel {
  page: PageBcPartners;
  vender: BcPartners;
  loading: boolean;
  blocking: boolean;
}

const VENDER_STATE_TOKEN = new StateToken<VenderStateModel>(
  'vender'
);
@State<VenderStateModel>({
  name: VENDER_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class VenderState {
  /**
   *
   */
  constructor(
    private vender: BcPartnersControllerService,
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([VenderState])
  static page(state: VenderStateModel) {
    return state?.page?.content;
  }
  @Selector([VenderState])
  static totalRecords(state: VenderStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([VenderState])
  static vender(state: VenderStateModel) {
    return state?.vender;
  }

  @Selector([VenderState])
  static loading(state: VenderStateModel) {
    return state?.loading;
  }

  @Selector([VenderState])
  static blocking(state: VenderStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */

  @Action(VenderAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<VenderStateModel>,
    { payload }: VenderAction.LoadPage
  ) {
    setState(
      patch<VenderStateModel>({
        loading: true,
      })
    );
    return this.vender
      .getAll12({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        ...payload.filters
      })
      .pipe(
        tap((res) => {
          setState(
            patch<VenderStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<VenderStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<VenderStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(VenderAction.GetVender, { cancelUncompleted: true })
  getVender(
    { setState }: StateContext<VenderStateModel>,
    { payload }: VenderAction.GetVender
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<VenderStateModel>({
          vender: undefined,
        })
      );
      return;
    }
    setState(
      patch<VenderStateModel>({
        blocking: true,
      })
    );
    return this.vender.getOne4({ id: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<VenderStateModel>({
            vender: res.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityFrquencyStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(VenderAction.Create)
  create(
    { setState }: StateContext<VenderStateModel>,
    { payload }: VenderAction.Create
  ) {
    setState(
      patch<VenderStateModel>({
        blocking: true,
      })
    );
    return this.vender
      .insertOne4({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<VenderStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(VenderAction.Delete)
  delete(
    { setState }: StateContext<VenderStateModel>,
    { payload }: VenderAction.Delete
  ) {
    return this.vender.deleteById7({ id: payload.id });
  }

  @Action(VenderAction.Update)
  update(
    { setState }: StateContext<VenderStateModel>,
    { payload }: VenderAction.Update
  ) {
    setState(
      patch<VenderStateModel>({
        blocking: true,
      })
    );
    return this.vender
      .update83({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<VenderStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
