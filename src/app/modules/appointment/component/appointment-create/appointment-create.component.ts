import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

interface Transaction {
  item: string;
  cost: number;
}

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

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('Es');
  }

  ngOnInit(): void {

    this.appointmentForm = new FormGroup(
      {
        fecha: new FormControl('', [Validators.required]),
        hora: new FormControl('', [Validators.required]),
        precioTotal: new FormControl('', [Validators.required]),
        idCustomer: new FormControl('', [Validators.required]),
        idsAssignment: new FormControl([''], [Validators.required])
      }
    );

    this.priceTotal = this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4 },
    { item: 'Swim suit', cost: 15 },
  ];

  onCreater(): void {
    const fechaFormateada = this.pipe.transform(this.selected, 'dd/MM/yyyy');

    this.appointmentForm.get('fecha')!.setValue(fechaFormateada);
    this.appointmentForm.get('precioTotal')!.setValue(this.priceTotal);
    console.log('this.appointmentForm?.value ', this.appointmentForm?.value);
  }
}
