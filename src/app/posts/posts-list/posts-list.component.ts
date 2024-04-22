import { getPosts } from './../state/posts.selectors';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Post } from './../../models/posts.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts !: Post[];
  public subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(getPosts).subscribe(data => {
        this.posts = data;
      })
    );
  }

  onDelete(postId: string){
    if(confirm('Are you you want to delete the post')){
      this.store.dispatch(deletePost({id : postId}));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs: Subscription) => {
      subs.unsubscribe();
    });
  }
}
