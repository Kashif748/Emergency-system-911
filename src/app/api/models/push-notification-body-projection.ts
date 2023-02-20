/* tslint:disable */
/* eslint-disable */
import { EventsConfigProjection } from './events-config-projection';
import { IEntity } from './i-entity';
export interface PushNotificationBodyProjection {
  body?: string;
  createdBy?: IEntity;
  createdOn?: string;
  enBody?: string;
  event?: EventsConfigProjection;
  id?: number;
  isActive?: boolean;
  titleAr?: string;
  titleEn?: string;
  updatedBy?: IEntity;
  updatedOn?: string;
}

