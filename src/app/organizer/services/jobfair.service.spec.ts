import { TestBed } from '@angular/core/testing';

import { JobfairService } from './jobfair.service';

describe('JobfairService', () => {
  let service: JobfairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobfairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
