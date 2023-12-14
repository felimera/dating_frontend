import { TestBed } from '@angular/core/testing';

import { EntityGenericService } from './entity-generic.service';

describe('EntityGenericService', () => {
  let service: EntityGenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
