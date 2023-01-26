import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { } // Observable string sources
  private updateIncidentData = new Subject<string>();
  private updateOPReportsData = new Subject<string>();
  private updateTasksData = new Subject<string>();

  // Observable string streams
  newUpdates = this.updateIncidentData.asObservable();
  newReportsUpdates = this.updateOPReportsData.asObservable();
  newTaskWorklogsUpdates = this.updateTasksData.asObservable();

  // Service message commands
  announceDataUpdates(mission: string) {
    this.updateIncidentData.next(mission);
  }  
  announceReportsUpdates(mission: string) {
    this.updateOPReportsData.next(mission);
  }
   announceTaskWorklogUpdates(mission: string) {
    this.updateTasksData.next(mission);
  }

}
