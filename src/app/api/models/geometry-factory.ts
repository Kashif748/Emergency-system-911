/* tslint:disable */
/* eslint-disable */
import { CoordinateSequenceFactory } from './coordinate-sequence-factory';
import { PrecisionModel } from './precision-model';
export interface GeometryFactory {
  coordinateSequenceFactory?: CoordinateSequenceFactory;
  precisionModel?: PrecisionModel;
  srid?: number;
}

