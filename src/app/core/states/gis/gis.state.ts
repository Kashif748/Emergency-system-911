import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { filter, finalize, map, tap } from 'rxjs/operators';
import { OrgMapGisLayerControllerService } from 'src/app/api/services';
import { GisAction } from './gis.action';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';

export interface GeoJSON {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: [];
  };
  properties: any;
}
export interface GisStateModel {
  contractors: any[];
  loading: boolean;
  blocking: boolean;
}

const GIS_MAP_STATE_TOKEN = new StateToken<GisStateModel>('gis_map');

@State<GisStateModel>({ name: GIS_MAP_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class GisState {
  /**
   *
   */
  constructor(
    private http: HttpClient,
    private mapGisService: OrgMapGisLayerControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([GisState])
  static loading(state: GisStateModel) {
    return state?.loading;
  }

  @Selector([GisState])
  static blocking(state: GisStateModel) {
    return state?.blocking;
  }
  @Selector([GisState])
  static contractors(state: GisStateModel) {
    return state?.contractors;
  }

  /* ********************** ACTIONS ************************* */
  @Action(GisAction.loadContractorsPage, { cancelUncompleted: true })
  loadLayerData(
    { setState }: StateContext<GisStateModel>,
    { payload }: GisAction.loadContractorsPage
  ) {
    // Query params for (DRM)
    const params = {
      f: 'json',
      where: '1=1',
      returnGeometry: 'false',
      outFields: 'CONTRACT_NO,CONTRACTOR,OBJECTID',
      resultRecordCount: '10',
    };
    return this.http
      .get(`${payload.mapGisLayer}/query`, {
        params: params,
      })
      .pipe(
        filter((res) => res.hasOwnProperty('exceededTransferLimit')),
        tap((res) => {
          setState(
            patch<GisStateModel>({
              contractors: res['features'],
            })
          );
        })
      );
  }

  @Action(GisAction.GetContractor, { cancelUncompleted: true })
  GetContractor(
    { setState, getState }: StateContext<GisStateModel>,
    { payload }: GisAction.GetContractor
  ) {
    const params = {
      f: 'json',
      where: `CONTRACT_NO='${payload.contractorNO}'`,
      returnGeometry: 'true',
      outFields: 'CONTRACT_NO,CONTRACTOR,OBJECTID',
      resultRecordCount: '10',
      inSR: '102100',
      outSR: '102100',
    };
    setState(
      patch<GisStateModel>({
        loading: true,
      })
    );
    return this.http
      .get(`${payload.mapGisLayer}/query`, {
        params: params,
      })
      .pipe(
        // filter((res) => res.hasOwnProperty('type')),
        map((res) => res['features']),
        tap((features) => {
          setState(
            patch<GisStateModel>({
              contractors: features,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<GisStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
