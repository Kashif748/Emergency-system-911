import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {catchError, finalize, map, switchMap, tap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {BcLocationTypes} from "../../../../api/models/bc-location-types";
import {PageBcLocationTypes} from "../../../../api/models/page-bc-location-types";
import {BcLocationTypeControllerService} from "../../../../api/services/bc-location-type-controller.service";
import {LocationTypeAction} from "@core/states/bc/location-type/locationType.action";


export interface LocationTypeStateModel {
  page: PageBcLocationTypes;
  locationType: BcLocationTypes;
  loading: boolean;
  blocking: boolean;
}

const LOCATION_TYPE_STATE_TOKEN = new StateToken<LocationTypeStateModel>('locationType');

@State<LocationTypeStateModel>({ name: LOCATION_TYPE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class LocationTypeState {
  /**
   *
   */
  constructor(
    private locationType: BcLocationTypeControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([LocationTypeState])
  static page(state: LocationTypeStateModel) {
    return state?.page?.content;
  }

  @Selector([LocationTypeState])
  static locationType(state: LocationTypeStateModel) {
    return state?.locationType;
  }

  @Selector([LocationTypeState])
  static totalRecords(state: LocationTypeStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([LocationTypeState])
  static loading(state: LocationTypeStateModel) {
    return state?.loading;
  }

  @Selector([LocationTypeState])
  static blocking(state: LocationTypeStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(LocationTypeAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<LocationTypeStateModel>,
    { payload }: LocationTypeAction.LoadPage
  ) {
    setState(
      patch<LocationTypeStateModel>({
        loading: true,
      })
    );
    return this.locationType
      .getAll12({
        isActive: true,
        versionId: 1,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        // request: payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<LocationTypeStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<LocationTypeStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<LocationTypeStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(LocationTypeAction.Create)
  create(
    { setState }: StateContext<LocationTypeStateModel>,
    { payload }: LocationTypeAction.Create
  ) {
    setState(
      patch<LocationTypeStateModel>({
        blocking: true,
      })
    );
    return this.locationType
      .insertOne3({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<LocationTypeStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(LocationTypeAction.GetLocationType, { cancelUncompleted: true })
  getRto(
    { setState }: StateContext<LocationTypeStateModel>,
    { payload }: LocationTypeAction.GetLocationType
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<LocationTypeStateModel>({
          locationType: undefined,
        })
      );
      return;
    }
    setState(
      patch<LocationTypeStateModel>({
        blocking: true,
      })
    );
    return this.locationType.getOne3({ id: payload.id }).pipe(
      tap((locationType) => {
        setState(
          patch<LocationTypeStateModel>({
            locationType: locationType.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<LocationTypeStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
