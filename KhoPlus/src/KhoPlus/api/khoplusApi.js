import Config from '../config'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthStorageKey = 'AUTH_KHOPLUS';
let _authInfo = null;

async function GetAuthInfo(){
    let result = await AsyncStorage.getItem(AuthStorageKey);
    if(result){
        result = JSON.parse(result)
        const { login } = result || {}
        if(result?.auth?.access_token){
            _authInfo = {
                ...result.userInfo,
                login
            }
        }
        else{
            return{
                error:true,
                message:"Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại."
            }
        }
    }
    else{
        return{
            error:true,
            message:"Không lấy được thông tin, vui lòng đăng nhập lại."
        }
    }
    return _authInfo
}

async function LoginAuth(param){
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
                userInfo: data.user,
                login:{
                    phone:param?.phone
                }
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
    LoginAuth,
    GetAuthInfo
}