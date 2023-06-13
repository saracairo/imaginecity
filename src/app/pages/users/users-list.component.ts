import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };

  @Output() updateUser: EventEmitter<number> = new EventEmitter<number>();
  sendUserData() {
    this.usersService.selectedUser = this.user;
  }

  haveUsers: boolean = true;
  loading: boolean = false;
  searchUserForm!: FormGroup;
  users!: User[] | null | undefined;

  /** Variabili paginator */
  length!: string | null;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  shouldOpen = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }



  /** Funzione che apre creazione new user */
  getStartedClick() {
    this.shouldOpen = true;
  }

  ngOnInit(): void {
    this.loading = true;
    this.searchUserForm = new FormGroup({
      keyword: new FormControl(),
      typeOfSearch: new FormControl('name'),
    });
    this.getAllUsers(this.pageIndex, this.pageSize);
    this.route.snapshot.paramMap.get('id');
  }

  /** Funzioni paginator */
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllUsers(this.pageIndex, this.pageSize);
  }

  getAllUsers(pageIndex: number, pageSize: number) {
    this.loading = true;
    this.usersService.getAllUsers(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        this.users = data.body;
        this.length = data.headers.get('x-pagination-total');
      },
    })
  }

  updateUserView(e: number) {
    this.users = this.users?.filter((user) => user.id !== e);
  }

}
