import { TestBed } from '@angular/core/testing';

import { AppointmentTableService } from './appointment-table.service';

describe('AppointmentTableService', () => {
  let service: AppointmentTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
