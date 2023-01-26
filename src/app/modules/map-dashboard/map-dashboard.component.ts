import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';

import { ILangFacade } from '@core/facades/lang.facade';
import { IThemeFacade } from '@core/facades/theme.facade';

import { loadModules } from 'esri-loader';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import esri = __esri;

import { ILinkService } from 'src/app/core/services/link.service';

import { BehaviorSubject, Subscription } from 'rxjs';

import { CommonService } from 'src/app/core/services/common.service';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TranslationService } from '../i18n/translation.service';

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.scss'],
})
export class MapDashboardComponent implements OnInit, OnDestroy {
  public priorities$ = new BehaviorSubject<any[]>([]);
  public lang = 'en';
  public commonData: any;

  public statistics$ = new BehaviorSubject<any>({});

  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate1: moment.Moment;
  public maxDate1: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  constructor(
    private alertService: AlertsService,
    private translationService: TranslationService,
    private linkService: ILinkService,
    // private themeService: ThemeService,
    private themeFacade: IThemeFacade,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private langFacade: ILangFacade,
    private datePipe: DatePipe
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.commonService.getCommonData();
  }

  public minDate = new Date(new Date().getFullYear() - 20, 0, 1);
  public maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

  public dir$ = this.translationService.dir$;

  public form: FormGroup;
  buildForm(): FormGroup {
    const form = this.formBuilder.group({
      layers: [null],
      orgs: [null],
      priority: [null],
      fromDueDate: [],
      toDueDate: [],
      level: [null],
    });
    return form;
  }

