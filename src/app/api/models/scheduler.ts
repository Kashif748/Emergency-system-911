/* tslint:disable */
/* eslint-disable */
import { Module } from './module';
export interface Scheduler {
  code: string;
  config?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  id?: number;
  isActive?: boolean;
  lastRunDate?: string;
  module: Module;
  nameAr: string;
  nameEn: string;
  nextRunDate?: string;
  pattern: string;
}

