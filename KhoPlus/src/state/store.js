import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';

import createSagaMidleware from 'redux-saga';
import rootSaga from './middleware';

const sagaMiddleware = createSagaMidleware();

const store = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store;