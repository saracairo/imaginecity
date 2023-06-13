import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts(page: number, perPage: number): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(
      `${environment.POSTS_URL}?page=${page}&per_page=${perPage}`,
      { observe: 'response' }
    );
  }

  getAllPostSize(url: string) {
    return this.http.get(url, {
      observe: 'response',
    });
  }

  getUserPosts(user_id: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.USERS_URL}/${user_id}/posts`
    )
  }

  newPost(id: number, title: string, body: string) {
    return this.http.post(
      `${environment.POSTS_URL}/${id}/posts`,
      { title: title, body: body }
      )
      .pipe(catchError(
        (err) => {
          return throwError(() => err);
        })
      );
  }
}
