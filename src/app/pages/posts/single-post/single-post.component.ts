import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';
import { UsersService } from 'src/app/services/users.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {

  @ViewChild('commentInput') commentInput!: ElementRef;
  @Input() post: Post = {
    id: 0,
    user_id: 0,
    title: '',
    body: '',
  };

  user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };

  hide: boolean = true;
  hasComment: boolean = true;
  comments: Comment[] = [];
  addingComment!: FormGroup;

  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    this.addingComment = new FormGroup({
      comment: new FormControl(),
    });

    this.usersService.getUser(this.post.user_id).subscribe({
      next: (res) => {
        this.user.name = res.name;
      },
      error: (err) => {
        if (err.status === 404) {
          this.user.name = 'Unknown user';
        }
      },
    });

    this.loadComments();
  }

  loadComments() {
    this.commentsService.getPostComments(this.post.id).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.hasComment = false;
          return;
        }
        this.comments = [...res];
      },
      error: (err) => {
        console.error(`Comment error: ${err.message}`);
      },
    });
  }

  // onSubmitComment() {
  //   const currentUser: any = localStorage.getItem('user');
  //   const user = JSON.parse(currentUser);
  //   const userName = user.name;
  //   const userEmail = user.email;

  //   this.commentsService
  //     .postNewComment(
  //       this.post.id,
  //       userName,
  //       userEmail,
  //       this.addingComment.value.comment
  //     );
  //   this.comments.push({
  //     id: 0,
  //     post_id: this.post.id,
  //     name: userName,
  //     email: userEmail,
  //     body: this.addingComment.value.comment,
  //   });
  //   this.hasComment = true;
  //   this.hide = false;
  //   this.addingComment.reset();
  //   this.commentInput.nativeElement.blur();
  // }
}
