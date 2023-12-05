import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateReportService {

  private apiUrl = '/api/report';

  constructor(private http: HttpClient) { }

  getReportPdf(fechaInicio: string, fechaFin: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${this.apiUrl}/pdf?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, httpOptions);
  }
}
