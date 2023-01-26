/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IEntityNames } from './i-entity-names';
import { IEnum } from './i-enum';
export interface BaseLibraryProjection {
  category?: IEntityNames;
  createdBy?: IEntity;
  createdOn?: string;
  id?: number;
  itemType?: IEnum;
  libraryAccessType?: IEntity;
  name?: string;
  organization?: IEntityNames;
  parent?: IEntity;
}

