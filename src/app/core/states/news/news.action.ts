export namespace NewsAction {
  export class LoadPage {
    static readonly type = '[News] Load Page';
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
}
