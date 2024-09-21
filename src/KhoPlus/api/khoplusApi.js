import Config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const isDev = process.env.NODE_ENV === "development";
const host_url = Config.apiHost;

export const AuthStorageKey = "AUTH_KHOPLUS";
let _authInfo = null;

async function GetAuthInfo() {
  let result = await AsyncStorage.getItem(AuthStorageKey);

  if (result) {
    result = JSON.parse(result);
    let refresh_token = await fetch(`${host_url}/auth/refresh-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${result?.auth?.access_token}`,
      },
    });
    if (result?.auth?.access_token) {
      return result;
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

async function LoginAuth(param) {
  let response = await fetch(`${host_url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
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
  //return response.json()
}

async function LogOut() {
  _authInfo = null;
  await AsyncStorage.removeItem(AuthStorageKey);
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

async function CallApi(url, method, body) {
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
    },
  };
  let response = await fetch(url, header);
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
