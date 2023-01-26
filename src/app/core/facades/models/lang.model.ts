export class LangModel {
  key?: "ar" | "en" | string;
  name?: string;
  dir?: string;
}

export interface LangStateModel {
  AvailableLangs: LangModel[];
  ActiveLang: LangModel;
}
