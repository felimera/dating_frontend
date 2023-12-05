import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentTable } from 'src/app/core/models/appointment-table.model';
import { EntityGeneric } from 'src/app/core/models/entity-generic.model';
import { AppointmentTableDTO } from 'src/app/infrastructure/dto/appointment-table.dto';
import { ContentTableDTO } from 'src/app/infrastructure/dto/content-table.dto';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { EntityGenericDTO } from 'src/app/infrastructure/dto/entity-generic.dto';
import { AppointmentTableService } from 'src/app/infrastructure/services/appointment-table.service';
import { EntityGenericService } from 'src/app/infrastructure/services/entity-generic.service';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { AppointmentEditComponent } from '../../dialog/appointment-edit/appointment-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/infrastructure/services/appointment.service';
import { MessageGenericDTO } from 'src/app/infrastructure/dto/message-generic.dto';
import { Appointment } from 'src/app/core/models/appointment.model';

@Component({
  selector: 'app-appointment-review',
  templateUrl: './appointment-review.component.html',
  styleUrls: ['./appointment-review.component.css']
})
export class AppointmentReviewComponent implements OnInit {
  onClear() {
    throw new Error('Method not implemented.');
  }

  nameCustomerValue = '';
  validValue = 'T';

  dataAppTableDTO: AppointmentTableDTO[] = [];
  dataTableDTO: ContentTableDTO[] = [];

  appointment: Appointment | undefined;

  displayedColumns: string[] = ['name', 'description', 'price', 'symbol'];
  dataSource: any;

  panelOpenState = false;

  custumer: CustomerDTO | undefined;

  entityGenericMonths: EntityGenericDTO[] = [];
  entityGenericTypes: EntityGenericDTO[] = [];

  constructor(
    private appointmentTableService: AppointmentTableService,
    private cookieService: CookieService,
    private entityGenericService: EntityGenericService,
    private toasterService: ToasterService,
    public dialog: MatDialog,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.custumer = JSON.parse(this.cookieService.get('usuario'));

    this.loadDataIntoTable();
    this.loadMonthsOfYears();

    this.entityGenericTypes.push(
      { id: "T", value: "Todo" },
      { id: "A", value: "Activos" },
      { id: "V", value: "Vencidos" }
    );
  }

  loadMonthsOfYears() {
    this.entityGenericService
      .getMonths()
      .subscribe({
        next: (entitys: EntityGeneric[]) => {
          this.entityGenericMonths.push({ id: "0", value: 'Ninguno' });
          entitys.forEach((app: EntityGeneric) => {
            this.entityGenericMonths.push({ id: app.id, value: app.value });
          })
        },
        error: res => console.log(res)
      })
  }

  loadDataIntoTable(valid?: string, nameCustomer?: string): void {
    this.dataAppTableDTO = [];
    this.appointmentTableService
      .getConsultQuoteWithAnyFilters(valid, nameCustomer)
      .subscribe({
        next: (appTable: AppointmentTable[]) => {
          if (appTable) {
            appTable.forEach(app => {
              this.dataTableDTO = [];
              if (app.contentTableList) {
                app.contentTableList.forEach(element => {
                  this.dataTableDTO.push({ idAssignment: element.idAssignment, nombre: element.nombre, descripcion: element.descripcion, precio: element.precio })
                })
                this.dataAppTableDTO.push({ idAppointment: app.idAppointment, fecha: app.fecha, fechaSinFor: app.fechaSinFor, horaSinFor: app.horaSinFor, precioTotal: app.precioTotal, contentTableList: this.dataTableDTO, idMonth: app.idMonth, month: app.month, fillNameCustomer: app.fillNameCustomer, idCustomer: app.idCustomer });
              }
            })
            this.dataSource = this.dataAppTableDTO;
          }
        }, error: (res: any) => {
          this.dataAppTableDTO = [];
          this.dataSource = this.dataAppTableDTO;
          this.toasterService.info(res.error.message);
          console.log(res.error.message);
        }
      })
  }

  onSearchData(): void {
    this.loadDataIntoTable(this.validValue, this.nameCustomerValue);
  }

  onFilterMonth(id: string): void {
    const listTableDTO: AppointmentTableDTO[] = this.dataAppTableDTO.filter(value => value.idMonth == id);
    this.dataSource = listTableDTO;
  }

  onEditarAppointment(app: AppointmentTableDTO): void {
    const dialogRef = this.dialog.open(AppointmentEditComponent, {
      height: '180px',
      width: '500px',
      data: { idAppointment: app.idAppointment, precioTotal: app.precioTotal, fechaSinFor: app.fechaSinFor, horaSinFor: app.horaSinFor, idCustomer: app.idCustomer }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadDataIntoTable();
    });
  }

  onDeleteAppointment(app: AppointmentTableDTO): void {
    if (confirm('¿Seguro desea eliminar este registro?')) {
      this.appointmentService
        .deleteAppointment(app.idAppointment)
        .subscribe({
          next: (res: MessageGenericDTO) => {
            if (res) {
              this.toasterService.info(res.message, 'Delete Appointmnet');
              setTimeout(() => {
                this.loadDataIntoTable();
              }, 3000);
            }
          },
          error: (res: any) => console.log(res.error.message)
        })
    }
  }

  onRemoveAssignment(app: AppointmentTableDTO, idAssignment: number): void {
    if (confirm('¿Seguro deseas retirar este Assignment del Appointment?')) {
      this.appointment = {
        idCustomer: app.idCustomer,
        fecha: app.fechaSinFor,
        idAssignment: idAssignment
      }

      this.appointmentService
        .deleteAppointmentByAssignment(this.appointment!)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.toasterService.success(res.message, 'Appoinment remove');
              this.loadDataIntoTable();
            }
          },
          error: res => console.log(res.error.message)
        });
    }
  }
}
