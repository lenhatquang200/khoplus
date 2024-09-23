import { keyStore } from "public";
import Config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const isDev = process.env.NODE_ENV === "development";

export const AuthStorageKey = "AUTH_KHOPLUS";
let _authInfo = null;
let _urlDomain = null

async function getUrl() {
  const resLocal = await AsyncStorage.getItem(keyStore.domainName)
  console.log('resLocal', resLocal);
  if(resLocal){
      const dataLogin = JSON.parse(resLocal)
      _urlDomain = dataLogin?.domainUser
      return dataLogin?.domainUser
  }
}

async function GetAuthInfo() {
  let urlHost = _urlDomain ? _urlDomain : await getUrl()
  
  let result = await AsyncStorage.getItem(AuthStorageKey);
  if (result) {
    result = JSON.parse(result);
    if (result?.auth?.access_token) {
      return result;
    }
    let refresh_token = null
    try {
      refresh_token = await fetch(`${urlHost}/auth/refresh-token`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${result?.auth?.access_token}`,
          'Cache-Control': 'no-cache',  // Không lưu trữ cache
          'Pragma': 'no-cache', 
        },
      })
    } catch (error) {
      console.log('GetAuthInfo error', error);
    }
    
    if (refresh_token?.status === 200) {
      refresh_token = await refresh_token.json();
      if (refresh_token?.data?.token) {
        const { token, user } = refresh_token?.data;
        const infoLogin = {
          auth: { access_token: token, token_type: "Bearer" },
          userInfo: user,
          login: {
            phone: user?.phone,
          },
        };
        await AsyncStorage.setItem(AuthStorageKey, JSON.stringify(infoLogin));
        return infoLogin;
      }
    } else {
      AsyncStorage.removeItem(AuthStorageKey);
      let data = {
        error: true,
        message: "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại",
        status: 400,
      };
      return data;
    }
  } else {
    AsyncStorage.removeItem(AuthStorageKey);
    let data = {
      error: true,
      message: "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại",
      status: 400,
    };
    return data;
  }
}

async function LoginAuth(param, domainUser) {
     
     let response = null
     try {
      response = await fetch(`${domainUser}/auth/login`, {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',  // Không lưu trữ cache
          'Pragma': 'no-cache', 
        },
      }).catch(error => {
        console.log('error', error)
        response = null  // Bắt lỗi và log ra
      });
     } catch (error) {
      console.log('error', error)
      response = null
     }
  console.log(
    ` => ${response.status} ---- ${response.url}`
  );
  if (response?.status === 403) {
    let data = {
      error: true,
      message: "Bạn không có quyền truy cập trang này",
      status: 403,
    };
    return data;
  } else if (response?.status === "error") {
    let data = {
      error: true,
      message: "Đăng nhập thất bại",
      status: 400,
    };
    return data;
  } else if (response?.status === 200) {
    const dataJson = await response.json();
    if (dataJson?.data) {
      const { user, token } = dataJson?.data || {};
      const infoLogin = {
        auth: { access_token: token, token_type: "Bearer" },
        userInfo: user,
        login: {
          phone: user?.phone,
          domainUser
        },
      };
      await AsyncStorage.setItem(AuthStorageKey, JSON.stringify(infoLogin));
      return infoLogin;
    } else {
      let data = {
        error: true,
        message: "Đăng nhập thất bại",
        status: 400,
      };
      return data;
    }
  } else {
    let data = {
      error: true,
      message: "Đăng nhập thất bại",
      status: 400,
    };
    return data;
  }
}

async function LogOut() {
  _authInfo = null;
  await AsyncStorage.removeItem(AuthStorageKey);
  await AsyncStorage.clear()
}

async function GetAccessToken() {
  let result = await AsyncStorage.getItem(AuthStorageKey);
  if (result) {
    result = JSON.parse(result);
    return result;
  } else {
    return null;
  }
}

async function CallApi(patch, method, body) {
  let urlHost = _urlDomain ? _urlDomain : await getUrl()
  let authInfo = await GetAccessToken();
  if (authInfo === null) {
    await LogOut();
    return { error: true, message: "Get access token fail" };
  }

  if (!method) method = "GET";
  let header = null;
  let token = authInfo?.auth?.access_token;
  header = {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      'Cache-Control': 'no-cache',  // Không lưu trữ cache
      'Pragma': 'no-cache', 
    },
  };
  const url = `${urlHost}${patch}`
  let response = await fetch(url, header);
  console.log('response', response);
  
  if (isDev) {
    console.log(`===${response.status}=== ${response.url}`);
  }
  return await response.json();
}

export default {
  LoginAuth,
  GetAuthInfo,
  LogOut,
  CallApi,
};
