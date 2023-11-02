import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignmentComponent } from './modules/assignment/component/list-assignment/list-assignment.component';
import { UserLoginComponent } from './modules/user/component/user-login/user-login.component';

const routes: Routes = [
  { path: "home", component: ListAssignmentComponent },
  { path: "login", component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
