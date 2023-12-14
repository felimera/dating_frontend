import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { CustomerService } from 'src/app/infrastructure/services/customer.service';
import { GenerateReportService } from 'src/app/infrastructure/services/report/generate-report.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  datePipe = new DatePipe('en-US');

  nameCustomerValue: string = '';
  messageValue: string = '';
  isEnablePrintButtonValue: boolean = true;
  isReturnData: boolean = true;

  fillNameCustomerDTO: CustomerDTO | any;

  customers: CustomerDTO[] = [];

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private customerService: CustomerService,
    private generateReportService: GenerateReportService
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {

    this.dateRange.valueChanges.subscribe((change) => {
      if (change.start !== null && change.end !== null) {
        this.isEnablePrintButtonValue = false;
      }
    });

  }

  onSearchCustomerParameter(): void {
    this.customerService
      .getConsultCustomerInAppointmentForVariousParameters(this.nameCustomerValue)
      .subscribe({
        next: (res: Customer[]) => {
          if (res) {
            this.customers = res;
            this.isReturnData = true;
          }
        },
        error: res => {
          this.isReturnData = false;
          this.messageValue = res.error.message;
          console.log(res.error.message);
        }
      })
  }

  getFormatDate(date: Date | null): string | undefined {
    if (date) {
      const fechaFormateada = this.datePipe.transform(date, 'yyyy-MM-dd');
      console.log(fechaFormateada);
      return fechaFormateada!;
    }
    else {
      return undefined;
    }
  }

  onGenerarReport(idCustomer?: number): void {
    this.generateReportService
      .getReportPdf(idCustomer, this.getFormatDate(this.dateRange.get('start')!.value), this.getFormatDate(this.dateRange.get('end')!.value))
      .subscribe((res: any) => {
        if (res) {
          const file = new Blob([res], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }
      });
  }
}
