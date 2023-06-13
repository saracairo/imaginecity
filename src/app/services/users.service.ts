import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User, UserBody } from '../models/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  selectedUser!: User;

  constructor(private http: HttpClient) { }

  getAllUsers(page: number, perPage: number): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(`${environment.USERS_URL}?page=${page}&per_page=${perPage}`, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.USERS_URL}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  newUser(user: UserBody): Observable<User> {
    return this.http.post<User>(`${environment.USERS_URL}`, user).pipe(
      catchError((err) => {
        return throwError(() => new err());
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.USERS_URL}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
