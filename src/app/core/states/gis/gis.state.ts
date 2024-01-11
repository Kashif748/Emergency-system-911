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
import { PageOrgMapGisLayer } from 'src/app/api/models/page-org-map-gis-layer';

export interface GeoJSON {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: [];
  };
  properties: any;
}
export interface GisStateModel {
  layersPage: PageOrgMapGisLayer;
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
  @Selector([GisState])
  static layersPage(state: GisStateModel) {
    return state?.layersPage.content;
  }

  /* ********************** ACTIONS ************************* */
  @Action(GisAction.LoadLayers, { cancelUncompleted: true })
  LoadLayers(
    { setState }: StateContext<GisStateModel>,
    { payload }: GisAction.LoadLayers
  ) {
    return this.mapGisService
      .findActivePage4({
        pageable: payload,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GisStateModel>({
              layersPage: res.result,
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
