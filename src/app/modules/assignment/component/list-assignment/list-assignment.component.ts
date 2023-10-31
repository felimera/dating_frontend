import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentRepositoryImpl } from 'src/app/infrastructure/repositories/assignment.repository.impl';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css']
})
export class ListAssignmentComponent implements OnInit {

  assignments: Assignment[] = [];

  constructor(private assignmentRepositoryImpl: AssignmentRepositoryImpl) { }

  ngOnInit() {
    this.loadAssignment();
  }

  loadAssignment(): void {
    this.assignmentRepositoryImpl.getAll().subscribe({
      next: (assignments: Assignment[]) => this.assignments = assignments,
      error: (error) => console.error('Error al cargar las tareas:', error),
    });
  }

}
