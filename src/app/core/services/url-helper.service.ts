import {
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subscriber } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UrlHelperService {
  cache$: Map<string, Observable<any>>;
  constructor(
    private http: HttpClient,
    private rendererFactory: RendererFactory2,
    private alertService: AlertsService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {},
    });
    this.cache$ = new Map();
  }

  private renderer: Renderer2;
  httpHeaders = new HttpHeaders().set('Content-Type', 'txt');

  get(uuid: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      let objectUrl: string = null;
      uuid = `${environment.apiUrl}/dms/load/${uuid}`;
      this.http
        .get(uuid, {
          headers: this.httpHeaders,
          observe: 'body',
          responseType: 'blob',
        })
        .subscribe((m) => {
          objectUrl = URL.createObjectURL(m);
          subscriber.next(objectUrl);
        });

      // return () => {
      //   debugger;
      //   if (objectUrl) {
      //     URL.revokeObjectURL(objectUrl);
      //     objectUrl = null;
      //   }
      // };
    });
  }

  getImprovised(uuid: string): Observable<any> {
    if (this.cache$.has(uuid)) {
      return this.cache$.get(uuid);
    } else {
      let observable = of(uuid).pipe(
        map((id) => `${environment.apiUrl}/dms/load/${id}`),
        mergeMap((url) =>
          this.http.get(url, {
            headers: this.httpHeaders,
            observe: 'body',
            responseType: 'blob',
          })
        ),
        map((v) => URL.createObjectURL(v)),
        shareReplay(1)
      );
      this.cache$.set(uuid, observable);
      return observable;
    }
  }

  async download(file: { uuid: string; mimeType: string; fileName: string }) {
    this.alertService.openSuccessSnackBarWithMsg(
      this.translate.instant('SHARED.NOTIFICATION.DOWNLOAD')
    );

    const url = `${environment.apiUrl}/dms/load/${file.uuid}`;

    const data = await this.http
      .get(url, {
        headers: this.httpHeaders,
        observe: 'body',
        responseType: 'blob',
      })
      .toPromise();

    const newBlob = new Blob([data], { type: file.mimeType });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    const downloadURL = URL.createObjectURL(newBlob);

    // create and insert temp hyperlink to implement download method in a user-friendly way
    const link = this.renderer.createElement('a');
    const body = this.document.body;

    if (body === null) {
      throw new Error('<body> not found within DOCUMENT.');
    }
    this.renderer.setAttribute(link, 'href', downloadURL);
    this.renderer.setAttribute(link, 'download', file.fileName);
    this.renderer.setAttribute(link, 'target', '_blank');
    this.renderer.setAttribute(link, 'id', 'temp_download_link');

    // trigger click event to download file normally
    link.click();

    // remove temp hyperlink
    this.renderer.appendChild(body, link);
    const tempTag = this.document?.getElementById('temp_download_link');
    this.renderer.removeChild(body, tempTag);
  }

  downloadBlob(newBlob, fileName = 'file') {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    const downloadURL = URL.createObjectURL(newBlob);

    // create and insert temp hyperlink to implement download method in a user-friendly way
    const link = this.renderer.createElement('a');
    const body = this.document.body;

    if (body === null) {
      throw new Error('<body> not found within DOCUMENT.');
    }
    this.renderer.setAttribute(link, 'href', downloadURL);
    this.renderer.setAttribute(link, 'download', fileName);
    this.renderer.setAttribute(link, 'target', '_blank');
    this.renderer.setAttribute(link, 'id', 'temp_download_link');

    // trigger click event to download file normally
    link.click();

    // remove temp hyperlink
    this.renderer.appendChild(body, link);
    const tempTag = this.document?.getElementById('temp_download_link');
    this.renderer.removeChild(body, tempTag);
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
