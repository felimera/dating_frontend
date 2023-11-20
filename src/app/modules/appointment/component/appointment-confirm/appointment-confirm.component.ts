import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/infrastructure/services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentDTO } from 'src/app/infrastructure/dto/appointment.dto';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

const ELEMENT_DATA: AppointmentDTO[] = [];


@Component({
  selector: 'app-appointment-confirm',
  templateUrl: './appointment-confirm.component.html',
  styleUrls: ['./appointment-confirm.component.css']
})
export class AppointmentConfirmComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  custumer: CustomerDTO | undefined;

  constructor(
    private router: Router,
    private appointmentService:AppointmentService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.custumer = JSON.parse(this.cookieService.get('usuario'));

    this.appointmentService
    .getAppointmentByIdCustomer(this.custumer!.id)
    .subscribe({
      next:
        (res:any)=>{
          console.log("res",res);
        }
    })
  }

  onReturnHome(): void {
    this.router.navigateByUrl('/home');
  }
}
