import { isEmpty } from 'lodash';
import { Incident } from '../specific-org-forms/incident.modal';
import { Challenge } from '../challenges/model/Challenge';

export class CreateIncident {
  city: { id: number };
  createdBy: { id: number };
  createdOn: string;
  closedDate: string;
  locationReachedDate: string;
  containedDate: string;
  description: string;
  emergencyLevel: { id: number };
  id: number;
  incidentCategory: { id: number };
  incidentDate: string;
  incidentEnvironmentImpact: {
    enviromentalImpact: {
      id: number;
    };
    id: number;
    incident: {
      id: number;
    };
  }[];
  incidentGroups: {
    cell: boolean;
    group: {
      id: number;
    };
    id: number;
    incident: {
      id: number;
    };
  }[];
  incidentHospitals: [];
  incidentParentCategory: { id: number };
  centerCategory: { id: number };
  incidentReasons: {
    id: number;
    incident: {
      id: number;
    };
    reason: {
      id: number;
    };
  }[];

  incidentOrgs: {
    id: number;
    incident: {
      id: number;
    };
    isMain: boolean;
  }[];

  incidentTags: {
    id: number;
  }[];
  incidentRiskImpact: { id: number };
  incidentsChallengesReqs: Challenge[];
  isInternal: boolean;
  notifyReporter: boolean;
  other: string;
  kpi: { id: number };
  plot: string;
  priority: { id: number };
  reportedByEmail: string;
  reportedByMobile: string;
  reportedByName: string;
  reportingVia: {
    id: number;
  };
  sector: number;
  specialized: { id: number };
  specializedEmail: string;
  specializedMobile: string;
  status: { id: number };
  subject: string;
  zone: string;
  generalPosition: string;
  featureName: string;
  processingTime: number;
  interimIncident: number;
  locationUrl: string;
  getLocationFromReporter: boolean;

  constructor(data: Incident, incidentId: number = 0) {
    this.city = { id: data.city };
    this.createdBy = { id: this.getUserId() };
    this.createdOn = data.createdOn || new Date().toISOString();
    this.description = data.description;
    this.emergencyLevel = data.emergencyLevel
      ? { id: data.emergencyLevel }
      : null;
    this.id = incidentId;
    this.incidentCategory = data.incidentCategory
      ? { id: data.incidentCategory }
      : null;
    this.incidentDate = data.incidentDate;
    this.closedDate = data?.closedDate;
    this.locationReachedDate = data?.locationReachedDate || null;
    this.containedDate = data?.containedDate || null;
    this.incidentEnvironmentImpact = this.prepareEnvEmpact(
      data.incidentEnvironmentImpact
    );
    this.incidentTags = this.prepareTags(data.incidentTags, incidentId);
    this.incidentsChallengesReqs = data.incidentsChallengesReqs || [];
    this.incidentGroups = this.prepareIncidentsGroups(
      data.incidentGroups,
      data?.incidentCells
    );
    this.incidentHospitals = data.incidentHospitals || [];
    this.incidentOrgs = this.prepareOrgsObj(data.secondaryOrg, data.primaryOrg);
    this.incidentParentCategory = { id: data.incidentParentCategory };
    this.centerCategory = data.centerCategory
      ? { id: data.centerCategory }
      : null;
    this.incidentReasons = [];
    this.incidentRiskImpact = data.incidentRiskImpact
      ? { id: data.incidentRiskImpact }
      : null;
    this.isInternal = true;
    this.notifyReporter = data.notifyReporter || false;
    this.other = data.other;
    this.priority = data.priority ? { id: data.priority } : null;
    this.kpi = data.kpi ? { id: data.kpi } : null;
    this.reportedByEmail = data.reportedByEmail;
    this.reportedByMobile = data?.reportedByMobile?.slice(
      1,
      data?.reportedByMobile?.length
    );
    this.reportedByName = data.reportedByName;
    this.reportingVia = data.reportingVia ? { id: data.reportingVia } : null;
    this.specialized = data.specialized ? { id: data.specialized } : null;
    this.specializedEmail = data.specializedEmail ? data.specializedEmail : '';
    this.specializedMobile = data?.specializedMobile
      ? data?.specializedMobile
      : '';
    this.status = data?.status ? { id: data?.status } : { id: 1 };
    this.subject = data.subject || '';
    this.generalPosition = data?.generalPosition;
    this.featureName = data?.featureName;
    this.zone = data?.zone;
    this.sector = data?.sector;
    this.interimIncident = data?.interimIncident;
    this.locationUrl = data?.locationUrl;
    this.getLocationFromReporter = data?.getLocationFromReporter;
  }

  prepareEnvEmpact(impact: any[]) {
    const impacts = [];
    if (isEmpty(impact)) {
      return [];
    }

    impact.forEach((imp) => {
      const imptc = {
        enviromentalImpact: {
          id: imp,
        },
        id: 0,
        incident: {
          id: 0,
        },
      };
      impacts.push(imptc);
    });
  }
  prepareTags(tags: any[], incidentId) {
    const tagRes = [];
    if (isEmpty(tags)) {
      return [];
    }

    tags.forEach((t) => {
      const tag = {
        id: 0,
        incident: {
          id: incidentId,
        },

        tag: { id: t },
      };
      tagRes.push(tag);
    });
    return tagRes;
  }

  prepareOrgsObj(secondaryorg: any[], primaryorg): any[] {
    const groups = [];

    if (!isEmpty(secondaryorg)) {
      secondaryorg.forEach((org) => {
        const secOrg = {
          id: 0,
          incident: {
            id: 0,
          },
          isMain: false,
          orgStructure: {
            id: org.id,
          },
        };
        groups.push(secOrg);
      });
    }

    if (primaryorg) {
      groups.unshift({
        id: 0,
        incident: {
          id: 0,
        },
        isMain: true,
        orgStructure: {
          id: primaryorg.id,
        },
      });
    }

    return groups;
  }

  prepareIncidentsGroups(incidentGroups: any[], cells: any[]): any[] {
    const groups = [];

    if (!isEmpty(incidentGroups)) {
      incidentGroups.forEach((group) => {
        const grp = {
          cell: false,
          group: {
            id: group,
          },
        };
        groups.push(grp);
      });
    }

    if (!isEmpty(cells)) {
      cells.forEach((id) => {
        const grp = {
          cell: true,
          group: {
            id,
          },
        };
        groups.push(grp);
      });
    }

    return groups;
  }

  getUserId() {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    return commonData.currentUserDetails.id;
  }
}
