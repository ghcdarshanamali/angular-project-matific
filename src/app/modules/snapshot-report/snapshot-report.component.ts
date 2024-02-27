import { Component, OnInit } from '@angular/core';
import { SnapshotReportsService } from '../../core/services/snapshot-reports.service';
import { ClassAndStudents } from '../../core/models/class.model';

@Component({
  selector: 'app-snapshot-report',
  templateUrl: './snapshot-report.component.html',
  styleUrl: './snapshot-report.component.scss'
})
export class SnapshotReportComponent implements OnInit{
  
  classesArray: ClassAndStudents[] = [];
  studentsArray: string[] =[];
  reportsArray: any[];
  className: number;
  studentName : string;
  startDate: string = "2018-10-01";
  endDate: string = "2017-10-01";
  averageValues: number[];
  unassignedPercentage: number = 0;
  weakPercentage: number = 0;
  okPercentage: number = 0;
  goodPercentage: number = 0;
  excellentPercentage: number = 0;

  constructor(private snapshotReoprtsService:SnapshotReportsService){}

  ngOnInit(): void {
   this.getClassesAndStudents();
   this.getReports();
  }

  //Load the classes
  getClassesAndStudents(){
    this.snapshotReoprtsService.fetchClassesAndStudents().subscribe(
      (results) => {
       this.classesArray = results;
      }
    );
  }

  //Load the students after selecting a Class
  loadStudents(){ 
    this.studentsArray = [];
    this.studentName = null;
    this.studentsArray = (this.classesArray.filter(cls=> cls.id === this.className))[0].students;
    this.loadReports('class');
  }

  //Load the reports after selecting a class or student
  loadReports(type:string){
    let tempArray = [];
    switch(type){
    case 'class':
      this.reportsArray = this.snapshotReoprtsService.fetchReports2();
      this.studentsArray.forEach((student) =>{
        tempArray.push(...this.reportsArray.filter(s=> s.student ===student));
      });
      break;
      case 'student':
        tempArray.push(...this.reportsArray.filter(s=> s.student === this.studentName));
      break;
      default: tempArray = this.snapshotReoprtsService.fetchReports2();
    }
    this.reportsArray = tempArray;
    this.calculateProgress();
  }

  getReports(){
    this.reportsArray = this.snapshotReoprtsService.fetchReports2();
    this.calculateProgress();
    /* this.snapshotReoprtsService.fetchReports().subscribe(
      (results) => {
        this.reportsArray = results;
       
      }
    ); */
  }
//get the average of the marks.
  getAverage(values: number[]){
   let average = (values.reduce((a, b) => a + b, 0) / values.length) || 0;
  return average;
  }

  //find the latest date
  findDateOfAttempt(weeks: Date[]){
    let latest = weeks.reduce(function (r, a) {
      return r > a ? r : a;
  });

  }

  //calculate the progress for the progress bar
  calculateProgress(){
    let tempArray = [];
    this.reportsArray.forEach(item => {
     tempArray.push(this.getAverage(item.attempts.values));
    });
  this.excellentPercentage = this.findPercentage(90,100,tempArray);
  this.goodPercentage = this.findPercentage(80,90,tempArray);
   this.okPercentage = this.findPercentage(60,80,tempArray);
   this.weakPercentage = this.findPercentage(0,60,tempArray);
   this.unassignedPercentage = (100 - (this.excellentPercentage + this.goodPercentage + this.okPercentage + this.weakPercentage));
  }

  //find the percentatge for the progress bars.
  findPercentage(minValue: number, maxValue: number, values: number[]){
    let numberOfValues = values.length;
    let count =  values.filter(item =>(minValue <= item) && (item <= maxValue)).length;
    return (count/numberOfValues) * 100;
  }
}
