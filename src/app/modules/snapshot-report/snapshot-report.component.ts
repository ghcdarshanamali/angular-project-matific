import { Component, OnInit } from '@angular/core';
import { SnapshotReportsService } from '../../core/services/snapshot-reports.service';
import { ClassOfStudents } from '../../core/models/class.model';

@Component({
  selector: 'app-snapshot-report',
  templateUrl: './snapshot-report.component.html',
  styleUrl: './snapshot-report.component.scss',
})
export class SnapshotReportComponent implements OnInit {
  public classesArray: ClassOfStudents[] = [];
  public studentsArray: string[] = [];
  public reportsArray: any[];
  public className: number;
  public studentName: string;
  public startDate: string = '2018-10-01';
  public endDate: string = '2017-10-01';
  public averageValues: number[];
  public unassignedPercentage: number = 0;
  public weakPercentage: number = 0;
  public okPercentage: number = 0;
  public goodPercentage: number = 0;
  public excellentPercentage: number = 0;

  constructor(private snapshotReoprtsService: SnapshotReportsService) {}

  ngOnInit(): void {
    this.getClassesAndStudents();
    this.getReports();
  }

  //Load the classes
  public getClassesAndStudents() {
    this.snapshotReoprtsService
      .fetchClassesAndStudents()
      .subscribe((results) => {
        if(results.length > 0) {
          this.classesArray = results;
        } else {
          this.classesArray = [];
        }
        
      });
  }

  //Load the students after selecting a Class
  public loadStudents() {
    this.studentsArray = [];
    this.studentName = null;
    this.studentsArray = this.classesArray.filter(
      (cls) => cls.id === this.className
    )[0].students;
    this.loadReports('class');
  }

  //Load the reports after selecting a class or student
  public loadReports(type: string) {
    let tempArray = [];
    switch (type) {
      case 'class':
        this.reportsArray = this.snapshotReoprtsService.fetchReports2();
        this.studentsArray.forEach((student) => {
          tempArray.push(
            ...this.reportsArray.filter((s) => s.student === student)
          );
        });
        break;
      case 'student':
        tempArray.push(
          ...this.reportsArray.filter((s) => s.student === this.studentName)
        );
        break;
      default:
        tempArray = this.snapshotReoprtsService.fetchReports2();
    }
    this.reportsArray = tempArray;
    this.calculateProgress();
  }

  public getReports() {
    this.reportsArray = this.snapshotReoprtsService.fetchReports2();
    this.calculateProgress();
    /* this.snapshotReoprtsService.fetchReports().subscribe(
      (results) => {
        this.reportsArray = results;
       
      }
    ); */
  }
  //get the average of the marks.
  public getAverage(values: number[]) {
    let average = values.reduce((a, b) => a + b, 0) / values.length || 0;
    return average;
  }

  //find the latest date
  public findDateOfAttempt(weeks: Date[]) {
    let latest = weeks.reduce(function (r, a) {
      return r > a ? r : a;
    });
  }

  //calculate the progress for the progress bar
  public calculateProgress() {
    let tempArray = [];
    this.reportsArray.forEach((item) => {
      tempArray.push(this.getAverage(item.attempts.values));
    });
    this.excellentPercentage = this.findPercentage(90, 100, tempArray);
    this.goodPercentage = this.findPercentage(80, 90, tempArray);
    this.okPercentage = this.findPercentage(60, 80, tempArray);
    this.weakPercentage = this.findPercentage(0, 60, tempArray);
    this.unassignedPercentage =
      100 -
      (this.excellentPercentage +
        this.goodPercentage +
        this.okPercentage +
        this.weakPercentage);
  }

  //find the percentatge for the progress bars.
  public findPercentage(minValue: number, maxValue: number, values: number[]) {
    let numberOfValues = values.length;
    let count = values.filter(
      (item) => minValue <= item && item <= maxValue
    ).length;
    return (count / numberOfValues) * 100;
  }
}
