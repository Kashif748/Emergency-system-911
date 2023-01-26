import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import ViewMode = Cropper.ViewMode;
import { CroppedEvent, PhotoEditorComponent } from './photo-editor.component';
import CropperEvent = Cropper.CropperEvent;

@Injectable({
  providedIn: 'root',
})
export class PhotoEditorService {
  private shPESubscriber!: Subject<any>;
  private shPEComponentRef!: ComponentRef<PhotoEditorComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(
    source: Event | string | File | any,
    options?: Options
  ): Observable<CroppedEvent> {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        PhotoEditorComponent
      );
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.shPESubscriber = new Subject<string>();
    this.shPEComponentRef = componentRef;
    this.shPEComponentRef.instance.closeEvent.subscribe(() => this.close());
    this.shPEComponentRef.instance.errorEvent.subscribe((data) =>
      this.errorHandler(data)
    );
    this.shPEComponentRef.instance.imageCroppedEvent.subscribe((data) =>
      this.export(data)
    );
    if (options) {
      Object.keys(options).map((value) => {
        // @ts-ignore
        this.shPEComponentRef.instance[value] = options[value];
      });
    }
    this.shPEComponentRef.instance.source = source;
    return this.shPESubscriber.asObservable();
  }

  private errorHandler(data: any) {
    this.shPESubscriber.error(data);
    this.close();
  }

  private close() {
    this.shPESubscriber.next(undefined);
    this.shPESubscriber.complete();
    this.shPEComponentRef.destroy();
  }

  private export(data: any) {
    this.shPESubscriber.next(data);
    this.close();
  }
}

export interface Options {
  aspectRatio?: number | any;
  modalTitle?: string;
  hideModalHeader?: boolean;
  autoCropArea?: number;
  autoCrop?: boolean;
  mask?: boolean;
  guides?: boolean;
  centerIndicator?: boolean;
  viewMode?: ViewMode;
  modalMaxWidth?: string;
  scalable?: boolean;
  zoomable?: boolean;
  cropBoxMovable?: boolean;
  cropBoxResizable?: boolean;
  roundCropper?: boolean;
  resizeToWidth?: number | any;
  resizeToHeight?: number | any;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
  format?: string | any;
  imageQuality?: number;
  applyBtnText?: string;
  closeBtnText?: string;
}
