import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { loadModules } from 'esri-loader';
import { MapComponent } from '../map.component';
import { environment } from 'src/environments/environment';
import esri = __esri;
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { TaskIncidentGisData } from '@shared/components/map/utils/TaskIncidentGisData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILangFacade } from '@core/facades/lang.facade';
import { map } from 'rxjs/operators';
import { AddressSearchResultModel } from '../utils/map.models';

export interface MapConfig {
  showSaveButton: boolean;
  mapType: MapViewType;
  zoomModel?: {
    referenceId: any;
    featureName: MapActionType;
  };
  viewOnly?: boolean;
  showLayers?: boolean;
  showLocInfo?: boolean;
  pointLocation?: AddressSearchResultModel;
  closeMapAuto?: boolean;
  polygonLocation?: AddressSearchResultModel;
  polylineLocation?: AddressSearchResultModel;
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private langFacade: ILangFacade
  ) {
    this.getIncidentPointLayer();
    this.getTaskPointLayer();
  }

  public addressSearch(searchTerm: string) {
    return forkJoin([
      this.http.get(
        `/onwaniapi/api/addesssearch?addressstring=${
          searchTerm ?? ''
        }&_=1634195051993`,
        {
          headers: new HttpHeaders().set('Content-type', 'application/json'),
        }
      ),
      this.http.get(
        `/onwaniapi/api/AddessSearchAR?addressstring=${
          searchTerm ?? ''
        }&_=1634195051993`,
        {
          headers: new HttpHeaders().set('Content-type', 'application/json'),
        }
      ),
    ]).pipe(map(([s1, s2]: any[]) => [...s1, ...s2]));
  }

  openMap(config: MapConfig) {
    return this.dialog
      .open(MapComponent, {
        minWidth: '90%',
        minHeight: '90%',
        data: config,
      })
      .afterClosed() as Observable<{
      ff: (ref: TaskIncidentGisData) => Promise<void>;
      gType: string;
      locationInfo?: any;
      pointCoordinates: {
        latitude: string;
        longitude: string;
        x: string;
        y: string;
      };
      polylineCoordinates: Array<Array<Array<string>>>;
      polygonCoordinates: Array<Array<Array<string>>>;
    }>;
  }

  // incident layers
  async getIncidentPointLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPointFeatureService',
        layerId: 0,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  async getIncidentLineLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncLineFeatureService',
        layerId: 2,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  async getIncidentPolygonLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPolygonFeatureService',
        layerId: 4,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  // task layers
  async getTaskPointLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPointFeatureService',
        layerId: 1,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  async getTaskLineLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskLineFeatureService',
        layerId: 3,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  async getTaskPolygonLayer(): Promise<esri.FeatureLayer> {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [FeatureLayer] = await loadModules([
        'esri/layers/FeatureLayer',
        'dojo/domReady!',
      ]);
      return new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPolygonFeatureService',
        layerId: 5,
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
    return null;
  }

  async queryGraphic(
    featureService: esri.FeatureLayer,
    type: 'incident' | 'task' = 'incident',
    refId?: any,
    where?: string,
    outFields: string[] = ['*'],
    spatialReference: esri.SpatialReference = { wkid: 102100 } as any,
    returnGeometry = true
  ): Promise<esri.FeatureSet> {
    const query: esri.Query = featureService.createQuery();
    query.outSpatialReference = spatialReference;
    query.returnGeometry = returnGeometry;
    query.outFields = outFields;
    query.where = refId
      ? ` ${type === 'task' ? 'task_ref_id' : 'incident_ref_id'} = '${refId}'`
      : where;

    return await featureService.queryFeatures(query);
  }

  async applyEdits(
    graphic: esri.Graphic[],
    featureService: esri.FeatureLayer,
    type?: 'addFeatures' | 'deleteFeatures' | 'updateFeatures'
  ): Promise<boolean> {
    let edits: {};
    switch (type) {
      case 'addFeatures':
        edits = { addFeatures: graphic };
        break;
      case 'deleteFeatures':
        edits = { deleteFeatures: graphic };
        break;
      case 'updateFeatures':
        edits = { updateFeatures: graphic };
        break;
      default:
        edits = { addFeatures: graphic };
        break;
    }

    return await featureService
      .applyEdits(edits)
      .then((editsResult) => {
        switch (type) {
          case 'addFeatures':
            if (editsResult.addFeatureResults.length > 0) {
              const objectId = editsResult.addFeatureResults[0].objectId;
              if (typeof objectId === 'undefined') {
                const error = editsResult.addFeatureResults[0].error;
                console.error(
                  '[ Add Graphic ] FAILURE: ',
                  error.name,
                  error.message
                );
              } else {
                return true;
              }
            }
            break;
          case 'deleteFeatures':
            if (editsResult?.deleteResults?.length > 0) {
              const objectId = editsResult.deleteResults[0].objectId;
              if (typeof objectId === 'undefined') {
                const error = editsResult.deleteResults[0].error;
                console.error(
                  '[ Delete Graphic ] FAILURE: ',
                  error.name,
                  error.message
                );
              } else {
                return true;
              }
            }
            break;

          case 'updateFeatures':
            if (editsResult?.updateResults?.length > 0) {
              const objectId = editsResult.updateResults[0].objectId;
              if (typeof objectId === 'undefined') {
                const error = editsResult.updateResults[0].error;
                console.error(
                  '[ Update Graphic ] FAILURE: ',
                  error.name,
                  error.message
                );
              } else {
                return true;
              }
            }
            break;
        }
        return false;
      })
      .catch((error) => {
        console.error(
          '[ applyEdits ] FAILURE: ',
          error.code,
          error.name,
          error.message
        );
        return false;
      });
  }
}
