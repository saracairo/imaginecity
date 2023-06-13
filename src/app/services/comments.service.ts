import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Comment } from '../models/Comment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getPostComments(post_id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${environment.POSTS_URL}/${post_id}/comments`
    )
    .pipe(catchError(
      (err) => {
        return throwError(() => err);
      }
    ));
  }

  postNewComment(
    postId: number,
    userName: string,
    userEmail: string,
    comment: string
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.POSTS_URL}/${postId}/comments`, {
        post_id: postId,
        name: userName,
        email: userEmail,
        body: comment,
      }
    )
    .pipe(catchError(
      (err) => {
        return throwError(() => err);
      }
    ))
  }

}
