import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EntityGenericMapper } from 'src/app/core/mappers/entity-generic.mapper';
import { EntityGeneric } from 'src/app/core/models/entity-generic.model';

@Injectable({
  providedIn: 'root'
})
export class EntityGenericService {

  private apiUrl = 'http://localhost:82/api/generic';

  constructor(private http: HttpClient) { }

  getMonths(): Observable<EntityGeneric[]> {
    return this.http
      .get<EntityGeneric[]>(`${this.apiUrl}/meses`)
      .pipe(map((entity) => entity.map(EntityGenericMapper.fromApiToDomain)));
  }
}
