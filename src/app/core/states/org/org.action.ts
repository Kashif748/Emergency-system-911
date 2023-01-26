export namespace OrgAction {
  export class LoadOrgs {
    static readonly type = '[Org] Load Orgs';
    /**
     *
     */
    constructor(public payload: { orgId?: number }) {}
  }

  export class LoadModules {
    static readonly type = '[Org] Load Modules';
    /**
     *
     */
    constructor(public payload: { orgId?: number }) {}
  }
}
