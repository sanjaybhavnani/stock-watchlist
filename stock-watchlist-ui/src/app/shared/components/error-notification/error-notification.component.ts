import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-notification',
  imports: [MatSnackBarModule, MatButtonModule],
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.scss'
})
export class ErrorNotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
  
}
