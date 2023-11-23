import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentDTO } from 'src/app/infrastructure/dto/appointment.dto';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentService } from 'src/app/infrastructure/services/appointment.service';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  appointmentForm: FormGroup<any> | any;
  appointment: AppointmentDTO | any;
  customer: CustomerDTO | any;
  idAppointment: number | undefined;
  priceAppointment: string | undefined;

  selected?: Date | null;
  pipe = new DatePipe('en-US');

  constructor(
    public dialogRef: MatDialogRef<AppointmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private appointmentService: AppointmentService,
    private toasterService: ToasterService,
    private cookieService: CookieService
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {
    this.customer = JSON.parse(this.cookieService.get('usuario'));

    this.idAppointment = this.data.id;
    this.priceAppointment = this.data.price;

    this.appointmentForm = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      precioTotal: new FormControl('', [Validators.required]),
      idCustomer: new FormControl('', [Validators.required])
    });

  }

  clearPriceFormat(valor: string | undefined): number {
    if (valor)
      return Number(valor.replace('$', '').trim());
    return 0;
  }

  onEditAppointment(): void {

    const fechaFormateada = this.pipe.transform(this.selected, 'dd/MM/yyyy');
    this.appointmentForm.get('fecha')!.setValue(fechaFormateada);
    this.appointmentForm.get('precioTotal')!.setValue(this.clearPriceFormat(this.priceAppointment));
    this.appointmentForm.get('idCustomer')!.setValue(this.customer.id);

    this.appointmentService.putAppointment(this.idAppointment!, this.appointmentForm.value)
      .subscribe({
        next: (res: Appointment) => {
          if (res) {
            this.toasterService.success('Registro guardado exitosamente.', 'Appoinment create')
            setTimeout(() => {
              this.onNoClick();
            }, 2000);
          }
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
