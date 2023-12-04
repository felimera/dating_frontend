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
import { AppointmentTableDTO } from 'src/app/infrastructure/dto/appointment-table.dto';

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
  fechaAppointment: string | undefined;
  horaAppointment: string | undefined;
  idCustomer: number | undefined;

  pipe = new DatePipe('en-US');


  constructor(
    public dialogRef: MatDialogRef<AppointmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentTableDTO,
    private dateAdapter: DateAdapter<Date>,
    private appointmentService: AppointmentService,
    private toasterService: ToasterService,
    private cookieService: CookieService
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {
    this.customer = JSON.parse(this.cookieService.get('usuario'));

    this.idAppointment = this.data.idAppointment;
    this.priceAppointment = this.data.precioTotal.toString();
    this.fechaAppointment = this.data.fechaSinFor;
    this.horaAppointment = this.data.horaSinFor;
    this.idCustomer = this.data.idCustomer;

    const fechaFormateada = this.pipe.transform(this.fechaAppointment, 'MM-dd-yyyy');

    this.appointmentForm = new FormGroup({
      fecha: new FormControl(new Date(fechaFormateada!), [Validators.required]),
      hora: new FormControl(this.horaAppointment, [Validators.required]),
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

    const fechaSelected = this.appointmentForm.get('fecha').value;
    const fechaFormateada = this.pipe.transform(fechaSelected, 'dd/MM/yyyy');
    this.appointmentForm.get('fecha')!.setValue(fechaFormateada);
    this.appointmentForm.get('precioTotal')!.setValue(this.clearPriceFormat(this.priceAppointment));

    if (this.customer.rol[0] === 'A') {
      this.appointmentForm.get('idCustomer')!.setValue(this.idCustomer);
      this.appointmentService.putAdminAppointment(this.idAppointment!, this.appointmentForm.value)
        .subscribe({
          next: (res: Appointment) => {
            if (res) {
              this.toasterService.success('Registro guardado exitosamente.', 'Appoinment edit')
              setTimeout(() => {
                this.onNoClick();
              }, 1000);
            }
          }
        });
    } else {
      this.appointmentForm.get('idCustomer')!.setValue(this.customer.id);
      this.appointmentService.putAppointment(this.idAppointment!, this.appointmentForm.value)
        .subscribe({
          next: (res: Appointment) => {
            if (res) {
              this.toasterService.success('Registro guardado exitosamente.', 'Appoinment edit')
              setTimeout(() => {
                this.onNoClick();
              }, 1000);
            }
          }
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
