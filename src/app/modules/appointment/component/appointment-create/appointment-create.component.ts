import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssignmentService } from 'src/app/infrastructure/services/assignment.service';
import { AssignmentDTO } from 'src/app/infrastructure/dto/assignment.dto';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentService } from 'src/app/infrastructure/services/appointment.service';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { Assignment } from 'src/app/core/models/assignment.model';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  selected?: Date | null;
  pipe = new DatePipe('en-US');
  minDate?: Date;
  maxDate?: Date;

  appointmentForm: FormGroup<any> | any;

  priceTotal: number | undefined;

  assingments: AssignmentDTO[] = [];
  customer: CustomerDTO | any;
  displayedColumns: string[] = ['nombre', 'precio'];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private assingmentService: AssignmentService,
    private cookieService: CookieService,
    private appointmentService: AppointmentService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {

    this.customer = JSON.parse(this.cookieService.get('usuario'));

    this.appointmentForm = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      precioTotal: new FormControl('', [Validators.required]),
      idCustomer: new FormControl(this.customer.id, [Validators.required]),
      idsAssignment: new FormControl('', [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.consultarServicioAppointment(params);
      }
    });

    this.limitesFechaSeleccionada();
  }

  consultarServicioAppointment(params: Params): void {
    this.assingmentService
      .getByListIds(params['ids'])
      .subscribe({
        next: (res: Assignment[]) => {
          if (res) {
            this.assingments = res;
            this.priceTotal = this.assingments.map(t => t.precio).reduce((acc, value) => value + acc, 0);
            this.appointmentForm.get('idsAssignment').setValue(this.assingments.map(assignment => assignment.id));
          }
        },
        error: res => console.log(res.error)
      })
  }

  limitesFechaSeleccionada(): void {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay + 1);
    this.maxDate = new Date(currentYear + 0, currentMonth + 1, 31);
  }

  fechaCita(): string {
    const fechaFormateada = this.pipe.transform(this.selected, 'dd/MM/yyyy');
    this.appointmentForm.get('fecha')!.setValue(fechaFormateada);
    return this.appointmentForm.get('fecha').value;
  }

  onCreater(): void {
    const fechaFormateada = this.pipe.transform(this.selected, 'dd/MM/yyyy');

    this.appointmentForm.get('fecha')!.setValue(fechaFormateada);
    this.appointmentForm.get('precioTotal')!.setValue(this.priceTotal);

    this.appointmentService
      .postAppointment(this.appointmentForm.value)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.toasterService.success('Registro guardado exitosamente.', 'Appoinment create');
            setTimeout(() => {
              this.appointmentForm.get('fecha')!.setValue('');
              this.appointmentForm.get('precioTotal')!.setValue('');
              this.router.navigateByUrl("/home");
            }, 3000);
          }
        }, error: error => console.error('error', error)
      })
  }
}
