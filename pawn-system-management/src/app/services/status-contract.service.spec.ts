import { TestBed } from '@angular/core/testing';

import { StatusContractService } from './status-contract.service';

describe('StatusContractService', () => {
  let service: StatusContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
