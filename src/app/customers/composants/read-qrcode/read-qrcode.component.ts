import {Component, OnInit} from '@angular/core';
import {DecryptDto} from '../../../model/decryptDto.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../services/auth.service';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-read-qrcode',
  standalone: false,
  templateUrl: './read-qrcode.component.html',
  styleUrl: './read-qrcode.component.css'
})
export class ReadQrcodeComponent implements OnInit {

  readCodeForm!: FormGroup;
  selectedFile: File | any;
  imagePreview: string | ArrayBuffer | null | undefined;
  valueFromQrCode: any;
  codeDecrypty: any;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private customerService:CustomerService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.readCodeForm = this.fb.group({
      fileName: ['', Validators.required],
    });

  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  private previewImage() {
    let reader = new FileReader();
    reader.onload = (event: Event) => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
    this.readCodeForm.patchValue({fileName: this.selectedFile.name});
  }


  readCode() {
    if (this.readCodeForm.valid) {
      let formData = new FormData();
      formData.append('img', this.selectedFile);

      this.customerService.readQrCode(formData).subscribe({
        next: data => {
          if (data) {
            this.valueFromQrCode = data;
          }
        }, error: (err: any) => {
          this.snackBar.open(' échec, réessayer'+err, 'close', {duration: 3000, panelClass: 'error-snackbar'});
        }
      })
    } else {
      for (let i in this.readCodeForm.controls) {
        this.readCodeForm.controls[i].markAsDirty();
        this.readCodeForm.controls[i].updateValueAndValidity();
      }
    }
  }

  testCode() {
    let decryptDto = new DecryptDto();
    decryptDto.userId = this.authService.userId;
    decryptDto.orderId = this.valueFromQrCode.commande;
    decryptDto.inputCode = this.valueFromQrCode.code;
    this.customerService.decryptKeyInQrCode(decryptDto).subscribe({
      next:data => {
        this.codeDecrypty = data
      }, error: (err: any) => {
        this.snackBar.open(' échec, réessayer'+err, 'close', {duration: 3000, panelClass: 'error-snackbar'});
      }
    })
  }
}
