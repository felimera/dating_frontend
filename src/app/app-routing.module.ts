import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignmentComponent } from './modules/assignment/component/list-assignment/list-assignment.component';
import { UserLoginComponent } from './modules/user/component/user-login/user-login.component';
import { UserCreateComponent } from './modules/user/component/user-create/user-create.component';
import { AppointmentCreateComponent } from './modules/appointment/component/appointment-create/appointment-create.component';
import { AppointmentConfirmComponent } from './modules/appointment/component/appointment-confirm/appointment-confirm.component';
import { AppointmentEditComponent } from './modules/appointment/dialog/appointment-edit/appointment-edit.component';
import { UserEditComponent } from './modules/user/component/user-edit/user-edit.component';
import { UserPasswordComponent } from './modules/user/component/user-password/user-password.component';
import { AppointmentReviewComponent } from './modules/appointment/component/appointment-review/appointment-review.component';

const routes: Routes = [
  { path: "home", component: ListAssignmentComponent },
  { path: "login", component: UserLoginComponent },
  { path: "user-create", component: UserCreateComponent },
  { path: "user-edit", component: UserEditComponent },
  { path: "user-password", component: UserPasswordComponent },
  { path: "appointment-create", component: AppointmentCreateComponent },
  { path: "appointment-confirm", component: AppointmentConfirmComponent },
  { path: "appointment-review", component: AppointmentReviewComponent },
  { path: "appointment-edit-dialog", component: AppointmentEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
