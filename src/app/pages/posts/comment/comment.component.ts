import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor() {}
  @Input() comment: Comment = {
    name: '',
    id: 0,
    post_id: 0,
    email: '',
    body: '',
  };

  users!: User[] | null | undefined;
  @Input() user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
}
