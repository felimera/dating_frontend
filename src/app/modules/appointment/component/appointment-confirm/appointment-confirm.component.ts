import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { AppointmentTableService } from 'src/app/infrastructure/services/appointment-table.service';
import { AppointmentTable } from 'src/app/core/models/appointment-table.model';
import { AppointmentTableDTO } from 'src/app/infrastructure/dto/appointment-table.dto';
import { ContentTableDTO } from 'src/app/infrastructure/dto/content-table.dto';
import { AppointmentEditComponent } from '../../dialog/appointment-edit/appointment-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-confirm',
  templateUrl: './appointment-confirm.component.html',
  styleUrls: ['./appointment-confirm.component.css']
})
export class AppointmentConfirmComponent implements OnInit {

  dataAppTableDTO: AppointmentTableDTO[] = [];
  dataTableDTO: ContentTableDTO[] = [];

  displayedColumns: string[] = ['name', 'description', 'price', 'symbol'];
  dataSource: any;

  panelOpenState = false;

  custumer: CustomerDTO | undefined;

  constructor(
    private router: Router,
    private appointmentTableService: AppointmentTableService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.custumer = JSON.parse(this.cookieService.get('usuario'));

    this.loadDataIntoTable();
  }

  loadDataIntoTable(): void {
    this.appointmentTableService
      .getAppointmentByIdCustomer(this.custumer!.id)
      .subscribe({
        next:
          (appTable: AppointmentTable[]) => {
            appTable.forEach(app => {
              this.dataTableDTO = [];
              app.contentTableList.forEach(element => {
                this.dataTableDTO.push({ idAssignment: element.idAssignment, nombre: element.nombre, descripcion: element.descripcion, precio: element.precio })
              })
              this.dataAppTableDTO.push({ idAppointment: app.idAppointment, fecha: app.fecha, precioTotal: app.precioTotal, contentTableList: this.dataTableDTO });
            })
            this.dataSource = this.dataAppTableDTO;
          },
        error: error => console.log(error)
      })
  }

  isExitData(): boolean {
    return this.dataAppTableDTO.length > 0;
  }

  onReturnHome(): void {
    this.router.navigateByUrl('/home');
  }

  onEditarAppointment(idAppointment: number): void {
    this.dialog.open(AppointmentEditComponent, {
      height: '370px',
      width: '500px',
      data: { key: idAppointment }
    });
  }
}
