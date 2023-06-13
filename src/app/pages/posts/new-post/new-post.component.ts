import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/Post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @Output() shouldOpen = new EventEmitter<boolean>();

  /** Variabile di stato Spinner */
  loading: boolean = false;

  /** Variabili Form */
  newPostForm!: FormGroup;
  submitted = false;

  newPost: Post = {
    title: '',
    body: '',
    user_id: 0,
    id: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private _snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  publishPost() {
    this.loading = true;
    const id: any = localStorage.getItem('user_id');
    this.postService.newPost(id, this.newPostForm.value.title, this.newPostForm.value.body);
    this.submitted = true;
    this.closeNewPostWindow(false);
    this.openSnackBar('Your post has been published!', 'Ok');
  }

  /** Funzione snackbar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  closeNewPostWindow(value: boolean) {
    this.shouldOpen.emit(value);
  }
}
