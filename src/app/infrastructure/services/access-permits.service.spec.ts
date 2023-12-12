import { TestBed } from '@angular/core/testing';

import { AccessPermitsService } from './access-permits.service';

describe('AccessPermitsService', () => {
  let service: AccessPermitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessPermitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
