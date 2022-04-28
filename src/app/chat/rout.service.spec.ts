import { TestBed } from '@angular/core/testing';

import { RoutService } from './rout.service';

describe('RoutService', () => {
  let service: RoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
