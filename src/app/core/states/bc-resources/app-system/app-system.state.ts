import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {AppSystemAction} from "@core/states/bc-resources/app-system/app-system.action";
import {PageBcResourcesAppAndSoftware} from "../../../../api/models/page-bc-resources-app-and-software";
import {BcResourcesAppAndSoftware} from "../../../../api/models/bc-resources-app-and-software";
import {BcResourcesAppAndSoftwareControllerService} from "../../../../api/services/bc-resources-app-and-software-controller.service";
import {BcResourcesMinLicenseReqControllerService} from "../../../../api/services/bc-resources-min-license-req-controller.service";
import {PageBcResourcesMinLicenseReq} from "../../../../api/models/page-bc-resources-min-license-req";
import {RecordsStateModel} from "@core/states/bc-resources/records/records.state";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";

export interface AppSystemStateModel {
  page: PageBcResourcesAppAndSoftware;
  appSystem: BcResourcesAppAndSoftware;
  minLicensePage: PageBcResourcesMinLicenseReq;
  loading: boolean;
  minLicenseLoading: boolean;
  blocking: boolean;
}

const APP_SYSTEM_STATE_TOKEN =
  new StateToken<AppSystemStateModel>('appSystem');

@State<AppSystemStateModel>({ name: APP_SYSTEM_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class AppSystemState {
  /**
   *
   */
  constructor(
    private bcResourcesAppAndSoftwareService: BcResourcesAppAndSoftwareControllerService,
    private minLicense: BcResourcesMinLicenseReqControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([AppSystemState])
  static page(state: AppSystemStateModel) {
    return state?.page?.content;
  }

  @Selector([AppSystemState])
  static appSystem(state: AppSystemStateModel) {
    return state?.appSystem;
  }

  @Selector([AppSystemState])
  static totalRecords(state: AppSystemStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([AppSystemState])
  static loading(state: AppSystemStateModel) {
    return state?.loading;
  }

  @Selector([AppSystemState])
  static minLicensePage(state: AppSystemStateModel) {
    return state?.minLicensePage.content;
  }

  @Selector([AppSystemState])
  static minLicenseLoading(state: AppSystemStateModel) {
    return state?.minLicenseLoading;
  }

  @Selector([AppSystemState])
  static blocking(state: AppSystemStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(AppSystemAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.LoadPage
  ) {
    setState(
      patch<AppSystemStateModel>({
        loading: true,
      })
    );
    return this.bcResourcesAppAndSoftwareService
      .search15({
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
            patch<AppSystemStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<AppSystemStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<AppSystemStateModel>({
              loading: false,
            })
          );
        })
      );
  }
  @Action(AppSystemAction.LoadMinLicense, { cancelUncompleted: true })
  loadMinLicense(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.LoadMinLicense
  ) {
    setState(
      patch<AppSystemStateModel>({
        minLicenseLoading: true,
      })
    );
    return this.minLicense
      .getAsPage1({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<AppSystemStateModel>({
              minLicensePage: res.result,
              minLicenseLoading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<AppSystemStateModel>({
              minLicensePage: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<AppSystemStateModel>({
              minLicenseLoading: false,
            })
          );
        })
      );
  }


  @Action(AppSystemAction.Create)
  create(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.Create
  ) {
    setState(
      patch<AppSystemStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesAppAndSoftwareService
      .insertOne13({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<AppSystemStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(AppSystemAction.Update)
  update(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.Update
  ) {
    setState(
      patch<AppSystemStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesAppAndSoftwareService
      .update92({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<AppSystemStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(AppSystemAction.GetAppSystem, { cancelUncompleted: true })
  getAppSystem(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.GetAppSystem
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<AppSystemStateModel>({
          appSystem: undefined,
        })
      );
      return;
    }
    setState(
      patch<AppSystemStateModel>({
        blocking: true,
      })
    );
    return this.bcResourcesAppAndSoftwareService.getOne14({ id: payload.id }).pipe(
      tap((app) => {
        setState(
          patch<AppSystemStateModel>({
            appSystem: app.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<AppSystemStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(AppSystemAction.Delete, { cancelUncompleted: true })
  Delete(
    { setState }: StateContext<AppSystemStateModel>,
    { payload }: AppSystemAction.Delete
  ) {
    if (payload.id === undefined || payload.id === null) {
      return;
    }
    setState(
      patch<AppSystemStateModel>({
        loading: true,
      })
    );
    return this.bcResourcesAppAndSoftwareService.deleteById14({ id: payload.id }).pipe(
      finalize(() => {
        setState(
          patch<AppSystemStateModel>({
            loading: false,
          })
        );
      })
    );
  }
}
