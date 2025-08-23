import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


export interface ConfirmationDialogData {
  message?: string;
  okLabel?: string;
  title?: string;
  cancelLabel?: string;
}

const defaultDialogData: ConfirmationDialogData = {
  message: 'Are you sure?',
  okLabel: 'Yes',
  title: 'Confirmation',
  cancelLabel: 'No'
};

@Component({
  selector: 'app-confirmation',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  readonly dialogData: ConfirmationDialogData = inject(MAT_DIALOG_DATA);
  data!: ConfirmationDialogData;
  readonly dialogRef = inject(MatDialogRef<ConfirmationComponent>);

  ngOnInit(): void {
    this.data = {
      ...defaultDialogData,
      ...this.dialogData,
    }
  }
}
