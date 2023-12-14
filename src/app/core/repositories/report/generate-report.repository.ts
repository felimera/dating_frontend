import { Observable } from "rxjs";

export abstract class GenerateReportRepository {
  abstract getReportPdf(idCustomer?: number, fechaInicio?: string, fechaFin?: string): Observable<any>;
}
