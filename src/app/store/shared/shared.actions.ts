import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERRORMESSAGE_ACTION = "[shared state] set error message";

export const setLoadingSpinner = createAction(
    SET_LOADING_ACTION,
    props<{ status: boolean }>(),
);

export const setErrorMessage = createAction(
    SET_ERRORMESSAGE_ACTION,
    props<{ message: string }>()
);