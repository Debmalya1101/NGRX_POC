import { signupStart } from './../state/auth.actions';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  
  signUpForm !: FormGroup;

  constructor(private store : Store<AppState>){}

  ngOnInit(): void {
    this.signUpForm = this.createForm();
  }
  

  createForm() : FormGroup{
    return new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
  }

  onSignUpClick(){
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({status : true}));
    this.store.dispatch(signupStart({email, password}));
  }
}
