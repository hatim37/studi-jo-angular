import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../services/snackbar.service';
import {CartService} from '../services/cart.service';
import {CaddiesService} from '../services/caddies.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  mode:number=0;
  loginForm!: FormGroup;
  passwordForm!: FormGroup;
  hidePassword = true;
  messageError!:string;
  valueBackend:any;
  optionError: any;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackbarService:SnackbarService,
              private cartService: CartService,
              private caddyService: CaddiesService,) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      password: ['', Validators.required],
    })
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
    })
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    let email = this.loginForm.value.email;
    let password =this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: value => {
        this.valueBackend = value;
        //on charge les informations depuis le token + archive du token en storage
        this.authService.loadProfile(value);
        this.cartService.getSizeCaddy();
        //recherche si panier pour envoi backend :
        if (this.caddyService.getCurrentCaddy().items.size > 0) {
          this.cartService.sendCaddyInBackend();
          this.cartService.getSizeCaddy();
          this.snackbarService.openValidationDialog("Authentification réussie", 200, 1500, '/', 'green');
        } else {
          this.snackbarService.openValidationDialog("Authentification réussie", 200, 1500, '/', 'green');
        }
      }, error: (err: any) => {
        console.log(err);
        this.messageError = err.error.error;
        this.optionError = err.error.option;
        if(this.messageError == "Compte non activé" || this.messageError == "Nouvel appareil détecté"){
          this.router.navigate(['/validation'], {
            state: { email: email, optionId : this.optionError, message: this.messageError, uuid: err.error.uuid}
          });
        }
      }
    });
  }

}
