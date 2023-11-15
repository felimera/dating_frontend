import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentRepositoryImpl } from 'src/app/infrastructure/repositories/assignment.repository.impl';
import { DialogElementsDialogComponent } from 'src/app/modules/component/dialog-elements-dialog/dialog-elements-dialog.component';
import { AssignmentCardDialogComponent } from '../assignment-card-dialog/assignment-card-dialog.component';
import { DataElement } from 'src/app/infrastructure/dto/data-table.dto';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {

  assignments: Assignment[] = [];

  valid: boolean | any;

  displayedColumns: string[] = ['select', 'position', 'name', 'price', 'symbol'];
  ELEMENT_DATA: DataElement[] = [];
  dataSource: any;
  selection = new SelectionModel<DataElement>(true, []);

  constructor(
    private assignmentRepositoryImpl: AssignmentRepositoryImpl,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAssignment();
  }


  loadAssignment(): void {
    this.assignmentRepositoryImpl.getAll().subscribe({
      next: (assignments: Assignment[]) => {
        assignments.forEach(assignment => {
          this.ELEMENT_DATA.push({ id: assignment.id, position: assignment.posicion, name: assignment.nombre, price: assignment.precio, symbol: '' });
        })
        this.dataSource = new MatTableDataSource<DataElement>(this.ELEMENT_DATA);
      },
      error: (error) => console.error('Error al cargar las tareas:', error),
    });
  }

  onAddAppointment(): void {
    if (localStorage.getItem('TOKEN')) {
      if (this.selection.selected.length >= 1) {
        this.router.navigate(
          ['/appointment-create'],
          {
            queryParams: { ids: this.selection.selected.map(data => data.id) }
          }
        );
      }
    } else {
      const dialogRef = this.dialog.open(DialogElementsDialogComponent, {
        data: { valid: this.valid },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.valid = result.valid
        if (this.valid)
          this.router.navigateByUrl('/login');
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DataElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onAssignmentCard(elemnt: Assignment): void {

    this.dialog.open(AssignmentCardDialogComponent, {
      data: { key: elemnt.id }
    });
  }
}
