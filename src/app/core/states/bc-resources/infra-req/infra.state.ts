import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { PageBcResourcesItInfrastructure } from '../../../../api/models/page-bc-resources-it-infrastructure';
import { BcResourcesItInfrastructure } from '../../../../api/models/bc-resources-it-infrastructure';
import { BcResourcesItInfrastructureControllerService } from '../../../../api/services/bc-resources-it-infrastructure-controller.service';
import { InfraAction } from '@core/states/bc-resources/infra-req/infra.action';
import { StaffStateModel } from '@core/states/bc-resources/staff/staff.state';
import { StaffAction } from '@core/states/bc-resources/staff/staff.action';

export interface InfraStateModel {
  page: PageBcResourcesItInfrastructure;
  infra: BcResourcesItInfrastructure;
  loading: boolean;
  blocking: boolean;
}

const INFRA_STATE_TOKEN = new StateToken<InfraStateModel>('infra');

@State<InfraStateModel>({ name: INFRA_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class InfraState {
  /**
   *
   */
  constructor(
    private bcResourcesItInfrastructure: BcResourcesItInfrastructureControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([InfraState])
  static page(state: InfraStateModel) {
    return state?.page?.content;
  }

  @Selector([InfraState])
  static infra(state: InfraStateModel) {
    return state?.infra;
  }

  @Selector([InfraState])
  static totalRecords(state: InfraStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([InfraState])
  static loading(state: InfraStateModel) {
    return state?.loading;
  }

  @Selector([InfraState])
  static blocking(state: InfraStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(InfraAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<InfraStateModel>,
    { payload }: InfraAction.LoadPage
  ) {
    setState(
      patch<InfraStateModel>({
        loading: true,
      })
    );
    return this.bcResourcesItInfrastructure
      .search14({
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
            patch<InfraStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<InfraStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<InfraStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(InfraAction.Create)
  create(
    { setState }: StateContext<InfraStateModel>,
    { payload }: InfraAction.Create
  ) {
    setState(
      patch<InfraStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesItInfrastructure
      .insertOne11({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<InfraStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(InfraAction.Update)
  update(
    { setState }: StateContext<InfraStateModel>,
    { payload }: InfraAction.Update
  ) {
    setState(
      patch<InfraStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesItInfrastructure
      .update92({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<InfraStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(InfraAction.GetInfra, { cancelUncompleted: true })
  getInfra(
    { setState }: StateContext<InfraStateModel>,
    { payload }: InfraAction.GetInfra
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<InfraStateModel>({
          infra: undefined,
        })
      );
      return;
    }
    setState(
      patch<InfraStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesItInfrastructure.getOne12({ id: payload.id }).pipe(
      tap((app) => {
        setState(
          patch<InfraStateModel>({
            infra: app.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<InfraStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(InfraAction.Delete, { cancelUncompleted: true })
  Delete(
    { setState }: StateContext<InfraStateModel>,
    { payload }: InfraAction.Delete
  ) {
    if (payload.id === undefined || payload.id === null) {
      return;
    }
    setState(
      patch<InfraStateModel>({
        loading: true,
      })
    );
    return this.bcResourcesItInfrastructure
      .deleteById11({ id: payload.id })
      .pipe(
        finalize(() => {
          setState(
            patch<InfraStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
