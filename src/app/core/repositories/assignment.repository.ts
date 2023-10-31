import { Observable } from "rxjs";
import { Assignment } from "../models/assignment.model";

export abstract class AssignmentRespository {
  abstract getAll(): Observable<Assignment[]>;
}
