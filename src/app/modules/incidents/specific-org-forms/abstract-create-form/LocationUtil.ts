import * as UtmConverter from 'utm-converter';

export class LocationUtil {

  static getLatLngFrom(utm: any) {
    const converter = new UtmConverter();
    const wgsResult = converter.toWgs({coord: {x: utm.easting, y: utm.northing}, zone: utm.zone});
    return {latitude: wgsResult.coord.latitude, longitude: wgsResult.coord.longitude};
  }

  static buildGoogleMapUrl(latitude: number, longitude: number) {
    //  return `http://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${latitude},${longitude}`;
    // return `https://www.google.com/maps/dir/${latitude},${longitude}/${latitude},${longitude}/@${latitude},${longitude},12z`;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  static getUtmFrom(latLng: any) {
    const converter = new UtmConverter();
    const wgsResult = converter.toUtm({coord: [latLng.lng, latLng.lat]});
// {"coord":{"x":345196.1971905405,"y":5811540.431764047},"zone":55,"isSouthern":true}
    return {x: wgsResult.coord.x, y: wgsResult.coord.y, zone: wgsResult.coord.zone, isSouthern: wgsResult.coord.isSouthern};
  }
}
