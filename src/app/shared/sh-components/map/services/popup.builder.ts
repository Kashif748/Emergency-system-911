import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CdatePipe } from '@shared/sh-pipes/cdate.pipe';

@Injectable()
export class PopupBuilder {
  constructor(private cdate: CdatePipe, private translate: TranslateService) {}

  public readonly popupOptions: __esri.PopupProperties = {
    dockEnabled: false,
    dockOptions: {
      buttonEnabled: false,
    },
    highlightEnabled: false,
    collapseEnabled: false,
    autoOpenEnabled: false,
  };

  public buildPopup(type: 'Incident' | 'Task') {
    let popup = {
      title: this.buildTitle.bind(this, type),
      outFields: ['*'],
      autoOpenEnabled: true,
      dockEnabled: false,
      actions: [],
    } as __esri.PopupTemplateProperties;

    switch (type) {
      case 'Incident':
        popup.content = this.buildIncidentContent.bind(this);
        break;
      case 'Task':
        popup.content = this.buildTaskContent.bind(this);
        break;
      default:
        popup = null;
        break;
    }
    return popup as __esri.PopupTemplate;
  }

  private buildTitle(type: 'Incident' | 'Task' = 'Incident') {
    const template = `
    <div class="row position-relative">
      <div class="d-flex w-100 px-4">
        <span class="my-auto d-flex">
          <span class="title-icon"></span>
          <span class="mx-2 mt-auto" style="font-weight: 700;">{${
            type == 'Incident' ? 'INCIDENT_REF_ID' : 'TASK_REF_ID'
          }}/2023</span>
        </span>
        <span class="flex-grow-1"></span>
        <a class="p-button" style="height: 27px;" href="${location.origin}${
      type == 'Incident'
        ? '/incidents/view/{INCIDENT_REF_ID}'
        : '/task-management/task?_dialog=opened&_id={TASK_REF_ID}&_mode=viewonly'
    }" target="_blank">
          <span>${this.translate.instant(
            type == 'Incident' ? 'INCIDENTS.showIncident' : 'TASK.SHOW'
          )}</span>
        </a>
      </div>
    </div>`;
    return template;
  }

  private buildIncidentContent(feature: __esri.Feature) {
    const attrs = feature.graphic.attributes;
    const template = `
    <div class="divider mb-4"></div>
    <table class="table table-borderless bg-white crounded">
      <thead></thead>
      <tbody>
        <tr>
          <th scope="row">${this.translate.instant('INCIDENTS.SUBJECT')}:</th>
          <td>{NAME}</td>
        </tr>

        <tr>
          <th scope="row">${this.translate.instant(
            'INCIDENTS.CREATION_DATE'
          )}:</th>
          <td>${this.cdate.transform(attrs?.CREATION_DATE, 'short')}</td>
        </tr>

        <tr>
          <th scope="row">${this.translate.instant(
            'INCIDENTS.CLOSE_DATE'
          )}:</th>
          <td>${this.cdate.transform(attrs?.CLOSE_DATE, 'short')}</td>
        </tr>

        <tr>
          <th scope="row">${this.translate.instant('INCIDENTS.PRIORITY')}:</th>
          <td>{PRIORITY}</td>
        </tr>

        <tr>
          <th scope="row">${this.translate.instant(
            'INCIDENTS.MAIN_CATEGORY'
          )}:</th>
          <td>
          {INC_CATEGORY}
          </td>
        </tr>
      </tbody>
    </table>`;
    return template;
  }

  private buildTaskContent(feature: __esri.Feature) {
    const attrs = feature.graphic.attributes;
    const template = `
    <div class="divider mb-4"></div>
    <table class="table table-borderless bg-white crounded">
      <thead></thead>
      <tbody>
        <tr>
          <th scope="row" class="d-flex"><span>${this.translate.instant(
            'TASK.TASK_TITLE'
          )}</span><span class="flex-grow-1"></span><span>:</span></th>
          <td>{NAME}</td>
        </tr>

        <tr>
          <th scope="row" class="d-flex"><span>${this.translate.instant(
            'INCIDENTS.ORGANIZATION'
          )}</span><span class="flex-grow-1"></span><span>:</span></th>
          <td>{ORG_NAME}</td>
        </tr>

        <tr>
          <th scope="row" class="d-flex"><span>${this.translate.instant(
            'TASK.TASK_TYPE'
          )}</span><span class="flex-grow-1"></span><span>:</span></th>
          <td>
          {TASK_TYPE}
          </td>
        </tr>

        <tr>
          <th scope="row" class="d-flex"><span>${this.translate.instant(
            'TASK.PRIORITY'
          )}</span><span class="flex-grow-1"></span><span>:</span></th>
          <td>{PRIORITY}</td>
        </tr>
        <tr>
          <th scope="row" class="d-flex"><span>${this.translate.instant(
            'TASK.DUE_DATE'
          )}</span><span class="flex-grow-1"></span><span>:</span></th>
          <td>${this.cdate.transform(attrs?.DUE_DATE, 'short')}</td>
        </tr>
      </tbody>
    </table>`;
    return template;
  }
}
