import Config from '../config'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthStorageKey = 'AUTH_KHOPLUS';

async function GetTokent(){

}

async function GetAuthInfo(param){
    let response = await fetch(
        `https://${Config.apiHost}/api/auth/login`,
        {
            method:"POST",
            body: JSON.stringify(param),
            credentials: 'omit',
            headers: {
               "Content-Type": "application/json",
              },
        }
    )
    if(response?.status === 403){
        let data = {
            error: true,
            message: "Bạn không có quyền truy cập trang này",
            status: 403
        }
        return data
    }
    else{
        const dataJson = await response.json()
        if(dataJson?.data && dataJson?.success){
            const { data } = dataJson || {}
            const infoLogin = {
                auth: {access_token: data.access_token, token_type:data.token_type },
                userInfo: data.user
            };
            await AsyncStorage.setItem(AuthStorageKey, JSON.stringify(infoLogin));
            return data.user
        }
        else{
            return dataJson
        }
        
       
    }
    //return response.json()
}

export default {
    GetAuthInfo
}