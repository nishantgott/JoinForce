import { TestBed } from '@angular/core/testing';

import { UserNotificationsService } from './user-notifications.service';

describe('UserNotificationsService', () => {
  let service: UserNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
