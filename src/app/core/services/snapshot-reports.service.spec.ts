import { TestBed } from '@angular/core/testing';

import { SnapshotReportsService } from './snapshot-reports.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ClassOfStudents } from '../models/class.model';
describe('SnapshotReportsService', () => {
  HttpClientTestingModule;
  let service: SnapshotReportsService;
  let httpClient: HttpClient;
  let httpTestControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SnapshotReportsService],
    });
    service = TestBed.inject(SnapshotReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get classes', () => {
    const testClass: ClassOfStudents[] = [
      { id: 1, students: ['Student 1', 'Student 2'], name: 'Class 1' },
      { id: 2, students: ['Student 3', 'Student 4'], name: 'Class 2' },
    ];
    service.fetchClassesAndStudents().subscribe((classes) => {
      expect(testClass).toBe(classes, 'check mockdata');
    });

    const req = httpTestControl.expectOne(service.CLASS_STUDENTS_URL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testClass);

    httpTestControl.verify();
  });
});
