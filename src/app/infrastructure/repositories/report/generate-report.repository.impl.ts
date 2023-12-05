import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenerateReportRepository } from "src/app/core/repositories/report/generate-report.repository";
import { GenerateReportService } from "../../services/report/generate-report.service";

@Injectable({
  providedIn: 'root',
})

export class GenerateReportRepositoryImpl implements GenerateReportRepository {

  constructor(private generateReportService: GenerateReportService) { }

  getReportPdf(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.generateReportService.getReportPdf(fechaInicio, fechaFin);
  }
}
