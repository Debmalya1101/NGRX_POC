import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { addPost, deletePost, updatePost } from './posts.action';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state, action) => {
        let posts = [...state.posts];
        let updatedPost = { ...action.post }
        let updatedPosts = posts.map(post => {return post.id === updatedPost.id ? { ...updatedPost } : post })
        return {
            ...state,
            posts: [...updatedPosts],
        }
    }),
    on(deletePost, (state, action)=>{
        let posts = [...state.posts];
        let updatedPosts = posts.filter(post => {return post.id !== action.id});
        return{
            ...state,
            posts : [...updatedPosts],
        }
    })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state, action);
}