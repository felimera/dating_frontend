import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/core/models/assignment.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AssignmentService } from 'src/app/infrastructure/services/assignment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-card-dialog',
  templateUrl: './assignment-card-dialog.component.html',
  styleUrls: ['./assignment-card-dialog.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class AssignmentCardDialogComponent implements OnInit {

  assignment: Assignment | any;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AssignmentCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit(): void {
    this.assignmentService.getById(this.data.key).subscribe((res: any) => {
      this.assignment = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
