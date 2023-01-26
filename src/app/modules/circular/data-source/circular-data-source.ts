import { CircularsService } from "src/app/_metronic/core/services/circulars.service";
import { catchError, finalize } from "rxjs/operators";
import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
export class CircularsDataSource implements DataSource<any> {
  private circularsSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private circularsService: CircularsService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.circularsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.circularsSubject.complete();
    this.loadingSubject.complete();
  }

  loadCirculars(pageIndex, pageSize, direction) {
    // this.loadingSubject.next(true);
    this.circularsSubject = this.circularsService.onCircularsChange;
  }

  updateItem(newItem) {
    let data = this.circularsSubject.getValue().map((item) => {
      if (item["id"] == newItem["id"]) {
        return newItem;
      } else return item;
    });
    this.circularsSubject.next(data);
  }

  getCircularsSubjectValue() {
    return this.circularsSubject.value;
  }
}
