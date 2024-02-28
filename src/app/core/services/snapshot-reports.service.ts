import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassOfStudents } from '../models/class.model';
import { Observable, map, take } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SnapshotReportsService {
  public CLASS_STUDENTS_URL: string =
    'https://ljifg6p8cd.execute-api.us-east-1.amazonaws.com/production/matific-test-classes';

  constructor(private http: HttpClient, private location: Location) {}

  public fetchClassesAndStudents(): Observable<ClassOfStudents[]> {
    return this.http.get<ClassOfStudents[]>(this.CLASS_STUDENTS_URL);
  }

  public fetchReports(): Observable<Report[]> {
    return this.http
      .get<Report[]>(
        this.location.prepareExternalUrl('assets/jsons/reports.json')
      )
      .pipe(map((result: any) => result.reports));
  }
}
