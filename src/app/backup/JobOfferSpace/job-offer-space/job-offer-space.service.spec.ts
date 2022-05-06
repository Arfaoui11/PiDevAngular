import { TestBed } from '@angular/core/testing';

import { JobOfferSpaceService } from './job-offer-space.service';

describe('JobOfferSpaceService', () => {
  let service: JobOfferSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOfferSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
