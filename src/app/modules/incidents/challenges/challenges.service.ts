import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { IpaginationResponce } from "../../news/models/paginationResponce";
import { DataSourceService } from "../../services/data-source/data-source.service";
import { Challenge, Ichallenge } from "./model/Challenge";

let END_POINT: string = "incidents/{incidentId}/challenge-requests";
@Injectable({
  providedIn: "root",
})
export class ChallengesService extends DataSourceService {
  private incidentId: number;
  chalengesChanged$: Observable<Challenge[]>;
  private challenges$: BehaviorSubject<Challenge[]>;

  private challenges: Challenge[];

  totalElement: number = 0;
  totalElementChanged$: Observable<number>;
  private totalElement$: BehaviorSubject<number>;
  constructor() {
    super(END_POINT);

    this.challenges = null;
    this.challenges$ = new BehaviorSubject(this.challenges);
    this.chalengesChanged$ = this.challenges$.asObservable();

    this.totalElement$ = new BehaviorSubject(this.totalElement);
    this.totalElementChanged$ = this.totalElement$.asObservable();
  }

  setIncidentId(id: number) {
    this.incidentId = id;
    this.changeParamInBaseUrl("incidentId", this.incidentId.toString());
  }

  getContent(pageNumber: number = 0, pageSize: number = 10) {
    let httpParams = new HttpParams()
      .append("page", pageNumber.toString())
      .append("size", pageSize.toString());

    this.getAll<IpaginationResponce<Challenge[]>>(null, httpParams)
      .pipe(
        map((items) => {
          items.content = items.content.map((item) => new Challenge(item));
          return items;
        })
      )
      .subscribe((data) => {
        this.challenges = data.content;
        this.totalElement = data.totalElements;
        this.totalElement$.next(this.totalElement);

        this.notify();
      });

    // this.challenges = [
    //   {
    //     id:1,
    //     challenge:'test1',
    //     requmendations:'test'
    //   },
    //   {
    //     id:2,
    //     challenge:'test2',
    //     requmendations:'test'
    //   },
    //   {
    //     id:3,
    //     challenge:'test3',
    //     requmendations:'test'
    //   }
    // ];

    // this.challenges$.next(this.challenges);
  }

  addChallenge(challenge: Challenge) {
    return new Promise((resolve, reject) => {
      this.post<Challenge>(challenge)
        .pipe(map((item) => new Challenge(item)))
        .subscribe(
          (data) => {
            this.challenges.unshift(data);
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

  editChallenge(challenge: Challenge) {
    return new Promise((resolve, reject) => {
      this.put<Challenge>(challenge)
        .pipe(map((item) => new Challenge(item)))
        .subscribe(
          (data) => {
            this.challenges = this.challenges.map((item) =>
              item.id === challenge.id ? data : item
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

  deleteChallenge(id: number) {
    return new Promise((resolve, reject) => {
      this.delete(id).subscribe(
        (data) => {
          this.challenges = this.challenges.filter((item) => item.id !== id);
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

  notify() {
    this.challenges$.next(this.challenges);
  }
}
