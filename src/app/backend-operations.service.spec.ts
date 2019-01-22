import { TestBed } from '@angular/core/testing';

import { BackendOperationsService } from './backend-operations.service';

describe('BackendOperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendOperationsService = TestBed.get(BackendOperationsService);
    expect(service).toBeTruthy();
  });
});
