import { COUNTER_STATE_NAME } from './state/counter.selectors';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { counterReducer } from './state/counter.reducer';


const routes: Routes = [
    {
        path: '',
        component: CounterComponent
    }
]

@NgModule({
    declarations: [
        CounterComponent,
        CounterOutputComponent,
        CounterButtonsComponent,
        CustomCounterInputComponent,
    ],
    imports: [
        RouterModule,
        FormsModule,
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
        RouterModule.forChild(routes)
    ]
})
export class CounterModule {
}