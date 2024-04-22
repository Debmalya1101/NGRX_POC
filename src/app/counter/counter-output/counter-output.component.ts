import { AppState } from './../../store/app.state';
import { getCounter } from './../state/counter.selectors';
import { CounterState } from './../state/counter.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

  counter!:any;
  count:number=0;
  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getCounter).subscribe(data=>{
      this.counter = data;
    })
  }

}
