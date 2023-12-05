import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateReportService {

  private apiUrl = '/api/report';

  constructor(private http: HttpClient) { }

  getReportPdf(idCustomer?: number, fechaInicio?: string, fechaFin?: string): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };

    let url = `${this.apiUrl}/pdf?`
    if (idCustomer) {
      url = url + `idCustomer=${idCustomer}`;
    } else if ((fechaInicio !== null || fechaInicio == undefined) && (fechaFin !== null || fechaFin == undefined)) {
      url = url + `fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }
    return this.http.get<any>(url, httpOptions);
  }
}
