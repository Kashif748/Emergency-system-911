import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { finalize, tap } from 'rxjs/operators';
import {IncidentLocationInfo} from "../../../api/models";
import {GroupCategoryCenterControllerService} from "../../../api/services/group-category-center-controller.service";
import {IncicentLocationInfoAction} from "@core/states/incident-location-info/incidentLocInfo.action";
import {IncidentLocationInfoResponse} from "../../../api/models/incident-location-info-response";
import {GroupStateModel} from "@core/states/group/group.state";


export interface ServiceCenterModel {
  /**
   * temporary state to store entities and select them once
   */
  incidentLocationInfo: IncidentLocationInfo;
  getincidentLocationInfo: IncidentLocationInfoResponse;
  blocking: boolean;

  /**
   * temporary state to store entities and select them once
   */
}

const ROLE_STATE_TOKEN = new StateToken<ServiceCenterModel>('incidentLocInfo');
@State<ServiceCenterModel>({ name: ROLE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class IncidentLocInfoState {
  /**
   *
   */
  constructor(
    private incidentLocInfo: GroupCategoryCenterControllerService,
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([IncidentLocInfoState])
  static centers(state: ServiceCenterModel) {
    return state?.incidentLocationInfo;
  }

  @Selector([IncidentLocInfoState])
  static getIncidentLocInfo(state: ServiceCenterModel) {
    return state?.getincidentLocationInfo;
  }

  @Selector([IncidentLocInfoState])
  static blocking(state: ServiceCenterModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(IncicentLocationInfoAction.IncidentLocationInfo)
  incidentLocationInfo(
    { setState }: StateContext<ServiceCenterModel>,
    { payload }: IncicentLocationInfoAction.IncidentLocationInfo
  ) {
      return this.incidentLocInfo
        .addInfo({
          body: payload
        })
        .pipe(
          finalize(() => {
            setState(
              patch<ServiceCenterModel>({
                blocking: false,
              })
            );
          })
        );
  }

  @Action(IncicentLocationInfoAction.UpdateIncidentLocationInfo)
  updateIncidentLocationInfo(
    { setState }: StateContext<ServiceCenterModel>,
    { payload }: IncicentLocationInfoAction.UpdateIncidentLocationInfo
  ) {
    return this.incidentLocInfo
      .update41({
        body: payload
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ServiceCenterModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(IncicentLocationInfoAction.GetIncidentLocationInfo)
  GetIncidentLocationInfo(
    { setState }: StateContext<ServiceCenterModel>,
    { payload }: IncicentLocationInfoAction.GetIncidentLocationInfo
  ) {
    return this.incidentLocInfo
      .getByGroupCenter({
        groupId: payload.id
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ServiceCenterModel> ( {
              getincidentLocationInfo: res.result
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ServiceCenterModel>({
              blocking: false,
            })
          );
        })
      );
  }

}
