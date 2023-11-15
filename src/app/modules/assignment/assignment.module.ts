import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
// import { AssignmentCardDialogComponent } from './component/assignment-card-dialog/assignment-card-dialog.component';
// import { ListAssignmentComponent } from './component/list-assignment/list-assignment.component';


@NgModule({
  declarations: [
    // ListAssignmentComponent

    // AssignmentCardDialogComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
