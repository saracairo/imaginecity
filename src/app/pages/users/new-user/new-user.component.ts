import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserBody } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  loading: boolean = false;
  newUserForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required]
    });
  }

  submitNewUser() {
    this.loading = true;
    const user: UserBody = {
      name: this.newUserForm.value.name,
      email: this.newUserForm.value.name,
      gender: this.newUserForm.value.gender,
      status: 'active'
    };

    this.userService.newUser(user).subscribe({
      next: () => {
        this.loading = false;
        this.openSnackBar('New user created successfully!', 'Ok');
      }
    });
  }

  /** Funzione snackbar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

}
