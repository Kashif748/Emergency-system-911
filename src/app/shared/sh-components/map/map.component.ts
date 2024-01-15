import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IThemeFacade } from '@core/facades/theme.facade';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { InlineSVGModule } from 'ng-inline-svg';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { CommonService } from '@core/services/common.service';
import { ILinkService } from '@core/services/link.service';
import { OrgService } from '@core/api/services/org.service';
import { MapConfig, MapService } from './services/map.service';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { TaskIncidentGisData } from '@shared/components/map/utils/TaskIncidentGisData';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AddressSearchResultModel,
  DZSP_ID_COMMUNITY,
  DZSP_SEARCH_URL,
  LocationInfoModel,
} from './utils/map.models';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import esri = __esri;
import { TranslateModule } from '@ngx-translate/core';
import { EsriModule } from './utils/map-module.enum';
import { PopupBuilder } from './services/popup.builder';
import { CdatePipe } from '@shared/sh-pipes/cdate.pipe';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [CdatePipe, PopupBuilder],
})
export class MapComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @ViewChild(TopBarComponent) topbar: TopBarComponent;

  private queryInfo: (graphic: esri.Graphic) => Promise<LocationInfoModel>;
  filterLayersFunc$: Subject<(where: any, fName: MapActionType) => void> =
    new Subject();
  @Input() configData: MapConfig;
  @Input() currentLocationOfUser: boolean;
  @Output() OnSaveMap: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private mapService: MapService,
    private popupBuidler: PopupBuilder,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private cdr: ChangeDetectorRef,
    private themeFacade: IThemeFacade,
    private commonService: CommonService,
    private orgService: OrgService,
    private linkService: ILinkService,
    private appCommonDataService: AppCommonDataService,
    @Optional() public dialogRef: MatDialogRef<MapComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MapConfig,
    @Optional() private incidentsService: IncidentsService
  ) {}

  // UI
  @Input() title: string;
  @Input() dashboardMode = false;
  @Input() showLocInfo = true;
  @Input() smallSize = false;
  currentLocation = true;
  showTopBar = false;
  @Output() OnFetchCoordinates: EventEmitter<boolean> = new EventEmitter();
  // main map view
  public mapView: esri.MapView;
  map: esri.Map;
  showButton = false;
  showSaveButton = true;
  public window = window;
  @Input()
  config: MapConfig;
  private baseMapToggle: esri.BasemapToggle;
  private addressGraphicsLayer: __esri.GraphicsLayer;
  public DZSP_GRAPHICS_LAYER: __esri.GraphicsLayer;

  public zoomToAddress: (address: AddressSearchResultModel) => void;
  public zoomToGroupAddress: (address: AddressSearchResultModel) => void;
  // Variables
  lang = 'en';
  draw: any;
  mpImg: any;
  public groupData: Array<MapConfig> = [];
  public loading = false;
  public zoomedLocationInfo: {
    zoneAr?: string;
    zoneEn?: string;
    sectorAr?: string;
    sectorEn?: string;
    plotEn?: string;
    plotAr?: string;
  } = {};
  mapType: MapViewType = MapViewType.INCIDENT;
  private subscriptions: Subscription[] = [];
  private oldGraphics: any[] = [];
  // Functions.
  private applyFeature: (mode: any) => Promise<void>;

  private zoomToRequest: (referenceId: any, featureName: string) => void;
  public addIncidentPoint: () => void;
  public addIncidentPolyline: () => void;
  public addIncidentPolygon: () => void;
  public addTaskPoint: () => void;
  public addTaskPolyline: () => void;
  public addTaskPolygon: () => void;
  public addOrgPoint: () => void;
  public addAssetPoint: () => void;
  public addTeamPolyline: () => void;
  public addTeamPolygon: () => void;
  public addReporterPoint: () => void;
  public addLayer: (layer: any) => void;
  public removeLayer: (layer: any) => void;

  public createQueryTask: (url: string) => __esri.QueryTask;
  public createQuery: () => __esri.Query;

  reload() {
    if (this.topbar) {
      this.topbar.clearSearch();
    } else {
      this.initializeMap();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (Array.isArray(this.config)) {
      if (this.config.length > 0) {
        for (let i = 0; i < this.config.length; i++) {
          this.groupData.push(this.config[i]);
          if (this.groupData[i]) {
            this.mapType = this.groupData[i].mapType;
            this.showButton = !this.groupData[i].viewOnly;
            this.showSaveButton = this.groupData[i].showSaveButton;
            this.showLocInfo = this.groupData[i].showLocInfo ? true : false;
          }
          if (this.groupData[i]?.zoomModel?.featureName && this.zoomToRequest) {
            this.zoomToRequest(
              this.groupData[i].zoomModel.referenceId,
              this.groupData[i].zoomModel.featureName
            );
          }
        }
      }
    } else {
      if (this.config) {
        this.data = this.config;
      }

      if (this.configData) {
        this.data = this.configData;
        this.smallSize = true;
      }
      if (this.data) {
        this.mapType = this.data.mapType;
        this.showButton = !this.data.viewOnly;
        this.showSaveButton = this.data.showSaveButton;
        this.showLocInfo = this.data.showLocInfo ? true : false;
      }
      if (this.data?.zoomModel?.featureName && this.zoomToRequest) {
        this.zoomToRequest(
          this.data.zoomModel.referenceId,
          this.data.zoomModel.featureName
        );
      }
    }
  }

  ngOnInit(): void {
    if (Array.isArray(this.config)) {
      if (this.config.length > 0) {
        for (let i = 0; i < this.config.length; i++) {
          this.groupData.push(this.config[i]);
          if (this.groupData[i]) {
            this.mapType = this.groupData[i].mapType;
            this.showButton = !this.groupData[i].viewOnly;
            this.showSaveButton = this.groupData[i].showSaveButton;
            this.showLocInfo = this.groupData[i].showLocInfo ? true : false;
          }
          if (this.groupData[i]?.zoomModel?.featureName && this.zoomToRequest) {
            this.zoomToRequest(
              this.groupData[i].zoomModel.referenceId,
              this.groupData[i].zoomModel.featureName
            );
          }
        }
      }
    }
    this.lang = this.translationService.getSelectedLanguage();

    if (Array.isArray(this.config)) {
      if (this.config.length > 0) {
        for (let i = 0; i < this.config.length; i++) {
          this.groupData.push(this.config[i]);
        }
      }
    } else {
      if (this.config) {
        this.data = this.config;
      }
    }

    if (this.configData) {
      this.data = this.configData;
      this.smallSize = true;
    }
    if (this.data) {
      this.mapType = this.data.mapType;
      this.showButton = !this.data.viewOnly;
      this.showSaveButton = this.data.showSaveButton;
      this.showLocInfo = this.data.showLocInfo ?? true;
      this.mapType === 'reporter'
        ? (this.currentLocation = false)
        : (this.currentLocation = true);
    }
    if (Array.isArray(this.groupData) && this.groupData.length > 0) {
      for (let i = 0; i < this.groupData.length; i++) {
        if (this.groupData[i]) {
          this.mapType = this.groupData[i].mapType;
          this.showButton = !this.groupData[i].viewOnly;
          this.showSaveButton = this.groupData[i].showSaveButton;
          this.showLocInfo = this.groupData[i].showLocInfo ?? true;
        }
      }
    }
    this.applyStyle();
    const map = this.initializeMap().then(() => {
      if (this.mapType === 'reporter' && !this.data?.viewOnly) {
        this.addReporterPoint();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.currentLocationOfUser) {
        let btn = document.querySelector(
          '.esri-component.esri-locate.esri-widget--button.esri-widget'
        );
        btn.addEventListener('click', () => {});
        let clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      }
    }, 7000);
  }

  async initializeMap() {
    // Load the modules for the ArcGIS API for JavaScript
    try {
      const [
        Map,
        MapView,
        MapImageLayer,
        FeatureLayer,
        Query,
        QueryTask,
        Draw,
        geometryEngine,
        Home,
        Compass,
        Graphic,
        GraphicsLayer,
        WMSLayer,
        Track,
      ] = await this.mapService.loadModules([
        EsriModule.Map,
        EsriModule.MapView,
        EsriModule.MapImageLayer,
        EsriModule.FeatureLayer,
        EsriModule.Query,
        EsriModule.QueryTask,
        EsriModule.Draw,
        EsriModule.geometryEngine,
        EsriModule.Home,
        EsriModule.Compass,
        EsriModule.Graphic,
        EsriModule.GraphicsLayer,
        EsriModule.WMSLayer,
        EsriModule.Track,
      ]);

      this.createQueryTask = (url: string) => new QueryTask(url);
      this.createQuery = () => new Query();

      // -------------------------------------------------------- START FEATURE LAYERS --------------------------------------

      const IncPointFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPointFeatureService',
        layerId: 0,
      });

      const TskPointFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPointFeatureService',
        layerId: 1,
      });

      const IncLineFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncLineFeatureService',
        layerId: 2,
      });

      const TskLineFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskLineFeatureService',
        layerId: 3,
      });

      const IncPolygonFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPolygonFeatureService',
        layerId: 4,
      });

      const TskPolygonFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPolygonFeatureService',
        layerId: 5,
      });

      const OrgPointFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPolygonFeatureService',
        layerId: 6,
      });

      // -------------------------------------------------------- END FEATURE LAYERS --------------------------------------

      // -------------------------------------------------------- START ONWANI LAYERS --------------------------------------
      const ONWANI_ADMIN_BOUNDRIES_IMAGE_LAYER: __esri.MapImageLayer =
        new MapImageLayer({
          url: `https://onwani.abudhabi.ae/arcgis/rest/services/MSSI/ADMINBOUNDARIES/MapServer`,
          id: 'MunicipalityImage',
          title: 'Municipality',
          opacity: 0.2,
          maxScale: 1155000,
        } as __esri.MapImageLayerProperties);

      // new layer start

      // new layer end
      const ONWANI_ADMIN_BOUNDRIES_DISTRICT_IMAGE_LAYER: __esri.MapImageLayer =
        new MapImageLayer({
          url: `/agsupc/rest/services/DevelopmentCode/DPM_DevCode${
            this.lang == 'ar' ? '_Ara' : '_Eng'
          }/MapServer`,
          id: 'ONWANI_ADMIN_BOUNDRIES_DISTRICT_IMAGE_LAYER',
          tilte: 'Districts',
          transparent: true,
          minScale: 1155600,
          sublayers: [
            {
              id: this.lang == 'ar' ? 147 : 23,
              visible: true,
            },
          ],
        } as __esri.MapImageLayerProperties);

      const ONWANI_ADMIN_BOUNDRIES_PLOT_IMAGE_LAYER: __esri.MapImageLayer =
        new MapImageLayer({
          url: `/agsupc/rest/services/GeoPlanner2/Planning_Municipalities4/MapServer`,
          id: 'ONWANI_ADMIN_BOUNDRIES_PLOT_IMAGE_LAYER',
          tilte: 'Plots',
          transparent: true,
          minScale: 10000,
          sublayers: [
            {
              id: this.lang == 'ar' ? 22 : 7,
              visible: true,
            },
          ],
        } as __esri.MapImageLayerProperties);

      const ONWANI_STREET_IMAGE_LAYER: __esri.WMSLayer = new WMSLayer({
        url: '/geoserver/wms',
        format: 'png',
        customLayerParameters: {
          styles: this.lang === 'en' ? 'Street_En' : 'Street',
        },
        copyright: 'GeoServer',
        description: 'AAM Data',
        minScale: 10000,
        version: '1.3.0',
        visible: true,
        id: 'ONWANI_STREET_IMAGE_LAYER',
        sublayers: [
          {
            name: 'geosmart:streets',
          },
        ],
      } as __esri.WMSLayerProperties);

      // -------------------------------------------------------- END ONWANI LAYERS --------------------------------------

      this.queryInfo = async (graphic: esri.Graphic) => {
        const queryGemotry = async (
          queryTask: __esri.QueryTask,
          query: __esri.Query,
          g: esri.Geometry
        ) => {
          query.geometry = g;
          query.spatialRelationship = 'within';
          query.outFields = ['*'];
          query.returnGeometry = true;
          const result = await queryTask.execute(query);
          return result.features[0];
        };

        const queryResult = await queryGemotry(
          this.createQueryTask(DZSP_SEARCH_URL + DZSP_ID_COMMUNITY),
          this.createQuery(),
          graphic.geometry
        );
        const locationInfo: LocationInfoModel = queryResult.attributes;

        this.zoomedLocationInfo.zoneAr = locationInfo.MUNICIPALITYARA;
        this.zoomedLocationInfo.zoneEn = locationInfo.MUNICIPALITY;

        this.zoomedLocationInfo.sectorEn = locationInfo.DISTRICTNAMEENG;
        this.zoomedLocationInfo.sectorAr = locationInfo.DISTRICTARA;

        this.zoomedLocationInfo.plotEn = locationInfo.COMMUNITYNAMEENG;

        this.zoomedLocationInfo.plotAr = locationInfo.COMMUNITYNAMEARA;

        this.cdr.detectChanges();
        return locationInfo;
      };

      // Configure the Map
      const ABUDHABI_ARCGIS_BASE_IMAGE_LAYER: __esri.MapImageLayer =
        new MapImageLayer({
          url: `https://arcgis.sdi.abudhabi.ae/arcgis/rest/services/Pub/BaseMap${
            this.lang == 'ar' ? 'Ara' : 'Eng'
          }_LightGray_WM/MapServer`,
          sublayers: [
            { id: 0, visible: true },
            { id: 423, visible: false },
          ],
        } as __esri.MapImageLayerProperties);
      const mapProperties: esri.MapProperties = {
        basemap: 'satellite',
        layers: [
          ONWANI_ADMIN_BOUNDRIES_IMAGE_LAYER,
          ABUDHABI_ARCGIS_BASE_IMAGE_LAYER,
          ONWANI_ADMIN_BOUNDRIES_DISTRICT_IMAGE_LAYER,
          ONWANI_ADMIN_BOUNDRIES_PLOT_IMAGE_LAYER,
        ],
      };

      this.map = new Map(mapProperties);
      this.map.add(ONWANI_STREET_IMAGE_LAYER);
      this.addressGraphicsLayer = new GraphicsLayer();
      this.DZSP_GRAPHICS_LAYER = new GraphicsLayer();
      this.map.add(this.DZSP_GRAPHICS_LAYER);
      this.map.add(this.addressGraphicsLayer);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: document.getElementById('map') as HTMLDivElement,
        // center: [54.3773, 24.4539],
        center: [53.8248, 24.0088],
        constraints: {
          snapToZoom: true,
        },
        // scale: 700000,
        zoom: 8,
        map: this.map,
        popup: this.popupBuidler.popupOptions,

        highlightOptions: {
          color: 'orange',
        },
        spatialReference: { wkid: 102100 },
      };

      this.mapView = new MapView(mapViewProperties);
      // open popups just for symboles
      this.mapView.on('click', (e) => {
        this.mapView.hitTest(e).then((res) => {
          if (res.results.length > 0) {
            if (this.mapView.graphics.includes(res.results[0].graphic)) {
              this.mapView.popup.open({
                location: res.results[0].graphic.geometry,
                features: res.results.map((r) => r.graphic),
              });
            }
          }
        });
      });

      // ---------------------------------- START DEFINE FUNCTIONS ------------------------------------

      /*************************
       * Create a point graphic
       *************************/
      this.zoomToAddress = (address: AddressSearchResultModel) => {
        this.addressGraphicsLayer.removeAll();
        let polgonSymbol = {
          type: 'simple-fill', // autocasts as SimpleFillSymbol
          style: 'diagonal-cross',
          color: [0, 0, 0, 0.1],
          outline: {
            // autocasts as SimpleLineSymbol
            color: [4, 90, 141],
            width: 4,
            cap: 'round',
            join: 'round',
          },
        };

        let polylineSymbol = {
          type: 'simple-line', // autocasts as new SimpleFillSymbol
          color: [255, 0, 0],
          width: 4,
          cap: 'round',
          join: 'round',
        };

        let pointSymbol = {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          color: [226, 119, 40],
          // type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          // url: 'https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png',
          // width: '64px',
          // height: '64px',
        };
        // Create a graphic and add the geometry and symbol to it
        const mapMarker: __esri.Graphic = new Graphic({
          geometry: {
            type: address?.type || 'point', // autocasts as new Point()
            longitude: address?.Lng,
            latitude: address?.Lat,
            rings: [address?.polygonRings],
            paths: [address?.polylinePaths],
            spatialReference: this.mapView.spatialReference,
            hasM: true,
            hasZ: address?.type == 'polygon',
          },
          symbol:
            address?.type == 'polygon'
              ? polgonSymbol
              : address?.type == 'polyline'
              ? polylineSymbol
              : pointSymbol,
          popupTemplate: {
            title:
              address?.type == 'polygon'
                ? this.translationService.translateAWord(
                    'INCIDENTS.TEAM_LOCATION'
                  )
                : this.title
                ? this.title
                : this.translationService.translateAWord('INCIDENTS.REPORTER'), //'Location Shared By Reporter',
            content: (feature: __esri.Feature) => {
              return `${address.Address}`;
            },
            outFields: ['*'],
          } as __esri.PopupTemplateProperties,
        } as __esri.GraphicProperties);

        // Add the graphics to the view's graphics layer
        this.mapView.zoom = address.zoom;
        this.addressGraphicsLayer.add(mapMarker);
        this.mapView
          .goTo(mapMarker, { animate: true, duration: 2000 })
          .then(() => {
            this.mapView.popup.open({ features: [mapMarker] });
            this.mapView.popup.triggerAction(0);
          });
      };

      /*************************
       * Create a point graphic for Multiple Locations
       *************************/

      this.zoomToGroupAddress = (address: AddressSearchResultModel) => {
        let polgonSymbol = {
          type: 'simple-fill',
          style: 'diagonal-cross',
          color: [0, 0, 0, 0.1],
          outline: {
            color: [4, 90, 141],
            width: 4,
            cap: 'round',
            join: 'round',
          },
        };

        let polylineSymbol = {
          type: 'simple-line',
          color: [255, 0, 0],
          width: 4,
          cap: 'round',
          join: 'round',
        };

        let pointSymbol = {
          type: 'simple-marker',
          color: [226, 119, 40],
        };
        // Create a graphic and add the geometry and symbol to it
        const mapMarker: __esri.Graphic = new Graphic({
          geometry: {
            type: address?.type || 'point', // autocasts as new Point()
            longitude: address?.Lng,
            latitude: address?.Lat,
            rings: [address?.polygonRings],
            paths: [address?.polylinePaths],
            spatialReference: this.mapView.spatialReference,
            hasM: true,
            hasZ: address?.type == 'polygon',
          },
          symbol:
            address?.type == 'polygon'
              ? polgonSymbol
              : address?.type == 'polyline'
              ? polylineSymbol
              : pointSymbol,
        } as __esri.GraphicProperties);

        // Add the graphics to the view's graphics layer
        this.mapView.zoom = address.zoom;
        this.addressGraphicsLayer.add(mapMarker);
      };
      // ---------------------------------- END DEFINE FUNCTIONS ------------------------------------

      const filterLayers = (where, fName: MapActionType) => {
        let TaskUrl;
        let Symbol;

        switch (fName) {
          case MapActionType.INCIDENT_POINT:
            TaskUrl = IncPointFeatureService.url + '/0';
            Symbol = {
              // type: 'simple-marker',
              // style: 'path',
              // path: 'M213.2 32H288V96c0 17.7 14.3 32 32 32s32-14.3 32-32V32h74.8c27.1 0 51.3 17.1 60.3 42.6l42.7 120.6c-10.9-2.1-22.2-3.2-33.8-3.2c-59.5 0-112.1 29.6-144 74.8V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7 14.3 32 32 32c2.3 0 4.6-.3 6.8-.7c-4.5 15.5-6.8 31.8-6.8 48.7c0 5.4 .2 10.7 .7 16l-.7 0c-17.7 0-32 14.3-32 32v64H86.6C56.5 480 32 455.5 32 425.4c0-6.2 1.1-12.4 3.1-18.2L152.9 74.6C162 49.1 186.1 32 213.2 32zM352 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L480 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z',
              // color: 'red',
              // size: '26px',
              type: 'simple-marker',
              style: 'circle',
              color: 'red',
              size: '16px',
            };
            break;

          case MapActionType.INCIDENT_POLYLINE:
            TaskUrl = IncLineFeatureService.url + '/2';
            Symbol = {
              type: 'simple-line',
              color: [4, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };
            break;

          case MapActionType.INCIDENT_POLYGON:
            TaskUrl = IncPolygonFeatureService.url + '/4';
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;

          case MapActionType.TASK_POINT:
            TaskUrl = TskPointFeatureService.url + '/1';
            Symbol = {
              type: 'simple-marker',
              style: 'circle',
              color: 'green',
              size: '16px',
            };
            break;

          case MapActionType.TASK_POLYLINE:
            TaskUrl = TskLineFeatureService.url + '/3';
            Symbol = {
              type: 'simple-line',
              color: [200, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };
            break;

          case MapActionType.TASK_POLYGON:
            TaskUrl = TskPolygonFeatureService.url + '/5';
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;

          case MapActionType.ORGRANIZATION_POINT:
            TaskUrl = TskPointFeatureService.url + '/6';
            Symbol = {
              type: 'simple-marker',
              style: 'circle',
              color: 'yellow',
              size: '16px',
            };
            break;
        }

        const wrapper = this;
        const queryTask: esri.QueryTask = new QueryTask(TaskUrl);
        const query: esri.Query = new Query();
        query.outSpatialReference = wrapper.mapView.spatialReference;
        query.returnGeometry = true;
        query.outFields = ['*'];
        query.where = where;
        queryTask.execute(query).then((result) => {
          // *** ADD ***//

          const graphics = result.features
            .filter((f) => !!f.geometry.get('x') && !!f.geometry.get('y'))
            .map((item) => {
              item.symbol = Symbol;
              switch (fName) {
                case MapActionType.INCIDENT_POINT:
                case MapActionType.INCIDENT_POLYLINE:
                case MapActionType.INCIDENT_POLYGON:
                case MapActionType.ORGRANIZATION_POINT:
                  item.popupTemplate = this.popupBuidler.buildPopup('Incident');
                  break;

                case MapActionType.TASK_POINT:
                case MapActionType.TASK_POLYLINE:
                case MapActionType.TASK_POLYGON:
                  item.popupTemplate = this.popupBuidler.buildPopup('Task');
                  break;
              }
              return item;
            });

          // Zoom to the data returned
          wrapper.mapView.when(async () => {
            wrapper.mapView.graphics.addMany(graphics);
            if (
              wrapper.data?.viewOnly &&
              !!wrapper.data?.zoomModel?.referenceId
            ) {
              // fill zone, sector, plot data
              await this.queryInfo(graphics[0]);
            }
          });
        });
      };

      this.addLayer = async (layer) => {
        const newLayer: esri.FeatureLayer = new FeatureLayer(layer);
        newLayer.opacity = 0.8;
        this.map.add(newLayer);
      };

      this.removeLayer = (layerId: number) => {
        const alreadyAdded = this.map.findLayerById(layerId?.toString());
        if (alreadyAdded) {
          this.map.remove(alreadyAdded);
        }
      };

      this.filterLayersFunc$.next(filterLayers);

      const clearGraphics = () => {
        this.mapView.graphics.removeAll();
      };

      await this.mapView.when(async () => {
        setTimeout(async (_) => {
          if (this.dashboardMode) {
            await this.showDashboardGraphics(filterLayers);
          }
        }, 2000);
        this.draw = new Draw({
          view: this.mapView,
        });

        if (!this.smallSize) {
          this.mapView?.ui.add('map-topbar', { position: 'manual', index: 0 });
          this.mapView?.ui.add('topbar-toggler', { position: 'top-trailing' });
        }

        this.mapView?.ui.add('refresh-btn', { position: 'top-trailing' });

        const homeBtn = new Home({ view: this.mapView });
        !this.smallSize && this.mapView.ui.add(homeBtn, 'top-trailing');

        const compass = new Compass({ view: this.mapView });
        !this.smallSize && this.mapView.ui.add(compass, 'top-trailing');

        const findMyLocation = new Track({ view: this.mapView });
        !this.currentLocation &&
          this.mapView.ui.add(findMyLocation, 'top-right');

        if (Array.isArray(this.groupData) && this.groupData.length > 0) {
          // for multiple Location to show
          for (let i = 0; i < this.groupData.length; i++) {
            if (this.groupData[i]?.pointLocation) {
              this.zoomToGroupAddress(this.groupData[i]?.pointLocation);
            }
            if (this.groupData[i]?.polygonLocation) {
              this.zoomToGroupAddress(this.groupData[i].polygonLocation);
            }
            if (this.groupData[i]?.polylineLocation) {
              this.zoomToGroupAddress(this.groupData[i].polylineLocation);
            }
          }
        } else {
          if (this.data?.pointLocation) {
            this.zoomToAddress(this.data?.pointLocation);
          }

          if (this.data?.polygonLocation) {
            this.zoomToAddress(this.data.polygonLocation);
          }

          if (this.data?.polylineLocation) {
            this.zoomToAddress(this.data.polylineLocation);
          }
        }

        // if (this.configData) {
        //   this.addReporterPoint();
        // }
      });

      const drawPoint = (Type, previousLocation?) => {
        function enableCreatePoint(draw, mapView) {
          const action = draw.create('point', { mode: 'click' });

          action.on('draw-complete', (evt) => {
            createPointGraphic(
              evt.coordinates,
              mapView,
              Type,
              previousLocation
            );
          });
        }
        enableCreatePoint(this.draw, this.mapView);
        if (Type === 'Reporter_Point' && previousLocation) {
          this.saveMap();
        }
      };

      function createPointGraphic(coordinates, mapView, Type, lastLocation?) {
        if (Type === 'Reporter_Point') {
        } else {
          mapView.graphics.removeAll();
        }
        const point = {
          type: 'point',
          x: coordinates[0],
          y: coordinates[1],
          spatialReference: mapView.spatialReference,
        };
        let previousGraphic = new Graphic();
        if (Type === 'Reporter_Point' && lastLocation) {
          mapView.graphics.remove(lastLocation);
        }
        const graphic = new Graphic({
          geometry: point,
          attributes: { gType: Type },
          symbol: {
            type: 'simple-marker',
            style: 'square',
            color: 'red',
            size: '16px',
            outline: {
              // auto casts as SimpleLineSymbol
              color: [255, 255, 0],
              width: 3,
            },
          },
        });
        previousGraphic = graphic;
        mapView.graphics.add(graphic);
        if (Type === 'Reporter_Point') {
          drawPoint('Reporter_Point', previousGraphic);
        }
      }

      const drawLine = (Type) => {
        enableCreatePolyline(this.draw, this.mapView);

        function enableCreatePolyline(draw, mapView) {
          mapView.graphics.removeAll();
          const action = draw.create('polyline');
          mapView.focus();
          action.on(
            ['vertex-add', 'vertex-remove', 'cursor-update', 'draw-complete'],
            (evt) => {
              updateVertices(evt, mapView);
            }
          );
        }

        // Checks if the last vertex is making the line intersect itself.
        function updateVertices(event, mapView) {
          // create a polyline from returned vertices
          if (event.vertices.length > 1) {
            const result = createGraphic(event, mapView);

            // if the last vertex is making the line intersects itself,

            if (result.selfIntersects) {
              event.preventDefault();
            }
          }
        }

        // create a new graphic presenting the polyline that is being drawn on the view
        function createGraphic(event, mapView) {
          const vertices = event.vertices;
          mapView.graphics.removeAll();

          // a graphic representing the polyline that is being drawn
          const graphic = new Graphic({
            geometry: {
              type: 'polyline',
              paths: vertices,
              spatialReference: mapView.spatialReference,
            },
            attributes: { gType: Type },
            symbol: {
              type: 'simple-line', // autocasts as new SimpleFillSymbol
              color: [255, 0, 0],
              width: 4,
              cap: 'round',
              join: 'round',
            },
          });

          // check if the polyline intersects itself.
          const intersectingSegment = getIntersectingSegment(graphic.geometry);

          // Add a new graphic for the intersecting segment.
          if (intersectingSegment) {
            mapView.graphics.addMany([graphic, intersectingSegment]);
          }
          // Just add the graphic representing the polyline if no intersection
          else {
            mapView.graphics.add(graphic);
          }

          // return intersectingSegment
          return {
            selfIntersects: intersectingSegment,
          };
        }

        function isSelfIntersecting(polyline) {
          if (polyline.paths[0].length < 3) {
            return false;
          }
          const line = polyline.clone();

          const lastSegment = getLastSegment(polyline);
          line.removePoint(0, line.paths[0].length - 1);

          return geometryEngine.crosses(lastSegment, line);
        }

        function getIntersectingSegment(polyline) {
          if (isSelfIntersecting(polyline)) {
            return new Graphic({
              geometry: getLastSegment(polyline),
              symbol: {
                type: 'simple-line', // autocasts as new SimpleLineSymbol
                style: 'short-dot',
                width: 3.5,
                color: 'yellow',
              },
            });
          }
          return null;
        }

        function getLastSegment(polyline) {
          const line = polyline.clone();
          const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
          const existingLineFinalPoint = line.getPoint(
            0,
            line.paths[0].length - 1
          );

          return {
            type: 'polyline',
            spatialReference: line.spatialReference,
            hasZ: false,
            paths: [
              [
                [existingLineFinalPoint.x, existingLineFinalPoint.y],
                [lastXYPoint.x, lastXYPoint.y],
              ],
            ],
          };
        }
      };

      const drawPolygon = (Type) => {
        enableCreatePolygon(this.draw, this.mapView);

        function enableCreatePolygon(draw, mapView) {
          const action = draw.create('polygon');

          mapView.focus();

          // listen polylineDrawAction events to give immediate visual feedback
          // to users as the line is being drawn on the view.
          action.on(
            ['vertex-add', 'vertex-remove', 'cursor-update', 'draw-complete'],
            (evt) => {
              createPolygonGraphic(evt, mapView);
            }
          );
        }

        function createPolygonGraphic(event, mapView) {
          const vertices = event.vertices;

          mapView.graphics.removeAll();
          const polygon = {
            type: 'polygon', // autocasts as Polygon
            rings: vertices,
            spatialReference: mapView.spatialReference,
          };

          const graphic = new Graphic({
            geometry: polygon,
            attributes: { gType: Type },
            symbol: {
              type: 'simple-fill', // autocasts as SimpleFillSymbol
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: {
                // autocasts as SimpleLineSymbol
                color: [4, 90, 141],
                width: 4,
                cap: 'round',
                join: 'round',
              },
            },
          });
          mapView.graphics.add(graphic);
        }
      };

      this.addIncidentPoint = () => {
        drawPoint('Inc_point');
      };

      this.addIncidentPolyline = () => {
        drawLine('Inc_Polyline');
      };

      this.addIncidentPolygon = () => {
        drawPolygon('Inc_Polygon');
      };

      this.addTaskPoint = () => {
        drawPoint('Tsk_point');
      };

      this.addTaskPolyline = () => {
        drawLine('Tsk_Polyline');
      };

      this.addTaskPolygon = () => {
        drawPolygon('Tsk_Polygon');
      };

      this.addOrgPoint = () => {
        drawPoint('Org_point');
      };

      this.addAssetPoint = () => {
        drawPoint('Asset_point');
      };

      this.addTeamPolyline = () => {
        drawLine('Team_Polyline');
      };

      this.addTeamPolygon = () => {
        drawPolygon('Team_Polygon');
      };

      this.addReporterPoint = () => {
        drawPoint('Reporter_Point');
      };

      const applyFeature = async (taskIncidentData: TaskIncidentGisData) => {
        // delete old graphics from gis system if exists before save new one.
        await this.deleteOldGraphicsFromGis(
          ApplyEdits,
          IncPointFeatureService,
          IncLineFeatureService,
          IncPolygonFeatureService,
          TskPointFeatureService,
          TskLineFeatureService,
          TskPolygonFeatureService
        );

        // save new graphic in gis
        const graphic = this.mapView.graphics.getItemAt(0);
        switch (graphic.attributes.gType) {
          case MapActionType.INCIDENT_POINT:
          case MapActionType.INCIDENT_POLYLINE:
          case MapActionType.INCIDENT_POLYGON:
            graphic.attributes = {
              INCIDENT_REF_ID: taskIncidentData.refId,
              NAME: taskIncidentData.title,
              LEVELID: taskIncidentData.levelId,
              PRIORITY: taskIncidentData.priorityId,
              ORG_NAME: taskIncidentData.orgName,
              INC_CATEGORY: taskIncidentData.inc_category,
              CUST_ATTR_1: graphic.attributes.gType,
              CITY: taskIncidentData.city,
              CREATION_DATE: DateTimeUtil.format(
                taskIncidentData.creation_date,
                'YYYY-MM-DD HH:mm:ss'
              ),
            };
            await ApplyEdits(
              graphic,
              IncPointFeatureService,
              IncPointFeatureService.id
            );
            break;

          case MapActionType.TASK_POINT:
          case MapActionType.TASK_POLYLINE:
          case MapActionType.TASK_POLYGON:
            graphic.attributes = {
              INCIDENT_REF_ID: taskIncidentData.inc_ref_id,
              TASK_REF_ID: taskIncidentData.refId,
              NAME: taskIncidentData.title,
              PRIORITY: taskIncidentData.priorityId,
              ORG_NAME: taskIncidentData.orgName,
              DUE_DATE: DateTimeUtil.format(
                taskIncidentData.dueDate,
                'YYYY-MM-DD HH:mm:ss'
              ),
              CLOSE_DATE: DateTimeUtil.format(
                taskIncidentData.closeDate,
                'YYYY-MM-DD HH:mm:ss'
              ),
              TASK_TYPE: taskIncidentData.type,
              CUST_ATTR_1: graphic.attributes.gType,
            };
            await ApplyEdits(
              graphic,
              TskPointFeatureService,
              TskPointFeatureService.id
            );
            break;
        }
        return graphic.attributes.gType;
      };

      this.applyFeature = async (taskIncidentData: TaskIncidentGisData) => {
        this.alertService.openSuccessSnackBarWithMsg(
          this.translationService.get('SHARED.NOTIFICATION.MAP_UPDATE'),
          5000
        );
        await applyFeature(taskIncidentData);
        this.mapView?.destroy();
        this.map?.destroy();
      };

      const ApplyEdits = async (
        graphic,
        fService: esri.FeatureLayer,
        fName,
        type: 'addFeatures' | 'deleteFeatures' = 'addFeatures'
      ) => {
        let Result = false;

        let edits: {};
        if (type === 'deleteFeatures') {
          edits = { deleteFeatures: [graphic] };
        } else {
          edits = { addFeatures: [graphic] };
        }
        // esri.FeatureLayerApplyEditsEdits;
        await fService
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
                    Result = true;
                  }
                  return Result;
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
                    Result = true;
                  }
                  return Result;
                }
                break;
            }
          })
          .catch((error) => {
            console.error(
              '[ applyEdits ] FAILURE: ',
              error.code,
              error.name,
              error.message
            );

            return Result;
          });
      };

      this.zoomToRequest = (REF_ID, fName: MapActionType) => {
        let where;
        let TaskUrl;
        let Symbol;
        switch (fName) {
          case MapActionType.INCIDENT_POINT:
            TaskUrl = IncPointFeatureService.url + '/0';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-marker',
              style: 'square',
              color: 'red',
              size: '16px',
              outline: { color: [255, 255, 0], width: 3 },
            };
            break;

          case MapActionType.INCIDENT_POLYLINE:
            TaskUrl = IncLineFeatureService.url + '/2';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-line',
              color: [4, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };
            break;

          case MapActionType.INCIDENT_POLYGON:
            TaskUrl = IncPolygonFeatureService.url + '/4';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;

          case MapActionType.TASK_POINT:
            TaskUrl = TskPointFeatureService.url + '/1';
            where = "TASK_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-marker',
              style: 'square',
              color: 'red',
              size: '16px',
              outline: { color: [255, 255, 0], width: 3 },
            };
            break;

          case MapActionType.TASK_POLYLINE:
            TaskUrl = TskLineFeatureService.url + '/3';
            where = "TASK_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-line',
              color: [200, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };
            break;

          case MapActionType.TASK_POLYGON:
            TaskUrl = TskPolygonFeatureService.url + '/5';
            where = "TASK_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;
        }

        const wrapper = this;
        const queryTask: esri.QueryTask = new QueryTask(TaskUrl);
        const query: esri.Query = new Query();
        query.outSpatialReference = wrapper.mapView.spatialReference;
        query.returnGeometry = true;
        query.outFields = ['*'];
        query.where = where;
        queryTask.execute(query).then((result) => {
          if (result.features.length === 0) {
            wrapper.mapView.graphics.removeAll();
            this.OnFetchCoordinates.emit(false);
            return;
          }
          this.OnFetchCoordinates.emit(true);
          wrapper.mapView.graphics.removeAll();
          // *** ADD ***//
          const graphics = result.features.map((item) => {
            item.symbol = Symbol;
            switch (fName) {
              case MapActionType.INCIDENT_POINT:
              case MapActionType.INCIDENT_POLYGON:
              case MapActionType.INCIDENT_POLYLINE:
                item.popupTemplate = this.popupBuidler.buildPopup('Incident');
                break;

              case MapActionType.TASK_POINT:
              case MapActionType.TASK_POLYLINE:
              case MapActionType.TASK_POLYGON:
                item.popupTemplate = this.popupBuidler.buildPopup('Task');
                break;
              default:
                item.popupTemplate = this.popupBuidler.buildPopup('Task');
                break;
            }

            return item;
          });
          wrapper.oldGraphics = graphics;

          // Zoom to the data returned
          wrapper.mapView.when(async () => {
            graphics.forEach((g) => {
              wrapper.mapView.graphics.add(g);
            });
            if (
              wrapper.data?.viewOnly &&
              !!wrapper.data?.zoomModel?.referenceId
            ) {
              // fill zone, sector, plot data
              const result = await this.queryInfo(graphics[0]);
            }

            wrapper.mapView
              .goTo(graphics, { animate: true, duration: 2000 })
              .then((_) => {
                const zoomView =
                  graphics?.length === 1 &&
                  graphics[0]?.geometry?.type === 'point'
                    ? wrapper.mapView.extent.expand(0.2)
                    : wrapper.mapView.extent.expand(2);
                wrapper.mapView.goTo(zoomView);
              });
          });
        });
      };

      if (this.data.zoomModel?.featureName) {
        this.zoomToRequest(
          this.data.zoomModel.referenceId,
          this.data.zoomModel.featureName
        );
      }

      return this.mapView;
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }

  private async showDashboardGraphics(
    filterLayers: (where, fName: MapActionType) => void
  ) {
    const org = this.commonService.getCommonData()?.currentOrgDetails;
    if (!org) {
      return;
    }
    const orgChildOrgs = await this.orgService
      .getOrgChild(org.id)
      .pipe(map((orgs: any[]) => orgs.map((o) => o?.code)))
      .toPromise();
    let orgs = `( `;
    orgChildOrgs.forEach((c) => {
      orgs += `'${c}',`;
    });
    orgs = `${orgs.slice(0, orgs.length - 1)} )`;

    const incidentIds: string[] = await this.incidentsService
      .getIncidentsIds(
        0,
        {
          status: 1,
        },
        null,
        100000
      )
      .pipe(map((res) => res?.result))
      .toPromise();
    const temp = 1000;
    let loopCount = 0;
    loopCount = incidentIds.length / temp;
    let start = 0;
    let end = 1000;
    for (let i = 0; i <= loopCount; i++) {
      const incidentIdsAterLimit = incidentIds.slice(start, end);
      start = end;
      end = start + 1000;
      let incidents = `(`;
      incidentIdsAterLimit.forEach((id) => (incidents += `${id},`));
      incidents = `${incidents.slice(0, incidents.length - 1)} )`;

      const where = `INCIDENT_REF_ID in ${incidents}`;
      filterLayers(where, MapActionType.INCIDENT_POINT);
      filterLayers(where, MapActionType.INCIDENT_POLYLINE);
      filterLayers(where, MapActionType.INCIDENT_POLYGON);
    }
    const taskIds = await this.incidentsService
      .getMyAssignedOrgTaskIds(0, { status: 6 }, null, 10)
      .pipe(map((r) => r.result))
      .toPromise();
    const tempTask = 1000;
    let loopCountTask = 0;
    loopCountTask = taskIds.length / tempTask;
    let startTask = 0;
    let endTask = 1000;
    for (let i = 0; i <= loopCountTask; i++) {
      const TaskIdsAterLimit = incidentIds.slice(startTask, endTask);
      startTask = endTask;
      endTask = startTask + 1000;

      let tasks = `(`;
      TaskIdsAterLimit.forEach((id) => (tasks += `${id},`));
      tasks = `${tasks.slice(0, tasks.length - 1)} )`;

      const con = `ORG_NAME in ${orgs} and TASK_REF_ID in ${tasks}`;
      filterLayers(con, MapActionType.TASK_POINT);
      filterLayers(con, MapActionType.TASK_POLYLINE);
      filterLayers(con, MapActionType.TASK_POLYGON);
    }
  }

  private async deleteOldGraphicsFromGis(
    ApplyEdits: (
      graphic,
      fService: __esri.FeatureLayer,
      fName,
      type?: 'addFeatures' | 'deleteFeatures'
    ) => Promise<void>,
    IncPointFeatureService,
    IncLineFeatureService,
    IncPolygonFeatureService,
    TskPointFeatureService,
    TskLineFeatureService,
    TskPolygonFeatureService
  ) {
    if (this.oldGraphics != null) {
      for (const g of this.oldGraphics) {
        switch (this.data.zoomModel?.featureName) {
          case MapActionType.INCIDENT_POINT:
            await ApplyEdits(g, IncPointFeatureService, '', 'deleteFeatures');
            break;

          case MapActionType.INCIDENT_POLYLINE:
            await ApplyEdits(g, IncLineFeatureService, '', 'deleteFeatures');
            break;

          case MapActionType.INCIDENT_POLYGON:
            await ApplyEdits(g, IncPolygonFeatureService, '', 'deleteFeatures');
            break;

          case MapActionType.TASK_POINT:
            await ApplyEdits(g, TskPointFeatureService, '', 'deleteFeatures');
            break;

          case MapActionType.TASK_POLYLINE:
            await ApplyEdits(g, TskLineFeatureService, '', 'deleteFeatures');
            break;

          case MapActionType.TASK_POLYGON:
            await ApplyEdits(g, TskPolygonFeatureService, '', 'deleteFeatures');
            break;
        }
      }
    }
  }

  private applyStyle() {
    const sub = this.themeFacade.vm$
      .pipe(map((s) => s.ActiveTheme))
      .subscribe((theme) => {
        if (theme.endsWith('dark')) {
          this.linkService.RemoveTag('esri_map_style');
          this.linkService.AddTag({
            id: 'esri_map_style',
            rel: 'stylesheet',
            href: './assets/css/esri.dark-blue.min.css',
          });
          this.mapView?.when((_) => {
            this.baseMapToggle?.toggle();
          });
        } else {
          this.linkService.RemoveTag('esri_map_style');
          this.linkService.AddTag({
            id: 'esri_map_style',
            rel: 'stylesheet',
            href: './assets/css/esri.min.css',
          });
          this.mapView?.when((_) => {
            this.baseMapToggle?.toggle();
          });
        }
      });
    this.subscriptions.push(sub);
  }

  public async saveMap() {
    this.loading = true;
    this.cdr.detectChanges();
    // query info of community and district of selected location on map
    let result;
    try {
      result = await this.queryInfo(this.mapView.graphics.getItemAt(0));
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
    this.cdr.detectChanges();
    let graphicPoint;
    if (this.mapType === 'reporter') {
      if (this.mapView?.graphics?.getItemAt(1)) {
        graphicPoint = this.mapView?.graphics?.getItemAt(1);
      } else {
        graphicPoint = this.mapView?.graphics?.getItemAt(0);
      }
    } else {
      graphicPoint = this.mapView?.graphics?.getItemAt(0);
    }

    this.OnSaveMap.emit({
      ff: this.applyFeature,
      gType: graphicPoint?.attributes?.gType,
      polygonCoordinates: graphicPoint?.geometry?.['rings'],
      polylineCoordinates: graphicPoint?.geometry?.['paths'],
      locationInfo: result,
      pointCoordinates: {
        latitude: graphicPoint.geometry['latitude'],
        longitude: graphicPoint.geometry['longitude'],
        x: graphicPoint.geometry['x'],
        y: graphicPoint.geometry['y'],
      },
    });

    if (this.dialogRef) {
      this.dialogRef.close({
        ff: this.applyFeature,
        gType: graphicPoint?.attributes?.gType,
        polygonCoordinates: graphicPoint?.geometry?.['rings'],
        polylineCoordinates: graphicPoint?.geometry?.['paths'],
        locationInfo: result,
        pointCoordinates: {
          latitude: graphicPoint.geometry['latitude'],
          longitude: graphicPoint.geometry['longitude'],
          x: graphicPoint.geometry['x'],
          y: graphicPoint.geometry['y'],
        },
      });
    }
  }

  get gType() {
    let graphicPoint;
    if (this.mapType === 'reporter') {
      if (this.mapView?.graphics?.getItemAt(1)) {
        graphicPoint = this.mapView?.graphics?.getItemAt(1);
      } else {
        graphicPoint = this.mapView?.graphics?.getItemAt(0);
      }
    } else {
      graphicPoint = this.mapView?.graphics?.getItemAt(0);
    }
    const gType = graphicPoint?.attributes?.gType;

    return gType;
  }

  public async save(taskIncidentData: TaskIncidentGisData) {
    this.loading = true;
    this.cdr.detectChanges();
    // query info of community and district of selected location on map
    let result;
    try {
      result = await this.queryInfo(this.mapView.graphics.getItemAt(0));
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
    this.cdr.detectChanges();
    let graphicPoint;
    if (this.mapType === 'reporter') {
      if (this.mapView?.graphics?.getItemAt(1)) {
        graphicPoint = this.mapView?.graphics?.getItemAt(1);
      } else {
        graphicPoint = this.mapView?.graphics?.getItemAt(0);
      }
    } else {
      graphicPoint = this.mapView?.graphics?.getItemAt(0);
    }
    const gType = graphicPoint?.attributes?.gType;
    await this.applyFeature(taskIncidentData);
    return {
      gType,
      polygonCoordinates: graphicPoint?.geometry?.['rings'],
      polylineCoordinates: graphicPoint?.geometry?.['paths'],
      locationInfo: result,
      pointCoordinates: {
        latitude: graphicPoint.geometry['latitude'],
        longitude: graphicPoint.geometry['longitude'],
        x: graphicPoint.geometry['x'],
        y: graphicPoint.geometry['y'],
      },
    };
  }

  ngOnDestroy(): void {
    if (this.data && this.data?.viewOnly) {
      this.mapView?.destroy();
      this.map?.destroy();
    }
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  getPriority(priorityId) {
    const isLangAr = this.lang === 'ar';
    const priority = this.appCommonDataService.findElementInArray(
      'priorities',
      'id',
      priorityId
    );
    if (priority) {
      return isLangAr ? priority.nameAr : priority.nameEn;
    }
    return '';
  }
}

@NgModule({
  declarations: [MapComponent, TopBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    AutoCompleteModule,
    OverlayPanelModule,
    DropdownModule,
    ListboxModule,
    ProgressSpinnerModule,
    TranslateObjModule,
    // -----------
    InlineSVGModule,
  ],
  exports: [MapComponent],
})
export class MapModule {}
