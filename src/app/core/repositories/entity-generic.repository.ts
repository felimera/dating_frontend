import { Observable } from "rxjs";
import { EntityGeneric } from "../models/entity-generic.model";

export abstract class EntityGenericRepository {
  abstract getMonths(): Observable<EntityGeneric[]>;
  abstract getWorkHours(selectedDate: string): Observable<EntityGeneric[]>;
}
