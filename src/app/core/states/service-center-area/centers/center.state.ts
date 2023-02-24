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
import {CenterAction} from '../centers/center.action';
import {ServiceCenterAreaServiceControllerService} from "../../../../api/services/service-center-area-service-controller.service";


export interface ServiceCenterModel {
  /**
   * temporary state to store entities and select them once
   */
  centers: Array<{ [key: string]: {  } }>;

  /**
   * temporary state to store entities and select them once
   */
}

const ROLE_STATE_TOKEN = new StateToken<ServiceCenterModel>('serviceCenterArea');
@State<ServiceCenterModel>({ name: ROLE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class CenterState {
  /**
   *
   */
  constructor(
    private ServiceCenterArea: ServiceCenterAreaServiceControllerService,
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([CenterState])
  static centers(state: ServiceCenterModel) {
    return state?.centers;
  }

  /* ********************** ACTIONS ************************* */
  @Action(CenterAction.LoadServiceCenter)
  loadCenter(
    { setState }: StateContext<ServiceCenterModel>,
  ) {
      return this.ServiceCenterArea
        .getCenters({ })
        .pipe(
          tap((r) => {
            setState(
              patch<ServiceCenterModel>({
                centers: r.result,
              })
            );
          })
        );
  }
}
