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
import {
  OrgStructure,
  OrgStructureProjection,
  UserModulePrivilegeProjection,
} from 'src/app/api/models';
import {
  ModuleOrgControllerService,
  OrganizationHierarchicalStructureService,
  OrgStructureControllerService,
} from 'src/app/api/services';
import { OrgAction } from '../org/org.action';

export interface OrgStateModel {
  /**
   * temporary state to store entities and select them once
   */
  orgs: (OrgStructure | OrgStructureProjection)[];

  /**
   * temporary state to store entities and select them once
   */
  modules: UserModulePrivilegeProjection[];
  modulesLoading: boolean;
}

const ROLE_STATE_TOKEN = new StateToken<OrgStateModel>('org');
@State<OrgStateModel>({ name: ROLE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OrgState {
  /**
   *
   */
  constructor(
    private orgService: OrgStructureControllerService,
    private orghService: OrganizationHierarchicalStructureService,
    private moduleService: ModuleOrgControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([OrgState])
  static orgs(state: OrgStateModel) {
    return state?.orgs;
  }

  @Selector([OrgState])
  static modulesLoading(state: OrgStateModel) {
    return state?.modulesLoading;
  }

  @Selector([OrgState])
  static modules(state: OrgStateModel) {
    return state?.modules;
  }

  /* ********************** ACTIONS ************************* */
  @Action(OrgAction.LoadOrgs)
  loadOrgs(
    { setState }: StateContext<OrgStateModel>,
    { payload }: OrgAction.LoadOrgs
  ) {
    if (![undefined, null].includes(payload.orgId)) {
      return this.orghService
        .getOrgStructLevel1({ parentId: payload.orgId })
        .pipe(
          tap((r) => {
            setState(
              patch<OrgStateModel>({
                orgs: r.result,
              })
            );
          })
        );
    }
    return this.orgService.getAllOrgStructByType().pipe(
      tap((r) => {
        setState(
          patch<OrgStateModel>({
            orgs: r.result,
          })
        );
      })
    );
  }

  @Action(OrgAction.LoadModules)
  loadModules(
    { setState }: StateContext<OrgStateModel>,
    { payload }: OrgAction.LoadModules
  ) {
    if ([undefined, null].includes(payload.orgId)) {
      setState(
        patch<OrgStateModel>({
          modules: [],
        })
      );
      return;
    }
    setState(
      patch<OrgStateModel>({
        modulesLoading: true,
      })
    );
    return this.moduleService.getByOrgId1({ orgId: payload.orgId }).pipe(
      tap((r) => {
        setState(
          patch<OrgStateModel>({
            modules: r.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<OrgStateModel>({
            modulesLoading: false,
          })
        );
      })
    );
  }
}
