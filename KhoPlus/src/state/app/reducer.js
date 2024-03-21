import InitialState from './initialState';
import types from './types';

function createReducer(initialState, reducerMap){
    return(state = initialState, action) =>{
        const reducer = reducerMap[action.type]
        return reducer ? reducer(state, action.payload, action.param, action) : state
    }
}

const initialState = new InitialState();

export default createReducer(initialState, {
    [types.AUTH_APP_SUCCESS] : (state, data) =>{
        return state.set('authApp', data.body)
    },
    
})