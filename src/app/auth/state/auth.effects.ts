import { Router } from '@angular/router';
import { setErrorMessage, setLoadingSpinner } from './../../store/shared/shared.actions';
import { AuthResponseData } from './../../models/AuthResponseData.model';
import { loginStart, loginSuccess, signupStart, signupSuccess, autoLogin, autoLogout } from './auth.actions';
import { AuthService } from './../../services/auth.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class AuthEffects{

    constructor(
        private action$ : Actions, 
        private authService : AuthService, 
        private store : Store<AppState>,
        private router : Router
    ){}

    login$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action)=>{
                return this.authService.login(action.email, action.password).pipe(
                    map(
                        (data : AuthResponseData)=>{
                            this.store.dispatch(setLoadingSpinner({status:false}));
                            this.store.dispatch(setErrorMessage({message : ''}));
                            const user = this.authService.formatUser(data);
                            this.authService.setUserInLocalStorage(user);
                            return loginSuccess({user : user, redirect : true});
                        }
                    ),
                    catchError((errResp)=>{
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        const errMessage = this.authService.getErrorMessage(errResp.error.error.message);
                        return of(setErrorMessage({message : errMessage}));
                    })
                )
            })
        )
    })

    loginRedirect$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action)=>{
                if(action.redirect){
                    this.router.navigate(['/']);
                }
            })
        )
    }, {dispatch:false})

    signUp$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action)=>{
                return this.authService.signUp(action.email, action.password).pipe(
                    map((data : AuthResponseData)=>{
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        this.store.dispatch(setErrorMessage({message : ''}));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({user : user, redirect : true});
                    }),
                    catchError((errResp)=>{
                        this.store.dispatch(setLoadingSpinner({status:false}));
                        const errMessage = this.authService.getErrorMessage(errResp.error.error.message);
                        return of(setErrorMessage({message : errMessage}));
                    })
                )
            })
        )
    })

    // signUpRedirect$ = createEffect(()=>{
    //     return this.action$.pipe(
    //         ofType(signupSuccess),
    //         tap((action)=>{
    //             this.router.navigate(['/']);
    //         })
    //     )
    // }, {dispatch:false})

    autoLogin$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(autoLogin),
            mergeMap((action)=>{
                const user = this.authService.getUserFromLocalStorage()!;
                return of(loginSuccess({user : user, redirect : false}))
            })
        )
    });

    autoLogout$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(autoLogout),
            map((action)=>{
                this.authService.logout();
                this.router.navigate(['auth']);
            })
        )
    }, {dispatch : false})
}