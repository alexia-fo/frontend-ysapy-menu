import { TestBed } from '@angular/core/testing';

import { AbmcMenuService } from './abmc-menu.service';

describe('AbmcMenuService', () => {
  let service: AbmcMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmcMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
