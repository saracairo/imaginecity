import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {

  /** Variabile di stato Spinner */
  loading: boolean = false;

  /** Variabili Form */
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  submitted = false;

  /** Data Variables */
  token!: string;
  user!: User;
  currentUser: User = {
    name: '',
    email: '',
    gender: '',
    status: 'active'
  };

  /** Variabile enum impostata di default su LOGIN */
  state = AuthenticatorCompState.REGISTER;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.clear();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      token: ['', [Validators.required, Validators.minLength(64)]],
    });
  }

  /* Funzione Login */
  login() {
    this.loading = true;

    localStorage.setItem('token', this.loginForm.value.token);

    const params = new HttpParams().set('email', this.loginForm.value.email);

    this.router.navigate(['/users-list']);
  }


  /** Funzioni Click */

  registerClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  loginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }


  /* Funzioni Submit Form */

  loginSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return;
    } else {
      this.login();
    }
  }

  registerSubmit() {
    this.loading = true;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.registerForm.value.token}`
    });

    this.httpClient.post<User>(
      `${environment.USERS_URL}`,
      {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        gender: this.registerForm.value.gender,
        status: 'active'
      },
      { headers }
    );

    this.openSnackBar('Registration completed! Now login to enter.', 'Ok');
    this.loginClick();
  }

  /** Funzioni di stato form */

  getStateTitle() {
    switch(this.state) {
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
    }
  }
  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }


  /** Funzione snackbar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }


  // openDialog() {
  //     this.dialogRef = this.dialog.open(this.loginDialog, {
  //       data: this.dialogWindow,
  //     });
  //     this.dialogRef.afterClosed().subscribe(() => {
  //       console.log('The Info dialog was closed.');
  //     });
  // }

}

// Definizione di enum: valori a cui verrà assegnato un contenuto da mostrare tramite la direttiva ngIf: (sostituire con oggetto? https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh)
export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
}
