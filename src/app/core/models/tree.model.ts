export interface TreeModel {
  parent?: TreeModel;
  children?: TreeModel[];
  [key: string]: any;
}
