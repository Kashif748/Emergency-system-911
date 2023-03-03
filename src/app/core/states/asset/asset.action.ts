export namespace AssetAction {
  export class LoadAssets {
    static readonly type = '[Asset] Load Assets';
    /**
     *
     */
    constructor(
      public payload: {
        search?: string;
        orgId?: number;
        categoryId?: number;
        page?: number;
        size?: number;
        clear?: boolean;
      }
    ) {}
  }
}
