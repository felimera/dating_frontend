import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssignmentService } from 'src/app/infrastructure/services/assignment.service';
import { AssignmentDTO } from 'src/app/infrastructure/dto/assignment.dto';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  selected?: Date | null;
  pipe = new DatePipe('en-US');

  appointmentForm: FormGroup<any> | any;

  priceTotal: number | undefined;

  assingments: AssignmentDTO[] = [];
  customer: CustomerDTO | any;
  displayedColumns: string[] = ['nombre', 'precio'];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private assingmentService: AssignmentService,
    private cookieService: CookieService
  ) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.assingmentService.getByListIds(params['ids']).subscribe(res => {
        this.assingments = res;
        this.priceTotal = this.assingments.map(t => t.precio).reduce((acc, value) => value + acc, 0);
      })
    });

    this.appointmentForm = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      precioTotal: new FormControl('', [Validators.required]),
      idCustomer: new FormControl('', [Validators.required]),
      idsAssignment: new FormControl([''], [Validators.required])
    });

    this.customer = JSON.parse(this.cookieService.get('usuario'));
    console.log('this.customer ', this.customer);
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
    this.appointmentForm.get('idCustomer').setValue(this.customer.id);
    this.appointmentForm.get('idsAssignment').setValue(this.assingments.map(assignment => assignment.id));

    console.log('this.appointmentForm?.value ', this.appointmentForm?.value);
  }
}
