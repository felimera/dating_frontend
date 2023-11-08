import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignmentComponent } from './modules/assignment/component/list-assignment/list-assignment.component';
import { UserLoginComponent } from './modules/user/component/user-login/user-login.component';
import { UserCreateComponent } from './modules/user/component/user-create/user-create.component';
import { AppointmentCreateComponent } from './modules/appointment/component/appointment-create/appointment-create.component';

const routes: Routes = [
  { path: "home", component: ListAssignmentComponent },
  { path: "login", component: UserLoginComponent },
  { path: "user-create", component: UserCreateComponent },
  { path: "appointment-create", component: AppointmentCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
