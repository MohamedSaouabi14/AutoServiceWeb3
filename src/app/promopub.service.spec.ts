import { TestBed } from '@angular/core/testing';

import { PromopubService } from './promopub.service';

describe('PromopubService', () => {
  let service: PromopubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromopubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
