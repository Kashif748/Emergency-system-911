import { CollectionViewer, DataSource } from "@angular/cdk/collections";

import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";

export interface Log {
  id?: number;
  notes: string;
  createdBy?: any;
  createdOn?: any;
}

export class LogsDataSource extends DataSource<Log | undefined> {
  private cachedLogs = Array.from<Log>({ length: 0 });
  private dataStream = new BehaviorSubject<(Log | undefined)[]>(
    this.cachedLogs
  );
  private subscription = new Subscription();

  constructor(
    private incidentService: IncidentsService,
    private conf: { type: "task" | "incident"; id: number }
  ) {
    super();
    this._fetchLogPage();
  }

  private pageSize = 5;
  private lastPage = 0;
  private pageIndex = 0;

  private _fetchLogPage(): void {
    if (this.conf.type == "task") {
      this.incidentService
        .getTaskWorkLogsDs(
          this.conf.id,
          "",
          "desc",
          this.pageIndex,
          this.pageSize
        )
        .subscribe((res) => {
          this.cachedLogs = this.cachedLogs.concat(res?.result?.content);
          this.dataStream.next(this.cachedLogs);
        });
    } else {
      this.incidentService
        .getWorkLogsDs(this.conf.id, "", "desc", this.pageIndex, this.pageSize)
        .subscribe((res) => {
          this.cachedLogs = this.cachedLogs.concat(res?.result?.content);
          this.dataStream.next(this.cachedLogs);
        });
    }
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(Log | undefined)[] | ReadonlyArray<Log | undefined>> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        // Update the data
        const currentPage = this._getPageForIndex(range.end);

        if (currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this._fetchLogPage();
          this.pageIndex += 1;
        }
      })
    );
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }
}
