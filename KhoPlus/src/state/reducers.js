import { combineReducers } from 'redux';
import app from './app/reducer';

const appReducer = combineReducers({
    app,
});

const rootReducer = (state, action) => {
    if(action.type == "USER_LOGOUT"){
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;