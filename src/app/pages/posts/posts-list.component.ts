import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  havePosts: boolean = true;
  loading!: boolean;
  posts: Post[] = [];
  post: Post = {
    id: 0,
    user_id: 0,
    title: '',
    body: '',
  };
  user?: User;
  allPosts!: Post[] | null;

  hide: boolean = true;


  allPostComments: Comment[] = [];
  addingComment!: FormGroup;


  pagesTotalNumber!: string;
  pagesNumber: string = '10';
  search?: string;
  loadingPosts: boolean = true;


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

  /** Variabile stato apertura finestra NewPost */
  shouldOpen: boolean = false;

  constructor(
    private usersService: UsersService,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.getAllPosts(this.pageIndex, this.pageSize);
  }

  getAllPosts(pageIndex: number, pageSize: number) {
    this.loading = true;
    this.postService.getAllPosts(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.allPosts = data.body;
        this.length = data.headers.get('x-pagination-total');
        this.loading = false;
      },
    })
  }
  /** Paginator Functions */
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllPosts(this.pageIndex, this.pageSize);
  }

  onSubmitComment() {
    const currentUser: any = localStorage.getItem('user');
    const user = JSON.parse(currentUser);
    const userName = user.name;
    const userEmail = user.email;

    // this.commentsService
    //   .postNewComment(
    //     this.post.id,
    //     userName,
    //     userEmail,
    //     this.addingComment.value.comment
    //   )
  }

  /** New Post Functions */
  toggleNewPostWindow() {
    this.shouldOpen = !this.shouldOpen;
  }

}
