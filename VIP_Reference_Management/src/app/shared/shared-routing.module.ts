import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { InitiatorFormComponent } from './pages/initiator-form/initiator-form.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"dashboard",
    component:LayoutComponent,
    children:[
      { path: '', component:DashboardComponent },
      { path: 'desktop', component: DesktopComponent },
      { path: 'add-reference', component: InitiatorFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
