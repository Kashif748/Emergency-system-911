/* tslint:disable */
/* eslint-disable */
import { Coordinate } from './coordinate';
import { CoordinateSequence } from './coordinate-sequence';
import { Envelope } from './envelope';
import { Geometry } from './geometry';
import { GeometryFactory } from './geometry-factory';
import { PrecisionModel } from './precision-model';
export interface Point {
  area?: number;
  boundary?: Geometry;
  boundaryDimension?: number;
  centroid?: Point;
  coordinate?: Coordinate;
  coordinateSequence?: CoordinateSequence;
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
  'x'?: number;
  'y'?: number;
}

