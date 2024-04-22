import { setLoadingSpinner } from './../../store/shared/shared.actions';
import { loginStart } from './../state/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm !: FormGroup;

  constructor(private store : Store<AppState>){}
  
  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  createForm() : FormGroup{
    return new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
  }

  onLoginClick(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    // this.authService.login(email,password).subscribe(data =>{
    //   console.log(data);
    // })
    this.store.dispatch(setLoadingSpinner({status : true}));
    this.store.dispatch(loginStart({email, password}));

  }
}
