import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataGenericDTO } from 'src/app/infrastructure/dto/dialog-data-generic.dto';

@Component({
  selector: 'app-dialog-elements-dialog',
  templateUrl: './dialog-elements-dialog.component.html',
  styleUrls: ['./dialog-elements-dialog.component.css']
})

export class DialogElementsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataGenericDTO,
  ) { }

  onValid(): void {
    this.data.valid = true;
  }

  onNoClick(): void {
    this.data.valid = false;
  }
}
