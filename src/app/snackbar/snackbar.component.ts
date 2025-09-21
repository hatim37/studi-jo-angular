import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-snackbar',
  standalone: false,
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, color: string }) {
  }

}
