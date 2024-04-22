import { autoLogin } from './auth/state/auth.actions';
import { getLoading, getErrorMessage } from './store/shared/shared.selectors';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NGRX_COUNTER';
  showLoading !: boolean;
  errorMessage !: string;

  constructor(private store : Store<AppState>){}

  ngOnInit(): void {
    this.store.select(getLoading).subscribe(data=>{
      this.showLoading = data;
    });
    this.store.select(getErrorMessage).subscribe(data=>{
      this.errorMessage = data;
    });
    this.store.dispatch(autoLogin());
  }
}
