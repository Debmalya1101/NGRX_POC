import { AppState } from './../../store/app.state';
import { getText } from './../state/counter.selectors';
import { changeText, customIncrement } from './../state/counter.actions';
import { CounterState } from './../state/counter.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit{

  value!:number;
  displayText !: string;

  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.select(getText).subscribe(data=>{
      this.displayText = data;
    })
  }

  onAdd(){
    this.store.dispatch(customIncrement({value: +this.value}));
  }

  onClickChangeText(){
    this.store.dispatch(changeText());
  }

}
