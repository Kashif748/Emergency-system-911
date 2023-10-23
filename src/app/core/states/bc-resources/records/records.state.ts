import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {BcResourcesRecordsControllerService} from "../../../../api/services/bc-resources-records-controller.service";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";
import {PageBcResourcesRecords} from "../../../../api/models/page-bc-resources-records";
import {BcResourcesRecords} from "../../../../api/models/bc-resources-records";
import {RemoteWorkAction} from "@core/states/bc-resources/remote-work/remote-work.action";
import {RemoteWorkStateModel} from "@core/states/bc-resources/remote-work/remote-work.state";

export interface RecordsStateModel {
  page: PageBcResourcesRecords;
  records: BcResourcesRecords;
  loading: boolean;
  blocking: boolean;
}

const RECORDS_STATE_TOKEN =
  new StateToken<RecordsStateModel>('records');

@State<RecordsStateModel>({ name: RECORDS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class RecordsState {
  /**
   *
   */
  constructor(
    private bcRecords: BcResourcesRecordsControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([RecordsState])
  static page(state: RecordsStateModel) {
    return state?.page?.content;
  }

  @Selector([RecordsState])
  static records(state: RecordsStateModel) {
    return state?.records;
  }

  @Selector([RecordsState])
  static totalRecords(state: RecordsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([RecordsState])
  static loading(state: RecordsStateModel) {
    return state?.loading;
  }

  @Selector([RecordsState])
  static blocking(state: RecordsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(RecordsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<RecordsStateModel>,
    { payload }: RecordsAction.LoadPage
  ) {
    setState(
      patch<RecordsStateModel>({
        loading: true,
      })
    );
    return this.bcRecords
      .search12({
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
            patch<RecordsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<RecordsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<RecordsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(RecordsAction.Create)
  create(
    { setState }: StateContext<RecordsStateModel>,
    { payload }: RecordsAction.Create
  ) {
    setState(
      patch<RecordsStateModel>({
        blocking: true,
      })
    );
    return this.bcRecords
      .insertOne7({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RecordsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RecordsAction.Update)
  update(
    { setState }: StateContext<RecordsStateModel>,
    { payload }: RecordsAction.Update
  ) {
    setState(
      patch<RecordsStateModel>({
        blocking: true,
      })
    );
    return this.bcRecords
      .update86({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RecordsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RecordsAction.GetRecords, { cancelUncompleted: true })
  getRecords(
    { setState }: StateContext<RecordsStateModel>,
    { payload }: RecordsAction.GetRecords
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<RecordsStateModel>({
          records: undefined,
        })
      );
      return;
    }
    setState(
      patch<RecordsStateModel>({
        blocking: true,
      })
    );
    return this.bcRecords.getOne8({ id: payload.id }).pipe(
      tap((records) => {
        setState(
          patch<RecordsStateModel>({
            records: records.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<RecordsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(RecordsAction.Delete, { cancelUncompleted: true })
  Delete(
    { setState }: StateContext<RecordsStateModel>,
    { payload }: RecordsAction.Delete
  ) {
    if (payload.id === undefined || payload.id === null) {
      return;
    }
    setState(
      patch<RecordsStateModel>({
        loading: true,
      })
    );
    return this.bcRecords.deleteById7({ id: payload.id }).pipe(
      finalize(() => {
        setState(
          patch<RecordsStateModel>({
            loading: false,
          })
        );
      })
    );
  }
}
