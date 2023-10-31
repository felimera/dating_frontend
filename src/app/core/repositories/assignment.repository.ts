import { Observable } from "rxjs";
import { Assignment } from "../models/assignment.model";

export abstract class AssignmentRepository {
  abstract getAll(): Observable<Array<Assignment>>;
}
