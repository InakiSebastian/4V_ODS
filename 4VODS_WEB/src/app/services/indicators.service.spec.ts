/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndicatorsService } from './indicators.service';

describe('Service: Indicators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicatorsService]
    });
  });

  it('should ...', inject([IndicatorsService], (service: IndicatorsService) => {
    expect(service).toBeTruthy();
  }));
});
