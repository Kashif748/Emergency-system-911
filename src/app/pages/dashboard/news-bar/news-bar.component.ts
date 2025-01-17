import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NewsBarAction } from './states/news-bar.action';
import { NewsState } from '@core/states/news/news.state';
import { NewsProjection } from 'src/app/api/models';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss'],
})
export class NewsBarComponent implements OnInit {
  page$: Observable<NewsProjection[]>;

  openView = false;
  selectedItem: NewsProjection;
  view(item: NewsProjection) {
    this.selectedItem = item;
    this.openView = true;
  }
  constructor(private store: Store) {
    this.page$ = this.store.select(NewsState.page).pipe(filter((p) => !!p));
  }

  ngOnInit() {
    this.store.dispatch(
      new NewsBarAction.LoadNews({
        pageRequest: {
          first: 0,
          rows: 10000,
        },
      })
    );
  }
}
