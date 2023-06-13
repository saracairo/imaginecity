import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsListComponent } from './pages/posts/posts-list.component';
import { UsersListComponent } from './pages/users/users-list.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { NewPostComponent } from './pages/posts/new-post/new-post.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { SinglePostComponent } from './pages/posts/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'posts-list',
    component: PostsListComponent,
    children: [
      { path: 'post/:id', component: SinglePostComponent },
      { path: 'new-post', component: NewPostComponent }
    ]
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    children: [
      { path: 'user/:id', component: UserDetailsComponent },
      { path: 'new-user', component: NewUserComponent}
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
