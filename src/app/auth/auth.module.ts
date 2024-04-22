import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes : Routes = [
    {
        path:'',
        // component:LoginComponent
        children:[
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },
            {
                path:'login',
                component:LoginComponent
            },
            {
                path:'signup',
                component: SignupComponent
            }
        ]
    }
]

@NgModule({
    declarations:[
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EffectsModule.forFeature(),
        RouterModule.forChild(routes),
    ]
})
export class AuthModule{}