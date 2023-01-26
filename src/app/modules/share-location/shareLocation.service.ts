import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MapConfig,
  MapService,
} from '@shared/components/map/services/map.service';
import { environment } from 'src/environments/environment';
import { ShareLocationModule } from './share-location.module';

@Injectable({
  providedIn: 'root',
})
export class ShareLocationService {
  constructor(private http: HttpClient) {}

  verifyUUID(uuid: string) {
    return this.http.get(
      `${environment.apiUrl}/incidents/ext/uuid?uuid=${uuid}`
    );
  }

  sendReporterLocation(body: {
    location: string;
    uuid: string;
    createdOn: Date;
  }) {
    return this.http.post(
      `${environment.apiUrl}/incident-reporter-location/ext`,
      body
    );
  }

  getReporterLocation(incidentId: string) {
    return this.http.get(
      `${environment.apiUrl}/incident-reporter-location/${incidentId}`
    );
  }
}
