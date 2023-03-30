/* tslint:disable */
/* eslint-disable */
import { Coordinate } from './coordinate';
import { Envelope } from './envelope';
import { GeometryFactory } from './geometry-factory';
import { Point } from './point';
import { PrecisionModel } from './precision-model';
export interface Geometry {
  area?: number;
  boundary?: Geometry;
  boundaryDimension?: number;
  centroid?: Point;
  coordinate?: Coordinate;
  coordinates?: Array<Coordinate>;
  dimension?: number;
  empty?: boolean;
  envelope?: Geometry;
  envelopeInternal?: Envelope;
  factory?: GeometryFactory;
  geometryType?: string;
  interiorPoint?: Point;
  length?: number;
  numGeometries?: number;
  numPoints?: number;
  precisionModel?: PrecisionModel;
  rectangle?: boolean;
  simple?: boolean;
  srid?: number;
  userData?: {  };
  valid?: boolean;
}

