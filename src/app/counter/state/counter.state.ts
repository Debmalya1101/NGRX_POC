export interface CounterState{
    counter:number;
    text: string;
}

export const initialState : CounterState = {
    counter : 0,
    text : 'This is initial text',
}