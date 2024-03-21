import AsyncStorage from '@react-native-async-storage/async-storage';

import key from 'keymirror';
import { put } from 'redux-saga/effects';

const typeSuffix = key({
    SUCCESS:null,
    ACTION_FAIL:null
})

export function* worker(data){
    console.log('worker', data);
    let  { type, payload, keyStore } = data
    if(keyStore){
        AsyncStorage.setItem(keyStore, JSON.stringify(payload.body))
    }

    try {
        yield put({
            type:type + "_" + typeSuffix.SUCCESS,
            payload
        })
    } catch (error) {
        console.warn("Error middleware", error)
        yield put({
            type: typeSuffix.ACTION_FAIL
        })
    }
}