import { TestBed } from '@angular/core/testing';

import { IniciativeService } from './iniciative.service';

describe('IniciativeService', () => {
  let service: IniciativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
