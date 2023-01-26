import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Direction, Directionality} from "@angular/cdk/bidi";
import {ILangFacade} from "@core/facades/lang.facade";
import {TranslationService} from "../../i18n/translation.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {forkJoin, Subject} from "rxjs";
import {MapViewType} from "@shared/components/map/utils/MapViewType";
import {MapConfig, MapService} from "@shared/components/map/services/map.service";
import {MapActionType} from "@shared/components/map/utils/MapActionType";
import {ShareLocationService} from "../shareLocation.service";
import {TaskIncidentGisData} from "@shared/components/map/utils/TaskIncidentGisData";
import arabicLocale from '@uppy/locales/lib/ar_SA';
import {AlertsService} from "../../../_metronic/core/services/alerts.service";
import {environment} from "../../../../environments/environment";
import * as XHRUpload from '@uppy/xhr-upload';
import {AttachmentsService} from "../../../_metronic/core/services/attachments.service";


const Uppy = require('@uppy/core');
const Dashboard = require('@uppy/dashboard');
const Webcam = require('@uppy/webcam');

export enum LocationStatusEnum {
  PREVIOUS_SET,
  JUST_SEND,
  NOT_SEND,
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}


@Component({
  selector: 'app-new-share-location',
  templateUrl: './new-share-location.component.html',
  styleUrls: ['./new-share-location.component.scss']
})
export class NewShareLocationComponent implements OnInit, AfterViewInit {
  private uppy: any;
  tagId = 0;
  lang = 'en';
  @Input() inline = false;
  // start reporter location
  hideMap = false;
  hideMapWhenSubmit = true;
  uuid: string;
  status$ = new Subject<LocationStatusEnum>();
  locationStatus = LocationStatusEnum;
  location: { latitude: string; longitude: string };
  mapConfigData: MapConfig = {
    mapType: MapViewType.REPORTER,
    zoomModel: {
      referenceId: '',
      featureName: MapActionType.INCIDENT_POINT,
    },
    viewOnly: true,
    showLayers: false,
    closeMapAuto: false,
  };
  // end reporter location
  // variavles

  public currentLoc = false;
  public currentLocationOfUser = false;
  public mapLoc = false;
  public lat;
  public lng;
  public disableUserSelection = false;
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/260-united-kingdom.svg',
    },
    {
      lang: 'ar',
      name: 'العربية',
      flag: './assets/media/svg/flags/151-united-arab-emirates.svg',
    },
  ];

  direction = '';
   locationToSend = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private attachmentsService: AttachmentsService,
    private translationService: TranslationService,
    private router: Router,
    private shareLocService: ShareLocationService,
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private alertService: AlertsService,
    @Inject(DOCUMENT) private document: Document,
    private langFacade: ILangFacade,
    private dir: Directionality
  ) {
    this.location = {
      latitude: '',
      longitude: '',
    };
  }

  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
    this.lang = this.translationService.getSelectedLanguage();
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    this.shareLocService.verifyUUID(this.uuid).subscribe((data) => {
      this.status$.next(
        data['result']
          ? LocationStatusEnum.NOT_SEND
          : LocationStatusEnum.PREVIOUS_SET
      );
    });
    this.getLocation();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.uppy = Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
          maxFileSize: 20971520, // 20 MB
          maxNumberOfFiles: 1,
          minNumberOfFiles: 0,
          allowedFileTypes: ["image/*", "video/*"]
        }
      })
        .use(Dashboard, {
          inline: true,
          target: ".DashboardContainer",
          replaceTargetContent: true,
          showProgressDetails: false,
          proudlyDisplayPoweredByUppy: false,
          hideUploadButton: true,
          hideAfterFinish: true,
          //note: this.lang == 'ar' ? 'حجم الملف يجب ان لا يتعدى ٢٠ ميجابايت' : 'File Size should not exceed 20 MB',
          locale: this.lang == 'ar' ? arabicLocale : '',
          metaFields: [
            {
              id: 'desc',
              name: this.translationService.get('ACTIONS.DESCRIPTION'),
              placeholder: this.translationService.get('ACTIONS.PLACEHOLDER'),
            },
          ]
        })
        .use(Webcam, { target: Dashboard })
        .run();
      if (this.uuid) {
        this.uppy = this.uppy.use(XHRUpload, {
          endpoint: `${environment.apiUrl}/dms/ext/upload?uuid=${this.uuid}`,
          formData: true,
          fieldName: 'file',
        });
      }
      this.uppy.on('upload-success', (file, response) => {
      });
      this.uppy.on("complete", result => {
        console.log("successful files:", result.successful);
        console.log("failed files:", result.failed);
      });
    }, 2000);
  }

  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.disableUserSelection = true;
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);
            this.currentLocationOfUser = true
            this.currentLoc = true;
            this.currentLocation();
            this.cd.detectChanges();
          }
        },
        (error: PositionError) => {
          this.mapLoc = true;
          this.locationFromMap();
          this.disableUserSelection = false;
          this.cd.detectChanges();
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  currentLocation() {
    this.locationToSend = null;
    this.locationToSend = `POINT(${this.lat} ${this.lng})`;
    this.currentLoc = true;
    this.mapLoc = false;
  }

  locationFromMap() {
    this.hideMapWhenSubmit = true;
    this.mapLoc = true;
    this.currentLoc = false;
    this.hideMap = true;
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    this.shareLocService.verifyUUID(this.uuid).subscribe((data) => {
      this.status$.next(
        data['result']
          ? LocationStatusEnum.NOT_SEND
          : LocationStatusEnum.PREVIOUS_SET
      );
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
    this.cd.detectChanges();
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    this.langFacade.changeLang(lang);
    let dir = lang == 'ar' ? 'rtl' : ('ltr' as Direction);
    this.dir.change.emit(dir);
    window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    if (lang == 'ar') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }

    let htmlTag = document.querySelector('html');
    htmlTag.setAttribute('lang', this.translationService.getSelectedLanguage());
    htmlTag.setAttribute('dir', this.direction);
    htmlTag.setAttribute('direction', this.direction);
    htmlTag.style.direction = this.direction;
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.document.documentElement.lang =
      this.translationService.getSelectedLanguage();
  }

  async sendDetails(response: {
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
  }) {
    if (this.locationToSend) {
      this.shareLocService
        .sendReporterLocation({
          location: this.locationToSend,
          createdOn: new Date(),
          uuid: this.uuid,
        }).pipe()
        .subscribe((result) => {
          this.upload();
          this.status$.next(LocationStatusEnum.JUST_SEND);
        });
    } else {
      this.alertService.customFailureSnackBar('Please select location First');
    }
  }

  async upload() {
    this.uppy.upload().then(
      (result) => {
        if (result.failed.length > 0) {
          result.failed.forEach((file) => {
            console.error(file.error);
          });
        }
      },
      (e) => {
        console.log(e);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  OnSaveMap(response: {
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
  }) {
    this.locationToSend = null;
    const { latitude, longitude } = response?.pointCoordinates;
    this.locationToSend = `POINT(${latitude} ${longitude})`;
    //this.alertService.openSuccessSnackBar('Location is save successfully');
   /* this.shareLocService
      .sendReporterLocation({
        location: location,
        createdOn: new Date(),
        uuid: this.uuid,
      })
      .subscribe((data) => {
        this.status$.next(LocationStatusEnum.JUST_SEND);
      });*/
    //this.hideMapWhenSubmit = false;
  }
}
