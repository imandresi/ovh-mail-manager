import { TestBed } from '@angular/core/testing';

import { MailManagerService } from './mail-manager.service';

describe('MailManagerService', () => {
  let service: MailManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
