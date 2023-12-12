import { Injectable } from "@angular/core";
import { AccessPermitsRepository } from "src/app/core/repositories/access-permits.repository";
import { AccessPermitsService } from "../services/access-permits.service";
import { Observable } from "rxjs";
import { AccessPermits } from "src/app/core/models/access-permits.model";

@Injectable({
  providedIn: 'root',
})

export class AccessPermitsRepositoryImpl implements AccessPermitsRepository {

  constructor(private accessPermitsService: AccessPermitsService) { }

  getAccessPermitsByIdCustomer(idCustomer: number): Observable<AccessPermits> {
    return this.accessPermitsService.getAccessPermitsByIdCustomer(idCustomer);
  }

  getAccessPermitsWithoutId(): Observable<AccessPermits> {
    return this.accessPermitsService.getAccessPermitsWithoutId();
  }
}
