import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser!: User[];
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isLogged.asObservable();
  }

  checkUser(params: HttpParams): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.USERS_URL}`,
      { params },
    )
  }

  login() {
    this.isLogged.next(true);
    this.router.navigate(['users-list']);
  }

  logout() {
    this.isLogged.next(false);
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
