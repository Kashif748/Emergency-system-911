import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-org-hierarchy',
  templateUrl: './org-hierarchy.component.html',
  styleUrls: ['./org-hierarchy.component.scss']
})
export class OrgHierarchyComponent implements OnInit {
  data: TreeNode[];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    /* this.data = [
       {
         key: '0',
         label: 'Introduction',
         children: [
           {key: '0-0', label: 'What is Angular', data:'https://angular.io', type: 'url'},
           {key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url'},
           {key: '0-2', label: 'Learn and Explore', data:'https://angular.io/guide/architecture', type: 'url'},
           {key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url'}
         ]
       },
       {
         key: '1',
         label: 'Components In-Depth',
         children: [
           {key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url'},
           {key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url'},
           {key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url'},
           {key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url'}
         ]
       }
     ];*/

    this.getFiles().then(files => {
      this.data = files
      this.test(this.data);
    });

  }

  test(tree: TreeNode[]) {
    tree.forEach((element, index) => {
      if (element.children) {
        if (element.children.length !== 0) {
          this.test(element.children);
        }
        let label;
        switch (element.data){
          case 'department': {
            label = "Add Department";
            break;
          }
          case 'section': {
            label = "Add Section";
            break;
          }
        }
        element.children.unshift({
            data: label,
          expandedIcon: 'pi pi-plus',
          collapsedIcon: 'pi pi-plus',
          children: []
          }
        );
        /*element.children.push({
            data: label
          }
        );*/
      }
    });
  }

  getFiles() {
    return this.http.get<any>('assets/data.json')
      .toPromise().then(res => res.data as TreeNode[]);
  }
}