  search() {
    if (this.queryOnLayers) {
      this.mapView.graphics.removeAll();
      (<string[]>this.form.value.layers)?.forEach((l) => {
        let orgsCond = `ORG_NAME in ( `;
        this.form.value.orgs?.forEach((c) => {
          orgsCond += `'${c}',`;
        });
        orgsCond = this.form.value.orgs
          ? `${orgsCond.slice(0, orgsCond.length - 1)} )`
          : '';
        let priorityCond = `PRIORITY = ${this.form.value.priority}`;
        let fromDueDate = this.datePipe.transform(
          this.form.value.fromDueDate,
          'yyyy-MM-dd hh:mm:ss'
        );
        let toDueDate = this.datePipe.transform(
          this.form.value.toDueDate,
          'yyyy-MM-dd hh:mm:ss'
        );
        let fromDueDateCond = this.form.value.fromDueDate
          ? `${'DUE_DATE'} >= TIMESTAMP '${fromDueDate}'`
          : '';
        let toDueDateCond = this.form.value.toDueDate
          ? `DUE_DATE <= TIMESTAMP '${toDueDate}'`
          : '';

        let dueDateCond = l.startsWith('Tsk')
          ? `${fromDueDateCond} ${
              this.form.value.fromDueDate && this.form.value.toDueDate
                ? 'and'
                : ''
            } ${toDueDateCond}`
          : '';

        let levelCond = l.startsWith('Inc')
          ? this.form.value.level
            ? `LEVELID = ${this.form.value.level}`
            : ''
          : '';
        let where = `${this.form.value.orgs ? orgsCond : ''} ${
          this.form.value.orgs && this.form.value.priority ? 'and' : ''
        } ${this.form.value.priority ? priorityCond : ''} ${
          l.startsWith('Tsk')
            ? (this.form.value.orgs || this.form.value.priority) &&
              (this.form.value.fromDueDate || this.form.value.toDueDate)
              ? 'and'
              : ''
            : ''
        } ${dueDateCond} ${
          (this.form.value.orgs ||
            this.form.value.priority ||
            this.form.value.fromDueDate ||
            this.form.value.toDueDate) &&
          this.form.value.level &&
          l.startsWith('Inc')
            ? 'and'
            : ''
        } ${levelCond}`;
        where = !/\S/.test(where) || where === '' ? '1 = 1' : where;
        this.queryOnLayers(where, l as any);
      });
    }
  }
  clear() {
    this.form.reset();
    this.mapView.graphics.removeAll();
  }
  chartToggle(e: MatSlideToggleChange) {
    this.showcharts = !e.checked;
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  public showcharts = true;
  private subscriptions: Subscription[] = [];
  async ngOnInit() {
    this.form = this.buildForm();
    await this.initMap();
    let sub = this.themeFacade.vm$
      .pipe(map((s) => s.ActiveTheme))
      .subscribe((theme) => {
        if (theme.endsWith('light')) {
          this.linkService.RemoveTag('esri_map_style');
          this.linkService.AddTag({
            id: 'esri_map_style',
            rel: 'stylesheet',
            href: './assets/css/esri.min.css',
          });
          this.mapView?.when((_) => {
            this.baseMapToggler.toggle();
          });
        } else {
          this.linkService.RemoveTag('esri_map_style');
          this.linkService.AddTag({
            id: 'esri_map_style',
            rel: 'stylesheet',
            href: './assets/css/esri.dark-blue.min.css',
          });
          this.mapView?.when((_) => {
            this.baseMapToggler.toggle();
          });
        }
      });
    this.subscriptions.push(sub);
  }

  // -------------------------------- charts ----------------------------------
  public chart1 = {
    series: [
      {
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    chart: {
      type: 'bar',
      height: 300,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01/01/2011 GMT',
        '01/02/2011 GMT',
        '01/03/2011 GMT',
        '01/04/2011 GMT',
        '01/05/2011 GMT',
        '01/06/2011 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: 'Fiction Books Sales',
    },
  };

  public chart2 = {
    series: [
      {
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
    chart: {
      type: 'bar',
      height: 300,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: 'Fiction Books Sales',
    },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  public chart3 = {
    series: [
      {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    chart: {
      height: 300,
      type: 'line',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: 'XYZ - Stock Analysis (2009 - 2016)',
      align: 'left',
      offsetX: 110,
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            colors: '#008FFB',
          },
        },
        title: {
          text: 'Income (thousand crores)',
          style: {
            color: '#008FFB',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: 'Income',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            colors: '#00E396',
          },
        },
        title: {
          text: 'Operating Cashflow (thousand crores)',
          style: {
            color: '#00E396',
          },
        },
      },
      {
        seriesName: 'Revenue',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FEB019',
        },
        labels: {
          style: {
            colors: '#FEB019',
          },
        },
        title: {
          text: 'Revenue (thousand crores)',
          style: {
            color: '#FEB019',
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  public chart4 = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      height: 300,
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff'],
    },
    fill: {
      opacity: 0.8,
    },
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'XYZ - Stock Analysis (2009 - 2016)',
    },
  };
  // ----------------------------------- map ------------------------------------
  private mapView: esri.MapView;
  private map: esri.Map;
  private baseMapToggler: esri.BasemapToggle;
  public zoomTo: (
    REF_ID,
    fName: 'Inc_point' | 'Inc_Polyline' | 'Inc_Polygon'
  ) => void;
  private queryOnLayers: (
    where: string,
    fName:
      | 'Inc_point'
      | 'Inc_Polyline'
      | 'Inc_Polygon'
      | 'Tsk_point'
      | 'Tsk_Polyline'
      | 'Tsk_Polygon',
    outFields?: string[],
    outStatistics?: esri.StatisticDefinition[],
    addGraphics?: boolean
  ) => Promise<esri.Graphic[]>;

  async initMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [
        Map,
        MapView,
        MapImageLayer,
        FeatureLayer,
        ImageryLayer,
        Query,
        QueryTask,
        Basemap,
        LayerList,
        BasemapGallery,
        Legend,
        Home,
        Compass,
        Expand,
        domConstruct,
        BasemapToggle,
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/MapImageLayer',
        'esri/layers/FeatureLayer',
        'esri/layers/ImageryLayer',
        'esri/tasks/support/Query',
        'esri/tasks/QueryTask',
        'esri/Basemap',
        'esri/widgets/LayerList',
        'esri/widgets/BasemapGallery',
        'esri/widgets/Legend',
        'esri/widgets/Home',
        'esri/widgets/Compass',
        'esri/widgets/Expand',
        'dojo/dom-construct',
        'esri/widgets/BasemapToggle',
        'dojo/domReady!',
      ]);

      const popupIncidents = {
        title: 'INCIDENT',
        content:
          '<b>ID:</b> {INCIDENT_REF_ID}<br><b>NAME:</b> {NAME}<br><b>Cross LEVELID:</b> {LEVELID}<br><b>PRIORITY:</b> {PRIORITY}<br><b>ORG_NAME:</b> {ORG_NAME} ft',
      };
      const popupTasks: esri.PopupTemplateProperties = {
        title: 'TASKS',
        content: (data) => {
          let dueDate = this.datePipe.transform(
            data?.graphic?.attributes?.DUE_DATE,
            'medium'
            // "UTC"
          );
          return `<b>ID:</b> {TASK_REF_ID}<br><b>NAME:</b> {NAME}<br><b>DUE_DATE:</b> ${dueDate}<br><b>PRIORITY:</b> {PRIORITY}<br><b>ORG_NAME:</b> {ORG_NAME} ft`;
        },
        outFields: ['*'],
      };

      const ecmsMapService = new MapImageLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE + '/rest/services/ECMS/ECMS/MapServer',
        id: 'basemap',
        title: 'ECMS',
        sublayers: [
          {
            id: 0,
            visible: true,
            popupTemplate: popupIncidents,
            title: 'INCIDENT POINT',
          },
          {
            id: 1,
            visible: true,
            popupTemplate: popupTasks,
            title: 'TASK POINT',
          },
          {
            id: 2,
            visible: true,
            popupTemplate: popupIncidents,
            title: 'INCIDENT LINE',
          },
          {
            id: 3,
            visible: true,
            popupTemplate: popupTasks,
            title: 'TASK LINE',
          },
          {
            id: 4,
            visible: true,
            popupTemplate: popupIncidents,
            title: 'INCIDENT POLYGON',
          },
          {
            id: 5,
            visible: true,
            popupTemplate: popupTasks,
            title: 'TASK POLYGON',
          },
        ],
      });

      const testMapService: esri.MapImageLayer = new MapImageLayer({
        url: 'https://onwani.abudhabi.ae/arcgis/rest/services/MSSI/ADMINBOUNDARIES/MapServer',
        id: 'testmap',
        title: 'test',
        visible: false,
      });

      // incident layers
      const incPointFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPointFeatureService',
        layerId: 0,
      });

      const incLineFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncLineFeatureService',
        layerId: 2,
      });

      const incPolygonFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'IncPolygonFeatureService',
        layerId: 4,
      });

      // task layers
      let tskLineFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskLineFeatureService',
        layerId: 3,
      });

      let TskPolygonFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPolygonFeatureService',
        layerId: 5,
      });

      let tskPointFeatureService = new FeatureLayer({
        url:
          environment.ADMGIS_ROOT_ROUTE +
          '/rest/services/ECMS/ECMS/FeatureServer',
        id: 'TskPointFeatureService',
        layerId: 1,
      });

      // initialize basemaps
      let mainBasemapLayer_LightGray: esri.MapImageLayer = new MapImageLayer({
        url: 'https://arcgis.sdi.abudhabi.ae/arcgis/rest/services/Pub/BaseMapEng_LightGray_WM/MapServer',
        id: 'MainBaseMapLayer_LightGray',
      });

      let mainBasemap_LightGray_Props: esri.BasemapProperties = {
        baseLayers: [mainBasemapLayer_LightGray],
        title: 'Main Basemap Light',
        id: 'MainBasemap_LightGray',
        thumbnailUrl:
          'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png',
        spatialReference: { wkid: 102100 },
      };

      let mainBasemapLayer_DarkGray: esri.MapImageLayer = new MapImageLayer({
        url: 'https://arcgis.sdi.abudhabi.ae/arcgis/rest/services/Pub/BaseMapEng_DarkGray_WM/MapServer',
        id: 'MainBaseMapLayer_DarkGray',
      });
      let mainBasemap_DarkGray_Props: esri.BasemapProperties = {
        baseLayers: [mainBasemapLayer_DarkGray],
        title: 'Main Basemap Dark',
        id: 'MainBasemap_DarkGray',
        thumbnailUrl:
          'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png',
        spatialReference: { wkid: 102100 },
      };

      let mainBasemap_LightGray: esri.Basemap = new Basemap(
        mainBasemap_LightGray_Props
      );
      let mainBasemap_DarkGray: esri.Basemap = new Basemap(
        mainBasemap_DarkGray_Props
      );

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: mainBasemap_LightGray_Props,
        layers: [testMapService, ecmsMapService],
      };

      this.map = new Map(mapProperties);
      // Initialize the MapView
      const mapViewProperties = {
        container: document.getElementById('map'),
        center: [54.3773, 23.4539],
        constraints: {
          snapToZoom: true,
        },
        scale: 4000000,
        map: this.map,
        spatialReference: { wkid: 102100 },
      };

      this.mapView = new MapView(mapViewProperties);

      this.baseMapToggler = new BasemapToggle({
        view: this.mapView,
        nextBasemap: mainBasemap_DarkGray_Props,
      });

      this.queryOnLayers = (
        where: string,
        fName:
          | 'Inc_point'
          | 'Inc_Polyline'
          | 'Inc_Polygon'
          | 'Tsk_point'
          | 'Tsk_Polyline'
          | 'Tsk_Polygon',
        outFields = ['*'],
        outStatistics: esri.StatisticDefinition[] = [],
        addGraphics = true
      ) => {
        let TaskUrl, Symbol;

        switch (fName) {
          case 'Inc_point':
            TaskUrl = incPointFeatureService.url + '/0';
            Symbol = {
              type: 'simple-marker',
              style: 'circle',
              color: 'red',
              size: '16px',
              // outline: { color: [255, 255, 0], width: 3 },
            };

            break;

          case 'Inc_Polyline':
            TaskUrl = incLineFeatureService.url + '/2';
            Symbol = {
              type: 'simple-line',
              color: [4, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };

            break;

          case 'Inc_Polygon':
            TaskUrl = incPolygonFeatureService.url + '/4';
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;

          case 'Tsk_point':
            TaskUrl = tskPointFeatureService.url + '/1';
            Symbol = {
              type: 'simple-marker',
              style: 'circle',
              color: 'green',
              size: '16px',
              // outline: { color: [255, 255, 0], width: 3 },
            };
            break;

          case 'Tsk_Polyline':
            TaskUrl = tskLineFeatureService.url + '/3';
            Symbol = {
              type: 'simple-line',
              color: [200, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };
            break;

          case 'Tsk_Polygon':
            TaskUrl = TskPolygonFeatureService.url + '/5';
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;
        }

        let wrapper = this;
        let queryTask: esri.QueryTask = new QueryTask(TaskUrl);
        let query: esri.Query = new Query();
        query.outSpatialReference = wrapper.mapView.spatialReference;
        query.returnGeometry = true;
        query.outFields = outFields;
        query.outStatistics = outStatistics;
        query.where = where;
        return queryTask.execute(query).then(function (result) {
          //*** ADD ***//

          if (addGraphics) {
            let graphics = result.features.map((item) => {
              item.symbol = Symbol;
              switch (fName) {
                case 'Inc_point':
                  item.popupTemplate = popupIncidents as any;
                  break;

                case 'Tsk_point':
                  item.popupTemplate = popupTasks as any;
                  break;

                case 'Inc_Polyline':
                  item.popupTemplate = popupIncidents as any;
                  break;

                case 'Tsk_Polyline':
                  item.popupTemplate = popupTasks as any;
                  break;

                case 'Inc_Polygon':
                  item.popupTemplate = popupIncidents as any;
                  break;

                case 'Tsk_Polygon':
                  item.popupTemplate = popupTasks as any;
                  break;
                default:
                  break;
              }
              return item;
            });
            // Zoom to the data returned
            wrapper.mapView.when(async function (e) {
              graphics.forEach((g) => {
                wrapper.mapView.graphics.add(g);
              });
            });
          }
          return result.features;
        });
      };

      this.mapView.when(async () => {
        // testMapService.when((_) => {
        //   testMapService.sublayers.forEach(async (sl) => {
        //     let query = sl.createQuery();
        //     query.outSpatialReference = this.mapView.spatialReference;
        //     query.outFields = ["*"];
        //     query.returnGeometry = false;
        //     let result = await sl.queryFeatures(query);
        //   });
        // });

        // ----------

        var layerList = new LayerList({ view: this.mapView });
        this.mapView.ui.add(
          new Expand({
            view: this.mapView,
            content: layerList,
            expandIconClass: 'esri-icon-layers',
          }),
          'top-right'
        );

        const basemapWidget = new BasemapGallery({
          view: this.mapView,
          source: [
            mainBasemap_LightGray,
            mainBasemap_DarkGray,
            // Basemap.fromId("topo-vector"),
          ],
        });
        this.mapView.ui.add(
          new Expand({
            view: this.mapView,
            content: basemapWidget,
            expandIconClass: 'esri-icon-basemap',
          }),
          'top-right'
        );

        var legend = new Legend({ view: this.mapView });
        this.mapView.ui.add(
          new Expand({
            view: this.mapView,
            content: legend,
            expandIconClass: 'esri-icon-description',
            expandTooltip: 'Legend',
          }),
          'top-trailing'
        );

        var homeBtn = new Home({ view: this.mapView });
        this.mapView.ui.add(homeBtn, 'top-left');

        var compass = new Compass({ view: this.mapView });
        this.mapView.ui.add(compass, 'top-left');

        var recenterBtn = domConstruct.toDom(
          "<div class='map-button esri-component esri-locate esri-widget--button esri-widget' role='button' title='Clear'><span aria-hidden='true' role='presentation' class='esri-icon esri-icon-erase'></span></div>"
        );

        this.mapView.ui.add(recenterBtn, 'bottom-right');

        recenterBtn.addEventListener('click', clearGraphics);
      });

      let clearGraphics = () => {
        this.mapView.graphics.removeAll();
      };

      let zoomToRequest = (
        REF_ID,
        fName: 'Inc_point' | 'Inc_Polyline' | 'Inc_Polygon'
      ) => {
        let where, TaskUrl, Symbol;
        switch (fName) {
          case 'Inc_point':
            TaskUrl = incPointFeatureService.url + '/0';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-marker',
              style: 'square',
              color: 'red',
              size: '16px',
              outline: { color: [255, 255, 0], width: 3 },
            };

            break;

          case 'Inc_Polyline':
            TaskUrl = incLineFeatureService.url + '/2';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-line',
              color: [4, 90, 141],
              width: 4,
              cap: 'round',
              join: 'round',
            };

            break;

          case 'Inc_Polygon':
            TaskUrl = incPolygonFeatureService.url + '/4';
            where = "INCIDENT_REF_ID = '" + REF_ID + "'";
            Symbol = {
              type: 'simple-fill',
              style: 'diagonal-cross',
              color: [0, 0, 0, 0.1],
              outline: { color: [0, 255, 0], width: 1 },
            };
            break;
        }
        let wrapper = this;
        let queryTask: esri.QueryTask = new QueryTask(TaskUrl);
        let query: esri.Query = new Query();
        query.outSpatialReference = wrapper.mapView.spatialReference;
        query.returnGeometry = true;
        query.outFields = ['*'];
        query.where = where;
        queryTask
          .execute(query)
          .then(function (result) {
            if (result.features.length == 0) {
              wrapper.mapView.graphics.removeAll();
              return;
            }

            wrapper.mapView.graphics.removeAll();
            //*** ADD ***//
            let graphics = result.features.map((item) => {
              item.symbol = Symbol;
              item.popupTemplate = {
                title: '{TRL_NAME}',
                content: '{*}', // All of the fields
              } as any;
              return item;
            });
            // Zoom to the data returned
            wrapper.mapView.when(function (e) {
              graphics.forEach((g) => {
                wrapper.mapView.graphics.add(g);
              });
              wrapper.mapView
                .goTo(graphics, { animate: true, duration: 1000 })
                .then((_) => {
                  let zoomView =
                    graphics?.length == 1 &&
                    graphics[0]?.geometry?.type == 'point'
                      ? wrapper.mapView.extent.expand(0.2)
                      : wrapper.mapView.extent.expand(2);
                  wrapper.mapView.goTo(zoomView);
                });
            });
          })
          .catch((err) => {
            this.alertService.openFailureSnackBarWithMsg(
              this.translationService.get(
                'SHARED.NOTIFICATION.MAP_LOC_NOTFOUND'
              ),
              4000
            );
          });
      };
      this.zoomTo = () => {}; // zoomToRequest;
      this.mapView.when(async (_) => {
        let countSt = [
          {
            statisticType: 'count',
            onStatisticField: 'OBJECTID',
            outStatisticFieldName: 'COUNT',
          },
        ] as any;
        let r = {
          inc_point_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Inc_point',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],
          inc_line_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Inc_Polyline',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],
          inc_polygon_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Inc_Polygon',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],

          tsk_point_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Tsk_point',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],
          tsk_line_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Tsk_Polyline',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],
          tsk_polygon_count: (
            await this.queryOnLayers(
              '1 = 1',
              'Tsk_Polygon',
              ['*'],
              countSt,
              false
            )
          )[0]?.attributes['COUNT'],
        };
        const totalIncidents =
          r.inc_line_count + r.inc_point_count + r.inc_polygon_count;

        const totalTasks =
          r.tsk_line_count + r.tsk_point_count + r.tsk_polygon_count;
        this.statistics$.next({ totalIncidents, totalTasks });
      });
    } catch (error) {
      console.error('EsriLoader: ', error);
    }
  }
}
