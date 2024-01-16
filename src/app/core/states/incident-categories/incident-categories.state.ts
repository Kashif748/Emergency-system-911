import {Injectable} from '@angular/core';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';
import {finalize, tap} from 'rxjs/operators';
import {IncidentCategoryControllerService} from "../../../api/services/incident-category-controller.service";
import {IncidentCategoryProjaction} from "../../../api/models/incident-category-projaction";
import {IncidentCategoriesAction} from "@core/states/incident-categories/incident-categories.action";

export interface IncidentCategoriesStateModel {
  incidentCategories: IncidentCategoryProjaction[];
  loading: boolean;
  blocking: boolean;
}

const INCDINT_CATEGORY_STATE_TOKEN = new StateToken<IncidentCategoriesStateModel>('incidentCategories');
@State<IncidentCategoriesStateModel>({
  name: INCDINT_CATEGORY_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class IncidentCategoriesState {
  /**
   *
   */
  constructor(
    private incidentCategoryService: IncidentCategoryControllerService,
  ) {}

  /* ************************ SELECTORS ******************** */

  @Selector([IncidentCategoriesState])
  static incidentCategories(state: IncidentCategoriesStateModel) {
    return state?.incidentCategories;
  }


  @Selector([IncidentCategoriesState])
  static loading(state: IncidentCategoriesStateModel) {
    return state?.loading;
  }
  /* ********************** ACTIONS ************************* */

  @Action(IncidentCategoriesAction.LoadIncidentCategories, { cancelUncompleted: true })
  loadIncidents(
    { setState }: StateContext<IncidentCategoriesStateModel>,
    { }: IncidentCategoriesAction.LoadIncidentCategories
  ) {
    setState(
        patch<IncidentCategoriesStateModel>({
          loading: true,
        })
    );
    return this.incidentCategoryService
      .findActiveList4()
      .pipe(
        tap(({ result: list }) => {
          setState(
            patch<IncidentCategoriesStateModel>({
              incidentCategories: list,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<IncidentCategoriesStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
