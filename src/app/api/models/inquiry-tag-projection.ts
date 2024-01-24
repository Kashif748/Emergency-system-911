/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { TagProjection } from './tag-projection';
export interface InquiryTagProjection {
  id?: number;
  inquiry?: IEntity;
  tag?: TagProjection;
}

