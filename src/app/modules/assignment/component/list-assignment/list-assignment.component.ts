import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentRepositoryImpl } from 'src/app/infrastructure/repositories/assignment.repository.impl';
import { DialogElementsDialogComponent } from 'src/app/modules/component/dialog-elements-dialog/dialog-elements-dialog.component';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {

  assignments: Assignment[] = [];

  valid: boolean | any;

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
      next: (assignments: Assignment[]) => this.assignments = assignments,
      error: (error) => console.error('Error al cargar las tareas:', error),
    });
  }

  onAddAppointment(): void {
    if (localStorage.getItem('TOKEN')) {
      this.router.navigateByUrl('/appointment-create');
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
}
