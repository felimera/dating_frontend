import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EntityGenericRepository } from "src/app/core/repositories/entity-generic.repository";
import { EntityGenericService } from "../services/entity-generic.service";
import { EntityGeneric } from "src/app/core/models/entity-generic.model";

@Injectable({
  providedIn: 'root',
})

export class EntityGenericRepositoryImpl implements EntityGenericRepository {
  constructor(private entityGenericService: EntityGenericService) { }

  getMonths(): Observable<EntityGeneric[]> {
    return this.entityGenericService.getMonths();
  }

  getWorkHours(selectedDate: string): Observable<EntityGeneric[]> {
    return this.entityGenericService.getWorkHours(selectedDate);
  }
}
