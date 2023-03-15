import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { finalize, tap } from 'rxjs/operators';
import { IdNameProjection, IncidentProjection } from 'src/app/api/models';
import {
  IncidentControllerService,
  IncidentOrgControllerService,
} from 'src/app/api/services';
import { IncidentAction } from './incident.action';

export interface IncidentStateModel {
  transLoading: boolean;
  incidents: IncidentProjection[];
  orgs: IdNameProjection[];
}

const TASK_STATE_TOKEN = new StateToken<IncidentStateModel>('incident');
@State<IncidentStateModel>({
  name: TASK_STATE_TOKEN,
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
  static orgs(state: IncidentStateModel) {
    return state?.orgs;
  }

  @Selector([IncidentState])
  static transLoading(state: IncidentStateModel) {
    return state?.transLoading;
  }
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
}
