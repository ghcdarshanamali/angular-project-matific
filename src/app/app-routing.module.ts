import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnapshotReportComponent } from './modules/snapshot-report/snapshot-report.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { IsAuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'snapshot-reports', component: SnapshotReportComponent,  canActivate: [IsAuthGuard]},
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
