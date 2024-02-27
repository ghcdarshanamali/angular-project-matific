import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { SnapshotReportComponent } from './modules/snapshot-report/snapshot-report.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DropDownDirective } from './core/directives/drop-down.directive';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './modules/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SnapshotReportComponent,
    HomeComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    DropDownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
