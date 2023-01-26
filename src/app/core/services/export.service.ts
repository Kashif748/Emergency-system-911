import { EventEmitter, Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import * as XLSX from "xlsx";

import jspdf, { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import autoTable from "jspdf-autotable";

import { tajawal_normal_font } from "src/app/modules/i18n/Tajawal-normal";
// import { arial_font } from "src/app/modules/i18n/arial-normal";
@Injectable({
  providedIn: "root",
})
export class ExportService {
  constructor(@Inject(DOCUMENT) private document: Document) {}


  private exportDailyReportEvent = new EventEmitter<void>();
  public dailyReportExporting$ = this.exportDailyReportEvent.asObservable();
  public exportTableToPdf(
    tableHtmlId: string,
    fileName: string,
    orientation: "p" | "portrait" | "l" | "landscape" = "l",
    unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc" = "pt",
    format: string | number[] = "A3",
    theme: "plain" | "striped" | "grid" = "grid"
  ) {
    const doc = new jsPDF(orientation, unit, format, true);
    doc.addFileToVFS("tajawal.ttf", tajawal_normal_font);
    doc.addFont("tajawal.ttf", "tajawal", "normal");
    autoTable(doc, {
      html: `#${tableHtmlId}`,
      styles: { font: "tajawal", fontStyle: "normal" },
      theme,
    });
    doc.save(fileName);
  }

  public exportTableToXlsx(
    tableHtmlId: string,
    sheetName: string,
    fileName: string
  ) {
    const table = this.document.getElementById(`${tableHtmlId}`);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, fileName);
  }

  htmltoPDF(
    elementIds: string | string[],
    fileName: string,
    orientation: "p" | "portrait" | "l" | "landscape" = "l",
    unit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc" = "pt",
    format: string | number[] = "A3",
    callback: (doc: jsPDF) => void = (doc) => {
      doc.save(fileName);
    }
  ) {
    const doc = new jsPDF(orientation, unit, format, true);
    // doc.addFileToVFS("arial.ttf", arial_font);
    // doc.addFont("arial.ttf", "arial", "normal");
    // doc.setFont("Arial");
    doc.addFileToVFS("tajawal.ttf", tajawal_normal_font.trim());
    doc.addFont("tajawal.ttf", "tajawal", "normal");
    // doc.setCharSpace(1);
    // doc.setFontSize(20);
    // doc.setLanguage("ar");


    const ele = this.document.getElementById(`${elementIds}`);
    doc.html(ele, {
      callback,
      html2canvas: {
        scrollX: 0,
        scrollY: 0,
        // svgRendering: true,
        // width: width,
        // letterRendering: true,
        useCORS: true,
        logging: true,
        async: true,
        taintTest: true,
        allowTaint: true,
        imageTimeout: 100000,
        // backgroundColor: "#f3f6f9",
        // foreignObjectRendering: true,
        // svgRendering: true,
        // async: true,
        // allowTaint: true,
        ignoreElements: (element) => {
          return element?.classList?.contains("ignore-printing");
        },
        // removeContainer: true,
      },

      margin: 15,
    });
  }
  public exportDailyReport() {
    this.exportDailyReportEvent.emit();
  }
}
