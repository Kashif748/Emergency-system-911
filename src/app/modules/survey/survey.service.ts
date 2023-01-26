import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  checkUUID(uuid) {
    return this.http.get(`${environment.apiUrlV2}/incident-survey/ext/${uuid}`);
  }
  addNewSurvey(surveyForm, uuid) {
    return this.http.post(
      `${environment.apiUrl}/incident-survey/ext/${uuid}`,
      surveyForm
    );
  }

  getOrgByIncidentUUID(uuid) {
    return this.http.get(
      `${environment.apiUrl}/incident-survey/ext/logo/${uuid}`
    );
  }
}
