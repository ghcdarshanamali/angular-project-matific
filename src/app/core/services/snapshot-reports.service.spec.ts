import { TestBed } from '@angular/core/testing';

import { SnapshotReportsService } from './snapshot-reports.service';
import {  HttpClientModule } from '@angular/common/http';

describe('SnapshotReportsService', () => {
  let service: SnapshotReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule]
    });
    service = TestBed.inject(SnapshotReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
