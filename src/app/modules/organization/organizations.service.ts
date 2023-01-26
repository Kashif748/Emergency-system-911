import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MenuItem } from 'src/app/pages/_layout/components/header/header-menu/menu-item.model';
import { IStorageService } from 'src/app/core/services/storage.service';

import { DataSourceService } from '../services/data-source/data-source.service';

import { Iorganization } from './models/organization.interface';
import { Organization } from './models/organization.model';

const endPoint: string = 'organizations';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService
  extends DataSourceService
  implements Resolve<any>
{
  private organizations: Organization[];
  public treeRootChanged$: BehaviorSubject<Organization[]>;
  public organizationsChanged$: Observable<Organization[]>;
  private organizatiionsSubject: BehaviorSubject<Organization[]> =
    new BehaviorSubject([]);

  navigations: MenuItem[] = [];
  onNavigationsChange: BehaviorSubject<any>;
  currentOrgId = null;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getOrgs(this.currentOrgId)]).then((content) => {
        resolve(content);
      }, reject);
    });
  }

  constructor(private storageService: IStorageService) {
    super(endPoint);
    this.organizationsChanged$ = this.organizatiionsSubject.asObservable();
    this.onNavigationsChange = new BehaviorSubject([]);
    this.treeRootChanged$ = new BehaviorSubject(null);

    this.organizationsChanged$.subscribe((data: any[]) => {
      const tree = this.composeTree(data);
      this.treeRootChanged$.next(tree);
    });
  }

  getOrgs(id): Promise<Organization[]> {
    this.currentOrgId = id;

    const orgUrl = this.currentOrgId
      ? `organizations/hierarchy/level/${id}`
      : 'ext/organizations';

    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.getSpeicalUrlAddress(orgUrl)
        .pipe(map(this.mappingOrgsClass))
        .subscribe(
          (data) => {
            this.organizations = data;
            this.organizatiionsSubject.next(this.organizations);
            resolve(data);
          },
          (err) => {
            reject(false);
          }
        );
    });
  }

  getOrg(id: number): Promise<Organization> {
    return new Promise((resolve, reject) => {
      this.get(id)
        .pipe(map((item: any) => new Organization(item)))
        .subscribe(
          (org) => {
            resolve(org);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  createOrg(data: any) {
    return this.post<Iorganization>(data).pipe(
      map((org) => {
        return new Organization(org);
      }),
      tap((org) => {
        this.organizations.push(org);
        this.organizatiionsSubject.next(this.organizations);
      })
    );
  }

  updateOrg(id: number, data: any) {
    return this.put<Iorganization>(data).pipe(
      map((org) => {
        return new Organization(org);
      }),
      tap((org) => {
        const index = this.getOrgIndex(id);
        this.organizations.splice(index, 1, org);
        this.organizatiionsSubject.next(this.organizations);
      })
    );
  }

  uploadLogo(file: File, orgId: number, tagId: number) {
    return new Promise((resolve, reject) => {
      this.upload(file, orgId, tagId).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => reject(err)
      );
    });
  }

  deleteOrg(id: number) {
    return new Promise((resolve, reject) => {
      this.delete(id).subscribe(
        (data) => {
          const commonData = this.storageService.getItem('commonData');
          this.currentOrgId = commonData?.currentOrgDetails?.id;
          this.getOrgs(this.currentOrgId);
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  organizationFiles<T>(organizationId: number) {
    const params = new HttpParams()
      .append('entityId', organizationId.toString())
      .append('entityTagId', '22');

    return this.getFiles<any>('dms/tag', params);
  }

  checkIfExist(id: number) {
    if (this.organizations && this.organizations.length != 0) {
      return this.getOrgIndex(id);
    }
    return -1;
  }

  mappingOrgsClass(orgs: Iorganization[]) {
    return orgs.map((org) => new Organization(org));
  }

  getOrgIndex(id: number): number {
    return this.organizations.findIndex((item) => item.id === id);
  }

  getAllParentModules(parentId) {
    this.navigations = [];

    this.getNavigationsMenu(parentId).subscribe((data: any[]) => {
      this.navigations = data.map((level) => {
        return new MenuItem(level);
      });
      this.onNavigationsChange.next(this.navigations);
    });
  }

  getAllNodeModules(nodeId) {
    return this.getNavigationsMenu(nodeId);
  }

  createModules(module) {
    return this.createOrgModule(module);
  }

  updateModules(module) {
    return this.updateOrgModule(module);
  }

  composeTree(orgs): Organization[] {
    let root = [];
    const otherLeaf = [];
    orgs.filter((o) => {
      if (this.currentOrgId) {
        if (o.id != this.currentOrgId) {
          otherLeaf.push(o);
        } else {
          root.push(o);
        }
      } else {
        if (o.parent !== null) {
          otherLeaf.push(o);
        } else {
          root.push(o);
        }
      }
    });
    const tree = this.linkCurrentToNext(otherLeaf, root);

    return tree;
  }

  private linkCurrentToNext(
    source: Organization[],
    root: Organization[]
  ): Organization[] {
    let currentLevel = root;
    while (!(source.length <= 0 || currentLevel.length <= 0)) {
      let next = [];

      currentLevel.forEach((p) => {
        p.children = source.filter(
          (n) => (n.parent as any) == p.id || (n.parentOrg as any) == p.id
        );
        p.children?.forEach((c) => {
          c.parentNode = p;
        });
        next = [...next, ...p.children];
        p.children = p.children.length > 0 ? p.children : null;
      });
      source = source.filter((s) => !next.includes(s));
      currentLevel = next;
    }

    return root;
  }

  // Areas
  getAreas(): Observable<any> {
    return this.getSpeicalUrlAddress('adcda-area').pipe(
      map((data) => data['content'])
    );
  }

  // Classifications
  getClassifications(): Observable<any> {
    return this.getSpeicalUrlAddress('adcda-classification').pipe(
      map((data) => data['content'])
    );
  }

  // Classifications
  getClassifications1() {
    return this.getSpeicalUrlAddress('adcda-classification').pipe((data) => {
      return data['content'];
    });
  }

  // sectors
  getSectors(): Observable<any> {
    return this.getSpeicalUrlAddress('adcda-sector').pipe(
      map((data) => data['content'])
    );
  }
}
