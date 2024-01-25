import {Injectable} from '@angular/core';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';
import {finalize, tap} from 'rxjs/operators';
import {IncidentControllerService} from "../../../api/services/incident-controller.service";
import {IncidentStatisticData} from "../../../api/models/incident-statistic-data";
import {IncidentStatisticsAction} from "@core/states/incident-statistics/incident-statistics.action";
import {DateTimeUtil} from "@core/utils/DateTimeUtil";

export interface IncidentStatisticsStateModel {
  incidentStatistics: IncidentStatisticData;
  loading: boolean;
  blocking: boolean;
}

const INCIDINT_STATISTICS_STATE_TOKEN = new StateToken<IncidentStatisticsStateModel>('incidentStatistics');
@State<IncidentStatisticsStateModel>({
  name: INCIDINT_STATISTICS_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class IncidentStatisticsState {
  /**
   *
   */
  constructor(
    private incidentStatistics: IncidentControllerService,
  ) {}

  /* ************************ SELECTORS ******************** */

  @Selector([IncidentStatisticsState])
  static incidentStatistics(state: IncidentStatisticsStateModel) {
    return state?.incidentStatistics;
  }


  @Selector([IncidentStatisticsState])
  static loading(state: IncidentStatisticsStateModel) {
    return state?.loading;
  }
  /* ********************** ACTIONS ************************* */

  @Action(IncidentStatisticsAction.LoadIncidentStatistics, { cancelUncompleted: true })
  loadIncidentsStatistics(
    { setState }: StateContext<IncidentStatisticsStateModel>,
    { payload }: IncidentStatisticsAction.LoadIncidentStatistics
  ) {
    setState(
        patch<IncidentStatisticsStateModel>({
          loading: true,
        })
    );
    const request = {
      filter: this.filters(payload?.filters),
    };
    return this.incidentStatistics
      .incidentStatistics(request)
      .pipe(
        tap(({ result }) => {
          setState(
            patch<IncidentStatisticsStateModel>({
              incidentStatistics: result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<IncidentStatisticsStateModel>({
              loading: false,
            })
          );
        })
      );
  }
  private filters(filters: { [key: string]: string }) {
    const fromDateCreation =
        filters?.fromDate
            ? DateTimeUtil.format(filters.fromDate, DateTimeUtil.DATE_FORMAT)
            : undefined;
    const toDateCreation =
        filters?.toDate
            ? DateTimeUtil.format(filters.toDate, DateTimeUtil.DATE_FORMAT)
            : undefined;
    return {
      fromDate: fromDateCreation,
      toDate: toDateCreation,
    };
  }
}
