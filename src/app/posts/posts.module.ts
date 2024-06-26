import { POSTS_STATE_NAME } from './state/posts.selectors';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { postsReducer } from './state/posts.reducer';

const routes: Routes = [
    {
        path: '',
        component: PostsListComponent,
        children: [
          {
            path: 'add',
            component: AddPostComponent
          },
          {
            path:'edit/:id',
            component:EditPostComponent
          }
        ]
      }
]

@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
        RouterModule.forChild(routes)
    ]
})
export class PostsModule {

}