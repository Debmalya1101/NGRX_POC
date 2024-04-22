import { autoLogout } from './../auth/state/auth.actions';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval: any;

  constructor(private http: HttpClient, private store : Store<AppState>) { }

  login(email: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`, { email, password, returnSecureToken: true });
  }

  signUp(email: string, password: string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`, { email, password, returnSecureToken: true });
  }

  formatUser(data : AuthResponseData){
    const expirationDate = new Date( new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message :string){
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';

      case 'INVALID_PASSWORD':
        return 'Invalid Password';
        
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account';
    
      default:
        return 'Unknown Error Occured! Please try again later.';
    }
  }

  setUserInLocalStorage(user : User){
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);    
  }

  runTimeoutInterval(user:User){
    const startDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - startDate;

    this.timeoutInterval = setTimeout(()=>{
      //logout functionality or get the refresh token
      this.store.dispatch(autoLogout());
    }, timeInterval)
  }

  getUserFromLocalStorage(){
    const userDataString = localStorage.getItem('userData');
    if(userDataString){
      const userData = JSON.parse(userDataString);
      const user = new User(userData.email, userData.token, userData.localId, new Date(userData.expirationDate));
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
