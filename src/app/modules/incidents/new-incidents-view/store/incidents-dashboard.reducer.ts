import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { filter } from 'esri/core/promiseUtils';
import { DisplayedColumn, IncidentViewsEnum } from '../const';
import {
  SetCurrentView,
  SetIncidentsSelectedColumns,
  SetInquiriesSelectedColumns,
  SetInterimIncidentsSelectedColumns,
  SetPageNumber,
  UpdateFilter,
  UpdateLastRouterUrl,
} from './incidents-dashboard.actions';
export interface IncidentDashboardStateModel {
  currentView: IncidentViewsEnum;
  currentPageNumber: number;
  lastFetchedData: any[];
  filter: any;
  incidentsSelectedCols: DisplayedColumn[];
  inquiriesSelectedCols: DisplayedColumn[];
  interimIncidentsSelectedCols: DisplayedColumn[];
  lastRouterUrl: string;
}
export const initialState: IncidentDashboardStateModel = {
  currentPageNumber: 1,
  currentView: IncidentViewsEnum.IN_PROGRESS_INCIDENTS,
  filter: {},
  incidentsSelectedCols: [],
  interimIncidentsSelectedCols: [],
  inquiriesSelectedCols: [],
  lastFetchedData: [],
  lastRouterUrl: '',
};

export const incidentDashboardReducer = createReducer(
  initialState,
  on(SetPageNumber, (state, payload: { pageNumber }) => ({
    ...state,
    currentPageNumber: payload.pageNumber,
  })),
  on(SetCurrentView, (state, payload: { view }) => ({
    ...state,
    currentView: payload.view,
    filter: {},
  })),
  on(UpdateFilter, (state, payload: { filter: any }) => ({
    ...state,
    currentPageNumber: 1,
    filter: payload.filter,
  })),
  on(
    SetIncidentsSelectedColumns,
    (state, payload: { selectedCols: DisplayedColumn[] }) => ({
      ...state,
      incidentsSelectedCols: [...payload.selectedCols],
    })
  ),
  on(
    SetInquiriesSelectedColumns,
    (state, payload: { selectedCols: DisplayedColumn[] }) => ({
      ...state,
      inquiriesSelectedCols: [...payload.selectedCols],
    })
  ),
  on(
    SetInterimIncidentsSelectedColumns,
    (state, payload: { selectedCols: DisplayedColumn[] }) => ({
      ...state,
      interimIncidentsSelectedCols: [...payload.selectedCols],
    })
  ),
  on(UpdateLastRouterUrl, (state, payload: { url }) => {
    if (payload.url.includes('incidents/report')) {
      return state;
    } else {
      return { ...state, lastRouterUrl: payload.url };
    }
  })
);

export function reducer(
  state: IncidentDashboardStateModel | undefined,
  action: Action
): any {
  return incidentDashboardReducer(state, action);
}
