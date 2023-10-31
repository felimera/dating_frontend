import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { ListAssignmentComponent } from './component/list-assignment/list-assignment.component';


@NgModule({
  declarations: [
    ListAssignmentComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
