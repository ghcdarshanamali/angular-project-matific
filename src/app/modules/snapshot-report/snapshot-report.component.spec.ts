import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotReportComponent } from './snapshot-report.component';

describe('SnapshotReportComponent', () => {
  let component: SnapshotReportComponent;
  let fixture: ComponentFixture<SnapshotReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnapshotReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnapshotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
