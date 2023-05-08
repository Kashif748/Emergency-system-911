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
import { OrgAssetsProjection } from 'src/app/api/models';
import { AssetControllerService } from 'src/app/api/services';
import { AssetAction } from './asset.action';

export interface AssetStateModel {
  assets: OrgAssetsProjection[];
  loading: boolean;
}

const TASK_STATE_TOKEN = new StateToken<AssetStateModel>('asset');
@State<AssetStateModel>({
  name: TASK_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class AssetState {
  /**
   *
   */
  constructor(private assetService: AssetControllerService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([AssetState])
  static assets(state: AssetStateModel) {
    return state?.assets;
  }

  /* ********************** ACTIONS ************************* */

  @Action(AssetAction.LoadAssets)
  loadAssets(
    { setState }: StateContext<AssetStateModel>,
    { payload }: AssetAction.LoadAssets
  ) {
    if (payload.clear) {
      setState(
        patch<AssetStateModel>({
          assets: [],
        })
      );
      return;
    }
    setState(
      patch<AssetStateModel>({
        loading: true,
      })
    );
    // return this.commonDataService.commonData()
    return this.assetService
      .search8({
        orgId: payload.orgId,
        categoryId: payload.categoryId,
        details: payload.search,
        pageable: {
          page: payload.page ?? 0,
          size: payload.size ?? 10,
        },
      })
      .pipe(
        tap(({ result: { content: list } }) => {
          setState(
            patch<AssetStateModel>({
              assets: list,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<AssetStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
