import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  valid: boolean
}

@Component({
  selector: 'app-dialog-elements-dialog',
  templateUrl: './dialog-elements-dialog.component.html',
  styleUrls: ['./dialog-elements-dialog.component.css']
})

export class DialogElementsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogElementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onValid(): void {
    this.data.valid = true;
  }

  onNoClick(): void {
    this.data.valid = false;
  }
}
