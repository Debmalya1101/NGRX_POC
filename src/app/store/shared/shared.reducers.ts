import { Action, createReducer, on } from '@ngrx/store';
import { setLoadingSpinner, setErrorMessage } from './shared.actions';
import { initialState, SharedState } from './shared.state';

const _SharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner,(state, action)=>{
        return{
            ...state,
            showLoading : action.status,
        }
    }),
    on(setErrorMessage, (state, action)=>{
        return{
            ...state,
            errorMessage : action.message,
        }
    })
)

export function SharedReducer(state:SharedState | undefined, action : Action){
    return _SharedReducer(state, action);
}