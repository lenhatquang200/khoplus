import { takeEvery, takeLatest } from 'redux-saga/effects';

import { worker } from './worker';

export function* watcher(){
    yield takeEvery(aciton =>{
        console.log('takeEvery', aciton);
        let result = false;
        let checkType = aciton.type.indexOf('_SUCCESS') > -1 ||
                        aciton.type.indexOf('_FAIL') > -1 ||
                        aciton.type.indexOf('Navigation') > -1
            if(!checkType){
                if(aciton && aciton.payload){
                    return result = true
                }
            }
            return result
    }, worker)
}