import { TestBed } from '@angular/core/testing';

import { CelebrityService } from './celebrity.service';

describe('CelebrityService', () => {
  let service: CelebrityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelebrityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
