import { Observable } from "rxjs";

export abstract class GenerateReportRepository {
  abstract getReportPdf(fechaInicio: string, fechaFin: string): Observable<any>;
}
