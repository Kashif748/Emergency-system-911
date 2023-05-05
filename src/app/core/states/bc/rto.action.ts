import {Bcrto} from "../../../api/models/bcrto";

export namespace RtoAction {
  export class LoadPage {
    static readonly type = '[Rto] Load Page';

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
    ) {
    }
  }

  export class Create {
    static readonly type = '[Rto] Create';
    /**
     *
     */
    constructor(
      public payload: Bcrto
    ) {}
  }
}
