import { updatePost } from './../state/posts.action';
import { getPostById } from './../state/posts.selectors';
import { Post } from './../../models/posts.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{

  post!:Post;
  postForm !:FormGroup;

  constructor(private route: ActivatedRoute,private router:Router, private store:Store<AppState>){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id')!;
      this.store.select(getPostById, {id:id}).subscribe(data=>{
        this.post = data;
        this.createForm();
      })
    })
  }

  createForm(){
    this.postForm = new FormGroup({
      title : new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(5)
      ]),
      description : new FormControl(this.post.description,[
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


  onUpdatePost(){

    const title = this.postForm.value?.['title'];
    const description = this.postForm.value?.['description'];

    const post:Post = {
      id: this.post.id,
      title: title,
      description: description
    }
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['/posts']);
  }
}
