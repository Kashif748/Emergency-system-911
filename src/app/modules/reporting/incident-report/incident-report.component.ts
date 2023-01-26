import {Location} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ILangFacade} from '@core/facades/lang.facade';
import {map} from 'rxjs/operators';
import {ExportService} from '@core/services/export.service';
import {PdfTemplateComponent} from './pdf-template/pdf-template.component';

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss'],
})
export class IncidentReportComponent {
  // Ui
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  @ViewChild(PdfTemplateComponent) template: PdfTemplateComponent;

  // Variables
  incidentId: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private langFacade: ILangFacade,
    private exportService: ExportService,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.incidentId = this.route.snapshot.params.id;
  }


  public back() {
    this.location.back();
  }

  async exportPDF() {
    this.isLoading = true;
    this.cd.detectChanges();
    this.exportPageAsPdf();
  }

  async exportPageAsPdf() {
    const img = document.createElement('img');
    const screenshot = await this.template.map.mapView.takeScreenshot();
    img.src = screenshot.dataUrl;
    img.id = 'map-img';
    const src = document.getElementById('map');
    src.appendChild(img);

    this.exportService.htmltoPDF(
      'incident-report',
      'incident-report.pdf',
      'l',
      'px',
      [1600, 1000],
      (doc) => {
        doc.save('incident-report.pdf');
        src.removeChild(img);
      }
    );
    this.isLoading = false;
    this.cd.detectChanges();
  }
}
