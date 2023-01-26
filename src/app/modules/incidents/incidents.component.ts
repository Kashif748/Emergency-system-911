import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent {
  // Variables.
  incidents: [] = [];

  constructor(private router: Router) {
  }

  async viewIncident(id) {
    await this.router.navigate(['incidents/view', id]);
  }

  async updateIncident(id) {
    await this.router.navigate(['incidents/update', id]);
  }

  async reportIncident() {
    await this.router.navigate(['incidents/report']);
  }

  async createTask(title, id) {
    await this.router.navigate(['incidents/createTask', {title, id}]);
  }

}
