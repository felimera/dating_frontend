import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignmentMapper } from 'src/app/core/mappers/assignment.mapper';
import { Assignment } from 'src/app/core/models/assignment.model';
import { AssignmentDTO } from '../dto/assignment.dto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private apiUrl = 'http://localhost:82/api/assignment/all';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Assignment[]> {
    return this.http
      .get<AssignmentDTO[]>(this.apiUrl)
      .pipe(map((apiAssignment) => apiAssignment.map(AssignmentMapper.fromApiToDomain)));
  }
}
