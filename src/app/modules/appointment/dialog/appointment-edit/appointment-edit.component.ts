import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<AppointmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  ngOnInit(): void {
    console.log('this.data.key ',this.data.key)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
