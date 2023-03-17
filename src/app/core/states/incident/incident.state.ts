import { Injectable } from '@angular/core';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import {
  Action,
  Select,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import {
  IdNameProjection,
  IncidentProjection,
  Pageable,
  PageIncidentProjectionMinimum,
} from 'src/app/api/models';
import {
  IncidentControllerService,
  IncidentOrgControllerService,
} from 'src/app/api/services';
import { CommonDataState } from '../common-data/common-data.state';
import { IncidentAction } from './incident.action';

export interface IncidentStateModel {
  transLoading: boolean;
  incidents: IncidentProjection[];
  page: PageIncidentProjectionMinimum;
  orgs: IdNameProjection[];
  loading: boolean;
}

const INCDINT_STATE_TOKEN = new StateToken<IncidentStateModel>('incident');
@State<IncidentStateModel>({
  name: INCDINT_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class IncidentState {
  /**
   *
   */
  constructor(
    private incidentService: IncidentControllerService,
    private incidentOrgService: IncidentOrgControllerService
  ) {}

  /* ************************ SELECTORS ******************** */

  @Selector([IncidentState])
  static incidents(state: IncidentStateModel) {
    return state?.incidents;
  }
  @Selector([IncidentState])
  static transLoading(state: IncidentStateModel) {
    return state?.transLoading;
  }

  @Selector([IncidentState])
  static orgs(state: IncidentStateModel) {
    return state?.orgs;
  }
  //  selectors for closed incidents screen
  @Selector([IncidentState])
  static page(state: IncidentStateModel) {
    return state?.page?.content;
  }

  @Selector([IncidentState])
  static totalRecords(state: IncidentStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([IncidentState])
  static loading(state: IncidentStateModel) {
    return state?.loading;
  }

  @Select(CommonDataState.incidentStatus)
  public statuses$: Observable<any[]>;
  /* ********************** ACTIONS ************************* */

  @Action(IncidentAction.LoadIncidents, { cancelUncompleted: true })
  loadIncidents(
    { setState }: StateContext<IncidentStateModel>,
    { payload }: IncidentAction.LoadIncidents
  ) {
    setState(
      patch<IncidentStateModel>({
        transLoading: true,
      })
    );
    return this.incidentService
      .search4({
        filter: { subject: payload.subject },
        pageable: { page: 0, size: 15, sort: ['subject', 'desc'] },
        status: payload.status as any,
      })
      .pipe(
        tap(({ result: { content: list } }) => {
          setState(
            patch<IncidentStateModel>({
              incidents: list,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<IncidentStateModel>({
              transLoading: false,
            })
          );
        })
      );
  }

  @Action(IncidentAction.LoadOrgs, { cancelUncompleted: true })
  loadOrgs(
    { setState }: StateContext<IncidentStateModel>,
    { payload }: IncidentAction.LoadOrgs
  ) {
    return this.incidentOrgService
      .getIncidentOrg({
        incidentId: payload.incidentId,
      })
      .pipe(
        tap(({ result: list }) => {
          setState(
            patch<IncidentStateModel>({
              orgs: list.map((s) => s.orgStructure),
            })
          );
        })
      );
  }

  @Action(IncidentAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<IncidentStateModel>,
    { payload }: IncidentAction.LoadPage
  ) {
    setState(
      patch<IncidentStateModel>({
        loading: true,
      })
    );
    return this.incidentService
      .search4({
        filter: payload.filters,
        pageable: { page: payload.page, size: payload.size },
        status: [],
      })
      .pipe(
        switchMap((res) =>
          this.statuses$.pipe(
            map(
              (statuses) => {
                const mp = statuses.reduce((pv, cv) => {
                  pv[`${cv.id}`] = cv;
                  return pv;
                }, {});
                res.result.content.forEach((t) => {
                  t.status = mp[t.status?.id] ?? t.status;
                });
                return res;
              },
              catchError(() => of(res))
            )
          )
        ),
        tap(({ result }) => {
          setState(
            patch<IncidentStateModel>({
              page: result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<IncidentStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<IncidentStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(IncidentAction.reOpenIncident, { cancelUncompleted: true })
  reOpenIncident(
    { setState }: StateContext<IncidentStateModel>,
    { payload }: IncidentAction.reOpenIncident
  ) {
    setState(
      patch<IncidentStateModel>({
        loading: true,
      })
    );
    return this.incidentService
      .changeIncident1({
        incId: payload.incidentId,
        language: true,
      })
      .pipe(
        tap(({ result }) => {
          setState(
            patch<IncidentStateModel>({
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<IncidentStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<IncidentStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
