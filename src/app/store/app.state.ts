import { AuthState } from './../auth/state/auth.state';
import { AUTH_STATE_NAME } from './../auth/state/auth.selectors';
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedReducer } from './shared/shared.reducers';
import { AuthReducer } from '../auth/state/auth.reducer';

export interface AppState{
    [SHARED_STATE_NAME] : SharedState,
    [AUTH_STATE_NAME] : AuthState,
}

export const appReducer = {
    [SHARED_STATE_NAME] : SharedReducer,
    [AUTH_STATE_NAME] : AuthReducer,
}