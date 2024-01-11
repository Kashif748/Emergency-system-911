import { isEmpty } from 'lodash';

import { Challenge } from '../challenges/model/Challenge';

export class Incident {
  city: number;
  createdBy: number;
  createdOn: string;
  description: string;
  emergencyLevel: number;
  id: number;
  incidentCategory: number;
  incidentDate: any;
  closedDate: any;
  locationReachedDate: any;
  locationUrl: string;
  containedDate: any;
  incidentEnvironmentImpact: any[];
  incidentGroups: any[];
  incidentHospitals: [];
  incidentParentCategory: number;
  centerCategory: number;
  incidentReasons: any[];
  incidentOrgs: any[];
  incidentTags: any[];
  incidentRiskImpact: any;
  incidentsChallengesReqs: Challenge[];
  isInternal: boolean;
  notifyReporter: boolean;
  other: string;
  plot: string;
  priority: number;
  kpi: number;
  reportedByEmail: string;
  reportedByMobile: string;
  reportedByName: string;
  reportingVia: number;
  sector: number;
  specialized: number;
  specializedEmail: string;
  specializedMobile: string;
  status: number;
  street: string;
  subject: string;
  zone: string;
  generalPosition: string;
  incidentCells: any[];
  primaryOrg: IorgStructure;
  secondaryOrg: any[];
  featureName: string;
  interimIncident: number;
  getLocationFromReporter: boolean;

  constructor(incident: Iincident) {
    this.city = incident?.city?.id || null;
    this.createdBy = incident?.createdBy?.id || null;
    this.createdOn = incident?.createdOn || '';
    this.generalPosition = incident?.generalPosition || '';
    this.description = incident?.description || null;
    this.emergencyLevel = incident?.emergencyLevel?.id || null;
    this.id = incident?.id || 0;
    this.incidentDate = incident?.incidentDate;
    this.closedDate = incident?.closedDate;
    this.locationReachedDate = incident?.locationReachedDate;
    this.containedDate = incident?.containedDate;
    this.incidentEnvironmentImpact = this.prepareIncidentImpacts(
      incident?.incidentEnvironmentImpact
    );
    this.incidentGroups = this.prepareIncidentGroups(incident?.incidentGroups);
    this.incidentHospitals = incident?.incidentHospitals || [];
    this.incidentParentCategory = incident?.incidentParentCategory?.id || null;
    this.incidentCategory = incident?.incidentCategory?.id || null;
    this.centerCategory = incident?.centerCategory?.id || null;
    this.incidentReasons = this.prepareIncidentsReasons(
      incident?.incidentReasons
    );
    this.prepareIncidentsOrgs(incident?.incidentOrgs);
    this.incidentRiskImpact = incident?.incidentRiskImpact?.id || null;
    this.incidentsChallengesReqs = incident?.incidentsChallengesReqs || [];
    this.isInternal = incident?.isInternal || false;
    this.notifyReporter = incident?.notifyReporter || false;
    this.other = incident?.other;
    this.plot = incident?.plot;
    this.priority = incident?.priority?.id || null;
    this.kpi = incident?.kpi?.id || null;
    this.reportedByEmail = incident?.reportedByEmail;
    this.reportedByMobile =
      incident.reportedByMobile && incident?.reportedByMobile[0] == '+'
        ? incident?.reportedByMobile
        : incident?.reportedByMobile
        ? '+' + incident?.reportedByMobile
        : '';

    this.reportedByName = incident?.reportedByName;
    this.reportingVia = incident?.reportingVia.id || null;
    this.sector = incident?.sector;
    this.specialized = incident?.specialized?.id || null;
    this.specializedEmail = incident?.specializedEmail;
    this.specializedMobile =
      incident?.specializedMobile && incident?.specializedMobile[0] == '+'
        ? incident.specializedMobile
        : '+' + incident.specializedMobile;
    this.status = incident?.status?.id || null;
    this.street = incident?.street;
    this.subject = incident?.subject;
    this.zone = incident?.zone;
    this.featureName = incident?.featureName;
    this.interimIncident = incident?.interimIncident;
    this.locationUrl = incident?.locationUrl;
  }

  prepareIncidentImpacts(envEmpacts: IincidentImpact[]) {
    if (!isEmpty(envEmpacts)) {
      return envEmpacts.map((imp) => imp.id);
    }

    return [];
  }

  prepareIncidentGroups(groups: IincidentGroup[]) {
    const _groups = [];
    this.incidentCells = [];
    groups.forEach((group) => {
      if (group.cell == true) {
        this.incidentCells.push(group.group.id);
      } else {
        _groups.push(group.group.id);
      }
    });

    return _groups;
  }

  prepareIncidentsReasons(reasons: IincidentReason[]) {
    if (!isEmpty(reasons)) {
      return reasons.map((reson) => reson.id);
    }

    return [];
  }

  prepareIncidentsOrgs(orgs: IincidentOrg[]) {
    this.secondaryOrg = [];

    if (!isEmpty(orgs)) {
      orgs.forEach((org) => {
        if (org.isMain) {
          this.primaryOrg = org.orgStructure;
        } else {
          this.secondaryOrg.push(org.orgStructure);
        }
      });
    }
  }
}

export interface Iincident {
  city: Iintity;
  createdBy: Iintity;
  createdOn: string;
  description: string;
  emergencyLevel: Iintity;
  id: number;
  incidentCategory: Iintity;
  incidentDate: string;
  closedDate: string;
  locationReachedDate: string;
  containedDate: string;
  incidentEnvironmentImpact: IincidentImpact[];
  incidentGroups: IincidentGroup[];
  incidentHospitals: [];
  incidentParentCategory: Iintity;
  centerCategory: Iintity;
  incidentReasons: IincidentReason[];
  incidentOrgs: IincidentOrg[];
  incidentRiskImpact: Iintity;
  incidentsChallengesReqs: Challenge[];
  isInternal: boolean;
  notifyReporter: boolean;
  other: string;
  plot: string;
  priority: Iintity;
  kpi: Iintity;
  reportedByEmail: string;
  reportedByMobile: string;
  reportedByName: string;
  reportingVia: Iintity;
  sector: number;
  specialized: Iintity;
  specializedEmail: string;
  specializedMobile: string;
  status: Iintity;
  street: string;
  subject: string;
  zone: string;
  generalPosition: string;
  featureName: string;
  interimIncident: number;
  locationUrl: string;
}

interface Iintity {
  id: number;
}

interface IincidentGroup {
  cell: boolean;
  group: Iintity;
  id: number;
  incident: Iintity;
}

interface IincidentReason {
  id: number;
  incident: Iintity;
  reason: Iintity;
}

interface IincidentOrg {
  id: number;
  incident: Iintity;
  isMain: boolean;
  orgStructure: IorgStructure;
}

interface IorgStructure {
  id: number;
  nameAr: string;
  nameEn: string;
}

interface IincidentImpact {
  enviromentalImpact: Iintity;
  id: number;
  incident: Iintity;
}
