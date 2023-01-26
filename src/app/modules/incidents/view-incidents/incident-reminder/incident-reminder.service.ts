import { Injectable } from '@angular/core';
import {DataSourceService} from "../../../services/data-source/data-source.service";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {IpaginationResponce} from "../../../news/models/paginationResponce";
import {map} from "rxjs/operators";
import {Reminder} from "./model/Incident-Reminder";

const END_POINT: string = "incident-reminder";
@Injectable({
  providedIn: 'root'
})
export class IncidentReminderService extends DataSourceService {

  private incidentId: any;

  remindersChanged$: Observable<Reminder[]>;
  private reminders$: BehaviorSubject<Reminder[]>;
  private reminders: Reminder[];

  totalElement: number = 0;
  totalElementChanged$: Observable<number>;
  private totalElement$: BehaviorSubject<number>;



  constructor() {
    super(END_POINT);

    this.reminders = null;
    this.reminders$ = new BehaviorSubject(this.reminders);
    this.remindersChanged$ = this.reminders$.asObservable();
    this.totalElement$ = new BehaviorSubject(this.totalElement);
    this.totalElementChanged$ = this.totalElement$.asObservable();
  }

  setIncidentId(id: number) {
    this.incidentId = id;
    this.changeParamInBaseUrl("incidentId", this.incidentId.toString());
  }

  getContent(pageNumber: number = 0, pageSize: number = 10, sort?) {
    let sorting = sort ? sort.active + ',' + sort.direction : 'id,asc';
    let httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString())
      .append("incidentId", this.incidentId)
      .append("sort", sorting);

    this.getAll<IpaginationResponce<Reminder[]>>(null, httpParams)
      .pipe(
        map((items) => {
          if (items.content) {
            items.content = items.content.map((item) => new Reminder(item));
            return items;
          } else {
            return items;
          }
        })
      )
      .subscribe((data) => {
        this.reminders = data.content;
        this.totalElement = data.totalElements;
        this.totalElement$.next(this.totalElement);

        this.notify();
      });
  }

  addReminder(reminder: Reminder) {
    return new Promise((resolve, reject) => {
      this.post<Reminder>(reminder)
        .pipe(map((item) => new Reminder(item)))
        .subscribe(
          (data) => {
            this.reminders.unshift(data);
            this.getContent();
            this.notify();
            this.totalElement++;
            this.totalElement$.next(this.totalElement);
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  editReminder(reminder: Reminder) {
    return new Promise((resolve, reject) => {
      this.put<Reminder>(reminder)
        .pipe(map((item) => new Reminder(item)))
        .subscribe(
          (data) => {
            this.reminders = this.reminders.map((item) =>
              item.id === reminder.id ? data : item
            );
            this.notify();

            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  notify() {
    console.log(this.reminders);
    this.reminders$.next(this.reminders);
  }

  deleteRemi(reminder: Reminder) {
    const deletReminder: any = {
      id: reminder.id,
      isActive: reminder.isActive
    }
    return new Promise((resolve, reject) => {
      this.deleteReminder(deletReminder).subscribe(
        (data) => {
          this.reminders = this.reminders.filter((item) => item.id !== reminder.id);
          this.notify();
          this.totalElement--;
          this.totalElement$.next(this.totalElement);
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
