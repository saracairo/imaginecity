import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activateRoute.snapshot.paramMap.get('id');
  }
  @Input() user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
  @Output() updateUser: EventEmitter<number> = new EventEmitter<number>();
  sendUserData() {
    this.userService.selectedUser = this.user;
  }
  // deleteUser() {
  //   let dialogRef = this.dialogService.drawDialog(this.dialog, {
  //     title: 'Cancella Utente',
  //     body: `Vuoi cancellare l'utente?`,
  //     isDenialNeeded: true,
  //   });
  //   dialogRef.afterClosed().subscribe((data) => {
  //     if (data) {
  //       this.usersService.deleteUser(this.user.id).subscribe({
  //         next: () => {
  //           this.updateUser.emit(this.user.id);
  //           this.dialogService.drawDialog(this.dialog, {
  //             title: `Utente eliminato`,
  //             body: '',
  //             isDenialNeeded: false,
  //           });
  //         },

  //       });
  //     }
  //   });
  // }
}
