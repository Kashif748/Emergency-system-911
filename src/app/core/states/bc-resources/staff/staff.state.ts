import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {BcResourcesStaffReqControllerService} from "../../../../api/services/bc-resources-staff-req-controller.service";
import {PageBcResourcesStaffReq} from "../../../../api/models/page-bc-resources-staff-req";
import {BcResourcesStaffReq} from "../../../../api/models/bc-resources-staff-req";
import {StaffAction} from "@core/states/bc-resources/staff/staff.action";
import {BcResourcesMinPersonnelReqControllerService} from "../../../../api/services/bc-resources-min-personnel-req-controller.service";
import {PageBcResourcesMinPersonnelReq} from "../../../../api/models/page-bc-resources-min-personnel-req";

export interface StaffStateModel {
  page: PageBcResourcesStaffReq;
  staff: BcResourcesStaffReq;
  minPersonalPage: PageBcResourcesMinPersonnelReq;
  loading: boolean;
  minPersonalPageLoading: boolean;
  blocking: boolean;
}

const STAFF_STATE_TOKEN =
  new StateToken<StaffStateModel>('staff');

@State<StaffStateModel>({ name: STAFF_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class StaffState {
  /**
   *ap
   */
  constructor(
    private staff: BcResourcesStaffReqControllerService,
    private minPerson: BcResourcesMinPersonnelReqControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([StaffState])
  static page(state: StaffStateModel) {
    return state?.page?.content;
  }

  @Selector([StaffState])
  static minPersonalPage(state: StaffStateModel) {
    return state?.minPersonalPage?.content;
  }

  @Selector([StaffState])
  static minPersonalPageLoading(state: StaffStateModel) {
    return state?.minPersonalPageLoading;
  }

  @Selector([StaffState])
  static staff(state: StaffStateModel) {
    return state?.staff;
  }

  @Selector([StaffState])
  static totalRecords(state: StaffStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([StaffState])
  static loading(state: StaffStateModel) {
    return state?.loading;
  }

  @Selector([StaffState])
  static blocking(state: StaffStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(StaffAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<StaffStateModel>,
    { payload }: StaffAction.LoadPage
  ) {
    setState(
      patch<StaffStateModel>({
        loading: true,
      })
    );
    return this.staff
      .search9({
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
            patch<StaffStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<StaffStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<StaffStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(StaffAction.LoadMinPage, { cancelUncompleted: true })
  loadPersonalDesi(
    { setState }: StateContext<StaffStateModel>,
    { payload }: StaffAction.LoadMinPage
  ) {
    setState(
      patch<StaffStateModel>({
        minPersonalPageLoading: true,
      })
    );
    return this.minPerson
      .getAsPage({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<StaffStateModel>({
              minPersonalPage: res.result,
              minPersonalPageLoading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<StaffStateModel>({
              minPersonalPage: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<StaffStateModel>({
              minPersonalPageLoading: false,
            })
          );
        })
      );
  }

  @Action(StaffAction.Create)
  create(
    { setState }: StateContext<StaffStateModel>,
    { payload }: StaffAction.Create
  ) {
    setState(
      patch<StaffStateModel>({
        blocking: true,
      })
    );
    return this.staff
      .insertOne5({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<StaffStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(StaffAction.Update)
  update(
    { setState }: StateContext<StaffStateModel>,
    { payload }: StaffAction.Update
  ) {
    setState(
      patch<StaffStateModel>({
        blocking: true,
      })
    );
    return this.staff
      .update84({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<StaffStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(StaffAction.GetStaff, { cancelUncompleted: true })
  getRemoteWork(
    { setState }: StateContext<StaffStateModel>,
    { payload }: StaffAction.GetStaff
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<StaffStateModel>({
          staff: undefined,
        })
      );
      return;
    }
    setState(
      patch<StaffStateModel>({
        blocking: true,
      })
    );
    return this.staff.getOne6({ id: payload.id }).pipe(
      tap((remoteWork) => {
        setState(
          patch<StaffStateModel>({
            staff: remoteWork.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<StaffStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
