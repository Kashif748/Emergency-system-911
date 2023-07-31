import { BcImpactMatrixDto } from '../../../../api/models';

export namespace ImpactMatrixAction {
  export class LoadPage {
    static readonly type = '[ImpactMatrix] Load Page';

    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
      }
    ) {}
  }

  export class Create {
    static readonly type = '[ImpactMatrix] Create';
    /**
     *
     */
    constructor(public payload: BcImpactMatrixDto) {}
  }

  export class Update {
    static readonly type = '[ImpactMatrix] Update';
    /**
     *
     */
    constructor(public payload: BcImpactMatrixDto) {}
  }

  export class GetImpactMatrix {
    static readonly type = '[ImpactMatrix] Get ImpactMatrix';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
