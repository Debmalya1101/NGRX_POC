import { increment, decrement, reset, customIncrement, changeText } from './counter.actions';
import { initialState, CounterState } from './counter.state';
import { Action, createReducer, on } from "@ngrx/store";

const _counterReducer = createReducer(
    initialState,
    on((increment), (state) => {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }),
    on((decrement), (state) => {
        return {
            ...state,
            counter: state.counter - 1,
        };
    }),
    on((reset), (state) => {
        return {
            ...state,
            counter: 0,
        };
    }),
    on(customIncrement, (state, action) => {
        return {
            ...state,
            counter: state.counter + action.value,
        }
    }),
    on(changeText, (state) => {
        return {
            ...state,
            text: 'This is modified text',
        }
    })
)

export function counterReducer(state: CounterState | undefined, action: Action) {
    return _counterReducer(state, action);
}