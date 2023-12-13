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
import { CustomerService } from 'src/app/infrastructure/services/customer.service';
import { Customer } from 'src/app/core/models/customer.model';
import { EntityGenericDTO } from 'src/app/infrastructure/dto/entity-generic.dto';
import { EntityGenericService } from 'src/app/infrastructure/services/entity-generic.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  selected!: Date;
  pipe = new DatePipe('en-US');
  minDate?: Date;
  maxDate?: Date;
  idCustomerValue: string = '';
  nameCustomerValue: string = '';
  emailCustomerValue: string = '';

  fillNameCustomerDTO: CustomerDTO | any;
  timeValues: EntityGenericDTO[] = [];
  timeValue: EntityGenericDTO | any;

  appointmentForm: FormGroup<any> | any;

  priceTotal: number | undefined;

  assingments: AssignmentDTO[] = [];
  customer: CustomerDTO | any;
  displayedColumns: string[] = ['nombre', 'precio'];

  customers: CustomerDTO[] = [];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private assingmentService: AssignmentService,
    private cookieService: CookieService,
    private appointmentService: AppointmentService,
    private toasterService: ToasterService,
    private router: Router,
    private customerService: CustomerService,
    private entityGenericService: EntityGenericService
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {

    this.customer = JSON.parse(this.cookieService.get('usuario'));

    if (this.customer.rol[0] !== 'A')
      this.fillNameCustomerDTO = this.customer;

    this.appointmentForm = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      precioTotal: new FormControl('', [Validators.required]),
      idCustomer: new FormControl('', [Validators.required]),
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
    this.appointmentForm.get('idCustomer')!.setValue(this.fillNameCustomerDTO?.id);

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

  isRolAdmin(): boolean {
    return this.customer.rol[0] === 'A';
  }

  onSearchCustomerParameter(): void {
    this.customerService
      .getAnyCustomerWithQueryParameters(Number(this.idCustomerValue), this.nameCustomerValue, this.emailCustomerValue)
      .subscribe({
        next: (res: Customer[]) => {
          if (res) {
            this.customers = res
          }
        },
        error: res => console.log(res.error)
      })
  }

  isEnableBottoSerach(): boolean {
    return this.idCustomerValue.trim().length == 0 && this.nameCustomerValue.trim().length == 0 && this.emailCustomerValue.trim().length == 0;
  }

  onFillNameCustomer(): string {
    if (this.fillNameCustomerDTO) {
      return this.fillNameCustomerDTO?.nombre + ' ' + this.fillNameCustomerDTO?.apellido;
    }
    return '';
  }

  dateChanged(date: any) {
    this.appointmentForm.get('hora')!.setValue('');
    const fechaFormateada = this.pipe.transform(date, 'yyyy-MM-dd');

    this.entityGenericService
      .getWorkHours(fechaFormateada ? fechaFormateada : '')
      .subscribe({
        next: (res: EntityGenericDTO[]) => {
          this.timeValues = [];
          if (res) {
            res.forEach(data => this.timeValues.push({ id: data.id, value: data.value, displased: data.displased }));
            this.validateLastArrayIfThereAreTwoServices();
            this.validateTheActiveOnesBetweenBoxes();
          }
        },
        error: res => console.log(res.error)
      })
  }

  compareId(a: EntityGenericDTO, b: EntityGenericDTO) {
    const nameA = a.id;
    const nameB = b.id;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  validateLastArrayIfThereAreTwoServices(): void {
    if (this.assingments.length == 2) {
      const indexLast = this.timeValues.length - 1;
      const entityTempl = this.timeValues[indexLast];
      this.timeValues = this.timeValues.filter(elem => elem.id !== entityTempl.id);
      entityTempl.displased = true;
      this.timeValues.push(entityTempl);
    }
  }

  validateTheActiveOnesBetweenBoxes(): void {

    const timesTempl = this.timeValues.filter(elem => elem.displased === false);
    const indexLast = this.timeValues.length - 1;
    console.log(indexLast)
    timesTempl.forEach(elem => {
      const index = this.timeValues.findIndex(data => data.id === elem.id);
      const timesTempl = this.timeValues[index];
      const timesNext = this.timeValues[1 + index];
      if ((index !== indexLast) && (timesNext.displased === true) && (1 + index !== indexLast)) {
        this.timeValues = this.timeValues.filter(elem => elem.id !== timesTempl.id);
        timesTempl.displased = true;
        this.timeValues.push(timesTempl);
        this.timeValues.sort(this.compareId);
      }
    });
  }

  onCheckTime(data: EntityGenericDTO): void {
    this.appointmentForm.get('hora')!.setValue(data.value);
  }

  getHoraCita(): string {
    return this.appointmentForm.get('hora')!.value;
  }

  isValidIcon(data: EntityGenericDTO): boolean {
    return data.value === this.appointmentForm.get('hora')!.value;
  }
}
