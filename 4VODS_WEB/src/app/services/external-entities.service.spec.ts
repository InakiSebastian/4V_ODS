import { TestBed } from '@angular/core/testing';

import { ExternalEntitiesService } from './external-entities.service';

describe('EsternalEntitiesService', () => {
  let service: ExternalEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
