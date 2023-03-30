import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlHelperService } from '@core/services/url-helper.service';

import { BehaviorSubject, Observable, observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { environment } from 'src/environments/environment';
import { TranslationService } from '../i18n/translation.service';

import { commonDataItem } from './common-data-keys';

import { ControllerModel } from './events-management/controller-view/reports-via';
import { EmergencyLevelModel } from './events-management/emergency-level/emergency-level.model';
import { IncidentsCategoryModel } from './events-management/incidents-categories/incidents-category-model';
import { NavigationItem } from './events-management/navigations/navigation.model';
import { Sla } from './events-management/sla/sla-modal/sla-modal';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class EventsManagementService {
  commonDataItem = commonDataItem;
  commonDataLengths: any[] = [];
  commonData: any[] = [];
  controllers: { [key: string]: ControllerModel } = {};

  emergencyLevel: EmergencyLevelModel[] = [];
  onEmergencyLevel: BehaviorSubject<any>;
  onResourceGrouping: BehaviorSubject<any>;

  onHospitalsChange: BehaviorSubject<any>;

  incidentsCategries: IncidentsCategoryModel[] = [];
  onIncidentsCategriesChange: BehaviorSubject<any>;

  Kpis: any[] = [];
  kpiInfo: any[] = [];
  onKpisChange: BehaviorSubject<any>;
  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  Sla: any[] = [];
  SlaInfo: any[] = [];
  onSLAChange: BehaviorSubject<any>;

  Ranks: any[] = [];
  ranksInfo: any[] = [];
  onRanksChange: BehaviorSubject<any>;

  changeCurrentTab$ = new BehaviorSubject<boolean>(false);

  navigations: NavigationItem[] = [];
  onNavigationsChange: BehaviorSubject<any>;


  lang: string;

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertsService,
    private translationService: TranslationService,
    private urlHelper: UrlHelperService
  ) {
    this.onEmergencyLevel = new BehaviorSubject([]);
    this.onHospitalsChange = new BehaviorSubject([]);
    this.onIncidentsCategriesChange = new BehaviorSubject([]);
    this.onKpisChange = new BehaviorSubject([]);
    this.onSLAChange = new BehaviorSubject([]);
    this.onRanksChange = new BehaviorSubject([]);
    this.onNavigationsChange = new BehaviorSubject([]);

    this.onResourceGrouping = new BehaviorSubject([]);
    this.lang = this.translationService.getSelectedLanguage();
  }

  resolve(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCommonData(),
        this.getIncidentsCategories('parents'),
        this.getkpis(),
        this.getSLAs(),
        this.getResourseGroup(),
        this.getRanks(),
        this.getNavigationsMenu(),
      ]).then(([files]) => {
        resolve(files);
      }, reject);
    });
  }

  // this.getControllerValue("reporting-via"),
  // this.getControllerValue("reasons"),
  // this.getControllerValue("enviromental-impacts"),
  // this.getControllerValue("assets-category"),

  getCommonData() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/common/full-data`, {})
        .subscribe(
          (response: any) => {
            if (response && response['status']) {
              this.commonData = response['result'];
              this.createControllers();
              resolve(true);
            }
          },
          (err) => {
            reject();
          }
        );
    });
  }

  getCategories() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/assets-category`, {
        headers: this.result,
        params: { page: '0', size: '10000' },
      })
      .pipe(map((r) => r.result));
  }

  createControllers() {
    for (let index = 0; index < this.commonDataItem.length; index++) {
      const element = this.commonDataItem[index];

      if (element.type == 'commonPublic') {
        this.commonDataLengths.push(this.commonData[element.key].length);
        const controller = new ControllerModel(
          this.commonData[element.key],
          element.key
        );
        this.controllers[element.key] = controller;
      } else {
        this.setPrivateCommonData(element);
      }
    }
  }

  setPrivateCommonData(element) {
    switch (element.key) {
      case 'emergencyLevels':
        this.setEmergencyLevel(this.commonData[element.key]);
        break;

      default:
        break;
    }
  }

  /*
   *the following controlllers  @params controllerName  (enveiroment impact  -  reasons  - reporting-via )
   *(GET - POST - DELETE - UPDATE )
   *
   */
  getControllerValue(controllerName: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/${controllerName}`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          const content = response['result'];
          const controller = new ControllerModel(content, controllerName);

          this.controllers[controllerName] = controller;

          resolve(this.controllers[controllerName]);
        }, reject);
    });
  }

  getById(id: number, controllerName: string) {
    const test = this.controllers[controllerName].value.find(
      (item) => item.id == id
    );
    return test;
  }

  createReportingVia(report: any, controllerName: string) {
    const endPoint = this.commonDataItem.find(
      (item) => item.key == controllerName
    ).endPoint;

    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/${endPoint}`, report, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.controllers[controllerName];
              this.controllers[controllerName].addItem(res['result']);

              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  deleteReportVia(id: number, controllerName: string) {
    const endPoint = this.commonDataItem.find(
      (item) => item.key == controllerName
    ).endPoint;
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(`${environment.apiUrl}/${endPoint}/${id}`, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.controllers[controllerName].deleteItem(id);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateReportVia(report: any, controllerName: string) {
    const endPoint = this.commonDataItem.find(
      (item) => item.key == controllerName
    ).endPoint;

    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/${endPoint}`, report, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.controllers[controllerName].updateItem(res['result']);

              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  /*
   *All  about  Emergency Level controller (GET - POST - DELETE - UPDATE )
   */
  setEmergencyLevel(levels: any[]) {
    this.emergencyLevel = levels.map((level) => {
      return new EmergencyLevelModel(level);
    });
    this.onEmergencyLevel.next(this.emergencyLevel);
  }

  getEmergencyLevelById(id: number) {
    return this.emergencyLevel.find((item) => item.id == id);
  }

  createEmergencyLevel(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/emergency-levels`, level, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              const newReport = new EmergencyLevelModel(res['result']);
              this.emergencyLevel.push(newReport);
              this.onEmergencyLevel.next(this.emergencyLevel);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  deleteEmergencyLevel(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(`${environment.apiUrl}/emergency-levels/${id}`, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.emergencyLevel = this.emergencyLevel.filter((item) => {
                return item.id !== id;
              });
              this.onEmergencyLevel.next(this.emergencyLevel);

              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateEmergencyLevel(id: string, level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/emergency-levels`, level, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.emergencyLevel = this.emergencyLevel.map((el) => {
                if (el.id == level.id) {
                  return new EmergencyLevelModel(level);
                } else {
                  return el;
                }
              });
              this.onEmergencyLevel.next(this.emergencyLevel);
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  /*
   *All  about   Hospitals  Level controller (GET - POST - DELETE - UPDATE )
   */

  getResourseGroup() {
    return this.httpClient.get<any>(`${environment.apiUrl}/assets-group`, {});
  }

  createAssetsGroup(asset: any) {
    return this.httpClient.post(
      `${environment.apiUrl}/assets-group`,
      asset,
      {}
    );
  }

  updateAssetsGroup(asset: any) {
    return this.httpClient.put(`${environment.apiUrl}/assets-group`, asset, {});
  }

  getAssetsCategory() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/assets/main-category`
    );
  }

  createAssetsCategory(asset: any) {
    return this.httpClient.post(
      `${environment.apiUrl}/assets-category`,
      asset,
      {}
    );
  }

  updateAssetsCategory(asset: any) {
    return this.httpClient.put(
      `${environment.apiUrl}/assets-category`,
      asset,
      {}
    );
  }

  /*
   *All  about  Incidints Categories  controller (GET - POST - DELETE - UPDATE )
   */

  //    the two paremeter  are to decide which level  on categories  we want from BE
  getIncidentsCategories(
    level: 'parents' | 'children',
    parentId?
  ): Promise<any> {
    let endPoint = '/incident-categories';
    if (level == 'children') {
      endPoint += `/${parentId}/children`;
    }

    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}${endPoint}`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.incidentsCategries = response['result'];
          this.incidentsCategries = this.incidentsCategries.map((level) => {
            return new IncidentsCategoryModel(level);
          });
          this.onIncidentsCategriesChange.next(this.incidentsCategries);
          resolve(this.incidentsCategries);
        }, reject);
    });
  }

  getIncidentsCategryById(id: number) {
    return this.incidentsCategries.find((item) => item.id == id);
  }

  createIncidentsCategry(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/incident-categories`, level, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              const newItem = new IncidentsCategoryModel(res['result']);
              this.incidentsCategries.push(newItem);
              this.onIncidentsCategriesChange.next(this.incidentsCategries);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateIncidentsCategry(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/incident-categories`, level, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.incidentsCategries = this.incidentsCategries.map((el) => {
                if (el.id == level.id) {
                  return new IncidentsCategoryModel(level);
                } else {
                  return el;
                }
              });
              this.onIncidentsCategriesChange.next(this.incidentsCategries);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  getIncidintCategoryChildren(id) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(
          `${environment.apiUrl}/incident-categories/${id}/children`,
          {}
        )
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.incidentsCategries = response['result'];
          this.incidentsCategries = this.incidentsCategries.map((level) => {
            return new IncidentsCategoryModel(level);
          });
          this.onIncidentsCategriesChange.next(this.incidentsCategries);
          resolve(this.incidentsCategries);
        }, reject);
    });
  }

  splitControllerName(controllerName: string): string {
    let result = '';

    controllerName.split(/(?=[A-Z])/g).forEach((element) => {
      result += element.toLocaleLowerCase() + '-';
    });

    return result.slice(0, -1);
  }

  downloadIncidintCategoryReport(exportAs: 'PDF' | 'EXCEL') {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/incident-categories/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
        },
        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          const newBlob = new Blob([res], {
            type: `application/${
              exportAs === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  /*
   *All  about  Navigations  menu   controller (GET - POST - DELETE - UPDATE )
   */

  createNavigationsMenu(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/modules`, level, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.getNavigationsMenu();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  getNavigationsMenu() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/modules`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          const list = response['result'];
          this.navigations = list.map((level) => {
            return new NavigationItem(level);
          });

          this.onNavigationsChange.next(this.navigations);

          resolve(this.onNavigationsChange);
        }, reject);
    });
  }

  deleteNavigationItem(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(`${environment.apiUrl}/modules/${id}`, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              this.getNavigationsMenu();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateNavigationItem(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(`${environment.apiUrl}/modules`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            this.getNavigationsMenu();
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('faile'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  getPriorities() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/priorities`, {})
      .pipe((priorities) => {
        return priorities;
      });
  }

  getIncidentSubCategories(id) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/incident-categories/${id}/children`, {})
      .pipe((categories) => {
        return categories;
      });
  }

  getIncidentCategoriesConfig(id, sector) {
    return this.httpClient
      .get<any>(
        `${environment.apiUrl}/incident-categorie-config/find/${id}`,
        {}
      )
      .pipe((categories) => {
        return categories;
      });
  }

  getkpis() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/kpis`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.Kpis = response['result'].content;
          this.Kpis = this.Kpis.map((level) => {
            // return new KpiModel(level);
            return level;
          });
          this.onKpisChange.next(this.Kpis);
          resolve(this.Kpis);
        }, reject);
    });
  }

  getKpiById(id: number) {
    return this.Kpis.find((item) => item.id == id);
  }

  getKpiByIdwithConfig(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(
          `${environment.apiUrl}/incident-categorie-config/find/kpi/${id}`,
          {}
        )
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }

          this.kpiInfo = response['result'];

          resolve(this.kpiInfo);
        }, reject);
    });
  }

  getOrgs(id) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/organizations/hierarchy/level/${id}`, {})
      .pipe((orgs) => {
        return orgs;
      });
  }

  createKpi(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.apiUrl}/kpis`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            // removed
            // this.createCategoriesForKpi(level,res)
            //  .then((ok)=>{
            //  });
            this.alertService.openSuccessSnackBar();
            // const newItem = new KpiModel(res["result"]);
            const newItem = res['result'];
            this.Kpis.push(newItem);
            this.onKpisChange.next(this.Kpis);
            resolve(newItem);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  deleteKpi(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(`${environment.apiUrl}/kpis/${id}`, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            this.Kpis = this.Kpis.filter((item) => {
              return item.id !== id;
            });
            this.onKpisChange.next(this.Kpis);

            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  updateKpi(level: any, configId) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(`${environment.apiUrl}/kpis`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            // removed
            // this.updateCategoriesForKpi(level,res,configId).then((ok)=>{
            // });
            this.alertService.openSuccessSnackBar();

            this.Kpis = this.Kpis.map((el) => {
              if (el.id == level.id) {
                return level;
              } else {
                return el;
              }
            });
            this.onKpisChange.next(this.Kpis);
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  getCenters() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/service-center-area/center-list`, {})
      .pipe((centers) => {
        return centers;
      });
  }

  getDistricts() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/service-center-area/district-list`, {})
      .pipe((districts) => {
        return districts;
      });
  }

  createCategoriesForKpi(kpiob, kpiRes) {
    const configObj = {
      group: { id: kpiob.group },
      isActive: true,
      kpi: {
        id: kpiRes.result.id,
      },
      contractorOrg: {
        id: kpiob.orgStructure.id,
      },
      centerName: kpiob.centerName,
    };

    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/incident-categorie-config`, configObj, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateCategoriesForKpi(kpiob, kpiRes, configId) {
    const configObj = {
      id: configId,
      group: kpiob.group == 'null' ? null : { id: kpiob.group },
      isActive: true,
      kpi: {
        id: kpiRes.result.id,
      },
      contractorOrg: {
        id: kpiob.orgStructure.id,
      },
      centerName: kpiob.centerName,
    };

    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/incident-categorie-config`, configObj, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  // SLA information

  getSLAs() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/sla`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.Sla = response['result'].content;
          this.Sla = this.Sla.map((level) => {
            return level;
          });
          this.onSLAChange.next(this.Sla);
          resolve(this.Sla);
        }, reject);
    });
  }

  getSlaById(id: number) {
    return this.Sla.find((item) => item.id == id);
  }

  getSLAByIdwithConfig(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/sla/${id}/details`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.SlaInfo = response['result'];
          resolve(this.SlaInfo);
        }, reject);
    });
  }

  createSLA(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/sla`, new Sla(level), {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();

              // removed
              this.createSlaDetails(level, res).then((ok) => {});

              // const newItem = new KpiModel(res["result"]);
              const newItem = res['result'];
              this.Sla.push(newItem);
              this.onSLAChange.next(this.Sla);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('failed'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  deleteSLA(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(`${environment.apiUrl}/slas/${id}`, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            this.Sla = this.Sla.filter((item) => {
              return item.id !== id;
            });
            this.onSLAChange.next(this.Sla);

            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  updateSLA(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/sla`, new Sla(level), {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              // removed
              this.updateSlaDetails(level, res).then((ok) => {});
              this.Sla = this.Sla.map((el) => {
                if (el.id == level.id) {
                  level.contractor = level.orgStructure;
                  level.group = { id: level.group };
                  return level;
                } else {
                  return el;
                }
              });

              this.onSLAChange.next(this.Sla);
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('failed'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  createSlaDetails(slaObj, slaRes) {
    const createAll = [];

    // let configObj = {
    //   "isActive": true,
    //   "kpi": {
    //     "id": slaObj.kpi,
    //   },
    //   "priority": slaObj.priority,
    //   "sla" :  {
    //     "id": slaRes.result.id,
    //   },
    //   "time" : slaObj.time
    // }

    if (slaObj.priority.length > 0) {
      slaObj.priority.forEach((prior) => {
        const configObjSingle = {
          isActive: true,
          kpi: {
            id: prior.kpis,
          },
          priority: { id: prior.priority },
          sla: {
            id: slaRes.result.id,
          },
          time: prior.time,
        };
        createAll.push(configObjSingle);
      });
    }

    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/sla-details/all`, createAll, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  updateSlaDetails(slaObj, kpiRes) {
    const createAll = [];

    if (slaObj.priority.length > 0) {
      slaObj.priority.forEach((prior) => {
        const configObjSingle = {
          isActive: true,
          kpi: {
            id: prior.kpis,
          },
          priority: { id: prior.priority },
          sla: {
            id: slaObj.id,
          },
          time: prior.time,
          id: prior.id,
        };
        createAll.push(configObjSingle);
      });
    }

    return new Promise((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/sla-details/all`, createAll, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  // Ranks Information
  // SLA information

  getRanks() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any>(`${environment.apiUrl}/ranks`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject;
          }
          this.Ranks = response['result'];
          this.Ranks = this.Ranks.map((level) => {
            return level;
          });
          this.onRanksChange.next(this.Ranks);
          resolve(this.Ranks);
        }, reject);
    });
  }

  getRankById(id: number) {
    return this.Ranks.find((item) => item.id == id);
  }

  createRank(level: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.apiUrl}/ranks`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            const newItem = res['result'];
            this.Ranks.push(newItem);
            this.onRanksChange.next(this.Ranks);
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  deleteRank(id: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(`${environment.apiUrl}/ranks/${id}`, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            this.Ranks = this.Ranks.filter((item) => {
              return item.id !== id;
            });
            this.onRanksChange.next(this.Ranks);

            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  updateRank(level: any, id) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(`${environment.apiUrl}/ranks`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();

            this.Ranks = this.Ranks.map((el) => {
              if (el.id == level.id) {
                return level;
              } else {
                return el;
              }
            });
            this.onRanksChange.next(this.Ranks);
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  getMobileVersions() {
    return this.httpClient.get(`${environment.apiUrl}/version/ext/all`);
  }

  getLocalRisks(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/local-risk`);
  }

  createMobileVersion(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/version`, data);
  }

  updateMobileVersion(data: any) {
    return this.httpClient.put(`${environment.apiUrl}/version`, data);
  }

  // Notifications
  getNotifications(page = '0', size = '20') {
    return this.httpClient.get<any>(`${environment.apiUrl}/events-config`, {
      params: { page: page, size: size },
    });
  }

  updateNotifications(data: any) {
    return this.httpClient
      .put(`${environment.apiUrl}/events-config/` + data?.id, data)
      .pipe(
        tap((res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
          } else {
            this.alertService.openFailureSnackBar();
          }
        })
      );
  }
}
