import { Injectable } from '@angular/core';
import { OrgModel } from '@core/models/org.model';
import { TreeModel } from '@core/models/tree.model';
import { TreeNode } from 'primeng/api';
import {
  BcOrgHierarchy,
  OrgStructure,
  OrgStructureProjection,
} from 'src/app/api/models';
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';

@Injectable()
export class TreeHelper {
  constructor() {}
  composeOrgTree(param: {
    orgs: (OrgStructure & OrgStructureProjection)[];
    rootId?: number;
    mapper?: (o: OrgModel) => TreeModel;
  }): (OrgModel | TreeModel)[] {
    let root: OrgModel[] = [];
    const otherLeaf: (OrgStructure & OrgStructureProjection)[] = [];
    param.orgs.filter((o) => {
      if (param.rootId) {
        if (o.id != param.rootId) {
          otherLeaf.push(o);
        } else {
          root.push(new OrgModel(o));
        }
      } else {
        if ((o.parent ?? o.parentOrg) !== null) {
          otherLeaf.push(o);
        } else {
          root.push(new OrgModel(o));
        }
      }
    });
    const tree = this.linkOrgCurrentToNext(otherLeaf, root, param.mapper);
    return tree;
  }

  private linkOrgCurrentToNext(
    source: (OrgStructure & OrgStructureProjection)[],
    root: OrgModel[],
    mapper?: (o: OrgModel) => TreeModel
  ): (OrgModel | TreeModel)[] {
    let currentLevel = root;
    let mappedRoot = mapper ? root.map(mapper) : new Array<TreeModel>();
    let mappedCurrentLevel = mappedRoot;
    while (!(source.length <= 0 || currentLevel.length <= 0)) {
      let next = [];
      let mappedNext = [];

      currentLevel.forEach((p, i) => {
        const mp = mappedCurrentLevel[i];
        p.children = source
          .filter((n) => n.parent?.id === p.id || n.parentOrg?.id === p.id)
          .map((o) => new OrgModel(o));

        p.children?.forEach((c) => {
          c.parent = p;
        });
        next = [...next, ...p.children];

        if (mapper) {
          mp.children = p.children.map(mapper);
          mp.children?.forEach((c) => {
            c.parent = mp;
          });
          mappedNext = [...mappedNext, ...mp.children];
        }
      });
      source = source.filter((s) => !next.includes(s));
      currentLevel = next;
      mappedCurrentLevel = mappedNext;
    }
    if (mapper) {
      return mappedRoot;
    }
    return root;
  }

  orgHir2TreeNode(orgHirs: BcOrgHierarchyProjection[]): TreeNode[] {
    return orgHirs.map((item: BcOrgHierarchyProjection) => {
      let node: TreeNode;
      node = {
        key: item.id.toString(),
        data: item,
        label: item.nameAr,
        leaf: false,
        draggable: true,
        droppable: true,
        children: [],
      };
      return node;
    });
  }

  findOrgHirById(tree: TreeNode[], targetId): TreeNode {
    let resNode;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.key == targetId) {
        resNode = node;
      }
      if (!resNode && node?.children?.length) {
        resNode = this.findOrgHirById(node?.children, targetId);
      }
    }
    return resNode;
  }
}
