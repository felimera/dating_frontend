import { Injectable } from '@angular/core';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentRepository } from 'src/app/core/repositories/assignment.repository';
import { AssignmentService } from '../services/assignment.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentRepositoryImpl implements AssignmentRepository {
  constructor(private assignmentService: AssignmentService) { }

  getAll(): Observable<Assignment[]> {
    return this.assignmentService.getAll();
  }
}
