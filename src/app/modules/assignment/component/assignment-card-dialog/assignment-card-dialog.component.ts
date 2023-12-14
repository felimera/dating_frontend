import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AssignmentService } from 'src/app/infrastructure/services/assignment.service';
import { CommonModule } from '@angular/common';
import { AssignmentDTO } from 'src/app/infrastructure/dto/assignment.dto';

@Component({
  selector: 'app-assignment-card-dialog',
  templateUrl: './assignment-card-dialog.component.html',
  styleUrls: ['./assignment-card-dialog.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class AssignmentCardDialogComponent implements OnInit {

  assignment: AssignmentDTO | undefined;

  constructor(
    public dialogRef: MatDialogRef<AssignmentCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit(): void {
    this.assignmentService.getById(this.data.key)
      .subscribe({
        next: (res: AssignmentDTO) => {
          this.assignment = res;
        },
        error: error => console.log(error)
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
