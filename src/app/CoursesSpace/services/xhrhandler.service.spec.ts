import { TestBed } from '@angular/core/testing';

import { XhrhandlerService } from './xhrhandler.service';

describe('XhrhandlerService', () => {
  let service: XhrhandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XhrhandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
