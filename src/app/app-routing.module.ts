import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignmentComponent } from './modules/assignment/component/list-assignment/list-assignment.component';

const routes: Routes = [
  { path: "home", component: ListAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
