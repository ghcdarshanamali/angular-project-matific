import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SnapshotReportComponent } from './snapshot-report.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SnapshotReportsService } from '../../core/services/snapshot-reports.service';
import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

describe('SnapshotReportComponent', () => {
  let component: SnapshotReportComponent;
  let fixture: ComponentFixture<SnapshotReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [SnapshotReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnapshotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClassesAndStudents and get response as empty array', fakeAsync(() => {
    let snapShotService = fixture.debugElement.injector.get(
      SnapshotReportsService
    );
    let spy_fetchClassesAndStudents = spyOn(
      snapShotService,
      'fetchClassesAndStudents'
    ).and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getClassesAndStudents();
    tick(100);
    expect(component.getClassesAndStudents).toEqual([]);
  }));

  it('should call getClassesAndStudents and get response as array', fakeAsync(() => {
    let snapShotService = fixture.debugElement.injector.get(
      SnapshotReportsService
    );
    let spy_fetchClassesAndStudents = spyOn(
      snapShotService,
      'fetchClassesAndStudents'
    ).and.callFake(() => {
      return Rx.of([
        { id: 1, name: 'Class 1', students: ['Student 1', 'Student 2'] },
      ]).pipe(delay(2000));
    });
    component.getClassesAndStudents();
    tick(1000);

    expect(component.getClassesAndStudents).toEqual([
      { id: 1, name: 'Class 1', students: ['Student 1', 'Student 2'] },
    ]);
  }));

  it('should call getReports and get response as empty array', fakeAsync(() => {
    let snapShotService = fixture.debugElement.injector.get(
      SnapshotReportsService
    );
    let spy_getReports = spyOn(snapShotService, 'fetchReports2').and.callFake(
      () => {
        return [];
      }
    );
    component.getReports();
    tick(100);
    expect(component.getReports).toEqual([]);
  }));

  it('should call getReports and get response as array', fakeAsync(() => {
    let snapShotService = fixture.debugElement.injector.get(
      SnapshotReportsService
    );
    let spy_getReports = spyOn(snapShotService, 'fetchReports2').and.callFake(
      () => {
        return [
          {
            id: 1,
            content: 'Pile Up',
            attempts: {
              weeks: ['27/09/18', '23/09/18'],
              values: [87, 67],
            },
            student: 'Student 0',
            time: '30m',
            skill: 'Count to 10',
            type: 'Activity',
          },
        ];
      }
    );
    component.getReports();
    tick(1000);
    expect(component.getReports).toEqual([
      {
        id: 1,
        content: 'Pile Up',
        attempts: {
          weeks: ['27/09/18', '23/09/18'],
          values: [87, 67],
        },
        student: 'Student 0',
        time: '30m',
        skill: 'Count to 10',
        type: 'Activity',
      },
    ]);
  }));
});
