import { autoLogout } from './../../../auth/state/auth.actions';
import { Observable } from 'rxjs';
import { isAuthenticated } from './../../../auth/state/auth.selectors';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isAuthenticated$ !: Observable<boolean>;

  constructor(private store : Store<AppState>){}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onLogOut(event : Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }



}
