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
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ClassOfStudents } from '../../core/models/class.model';

describe('SnapshotReportComponent', () => {
  let component: SnapshotReportComponent;
  let fixture: ComponentFixture<SnapshotReportComponent>;
  let service: SnapshotReportsService;
  const testClass : ClassOfStudents[] = [
    {"id":1,"students":["Student 1","Student 2"],"name":"Class 1"},
    {"id":2,"students":["Student 3","Student 4"],"name":"Class 2"}
  ];
const testActivities : any [] = [
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
  {
    id: 2,
    content: 'Pile Up',
    attempts: {
      weeks: ['27/09/18', '23/09/18'],
      values: [87, 67],
    },
    student: 'Student 1',
    time: '30m',
    skill: 'Count to 10',
    type: 'Activity',
  },
]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      providers: [SnapshotReportsService],
      declarations: [SnapshotReportComponent, ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnapshotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(SnapshotReportsService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the average', () => {
    expect(component.getAverage([40,60,80])).toBe(60);
  });

  it('should check the the percentage', () => {
    expect(component.findPercentage(60,80,[40,65,80,90])).toEqual(50);
  });

  it('should call getClassesAndStudents and get data and check length', fakeAsync(() => {
  
    spyOn(service,"fetchClassesAndStudents").and.callFake(()=> {
      return Rx.of(testClass)
    });
    component.getClassesAndStudents();
    expect(component.classesArray).toEqual(testClass);
    tick(1000);
    expect(component.classesArray).toBeDefined();
    expect(component.classesArray.length).toEqual(2);
  }
  ));
  
  it('should call getClassesAndStudents and get response as empty array', fakeAsync(() => {
   
    spyOn(
      service,
      'fetchClassesAndStudents'
    ).and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getClassesAndStudents();
    tick(100);
    expect(component.classesArray).toEqual([]);
  }));

  it('should call getReports and get response as empty array', fakeAsync(() => {
    
    spyOn(service, 'fetchReports').and.callFake(()=> {
      return Rx.of([]).pipe(delay(100));
    });
    component.getReports();
    tick(100);
    expect(component.reportsArrayInit).toEqual([]);
  }));

  it('should call getReports and get response as array', fakeAsync(() => {
    let spy = spyOn(service, "fetchReports").and.callFake(
      () => {
        return Rx.of(testActivities);
      });
      console.log("spy",spy)
    component.getReports();
    tick(1000);
    console.log(testActivities)
    expect(component.reportsArrayInit).toEqual(testActivities);
    expect(component.reportsArrayInit.length).toBeGreaterThan(0);
  }));
});
