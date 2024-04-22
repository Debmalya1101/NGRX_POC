import { Router } from '@angular/router';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/posts.model';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  
  postForm !:FormGroup;

  constructor(private store : Store<AppState>, private router : Router){}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title : new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      description : new FormControl(null,[
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  public get titleErrorMessage():string{
    const descriptionFormControl = this.postForm.get('title');
    if(descriptionFormControl?.touched && descriptionFormControl.invalid){
      if(descriptionFormControl.errors?.['required']){
        return 'Title is required';
      }
      if(descriptionFormControl.errors?.['minlength']){
        return 'Title should be minimum 5 characters length';
      }
    }
    return '';
  }

  public get descriptionErrorMessage():string{
    const descriptionFormControl = this.postForm.get('description');
    if(descriptionFormControl?.touched && descriptionFormControl.invalid){
      if(descriptionFormControl.errors?.['required']){
        return 'Description is required';
      }
      if(descriptionFormControl.errors?.['minlength']){
        return 'Description should be minimum 10 characters length';
      }
    }
    return '';
  }

  onAddPost(){

    const post : Post ={
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    }

    this.store.dispatch(addPost({post:post}));
    this.router.navigate(['posts']);
  }

}
