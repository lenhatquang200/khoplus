import Config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const isDev = process.env.NODE_ENV === "development";

export const AuthStorageKey = "AUTH_KHOPLUS";
let _authInfo = null;

async function GetAuthInfo() {
    let result = await AsyncStorage.getItem(AuthStorageKey);
    if (result) {
        result = JSON.parse(result);
        const { login } = result || {};
        if (result?.auth?.access_token) {
            _authInfo = {
                ...result,
                login,
            };
        } else {
            return {
                error: true,
                message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.",
            };
        }
    } else {
        return {
            error: true,
            message: "Không lấy được thông tin, vui lòng đăng nhập lại.",
        };
    }
    return _authInfo;
}

async function LoginAuth(param) {
    let response = await fetch(`https://${Config.apiHost}/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    console.log(
        ` => ${response.status} ------------------------- ${response.url}`
    );
    if (response?.status === 403) {
        let data = {
            error: true,
            message: "Bạn không có quyền truy cập trang này",
            status: 403,
        };
        return data;
    }
    else if (response?.status === "error") {
        let data = {
            error: true,
            message: "Đăng nhập thất bại",
            status: 400,
        };
        return data
    }
    else if (response?.status === 200) {
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
            return dataJson;
        }
    }
    else {

        let data = {
            error: true,
            message: "Đăng nhập thất bại",
            status: 400,
        };
        return data
    }
    //return response.json()
}

async function LogOut() {
    _authInfo = null;
    await AsyncStorage.removeItem(AuthStorageKey);
}

async function GetAccessToken() {
    let authInfo = await GetAuthInfo();
    if (authInfo?.auth) {
        return authInfo;
    } else {
        // let expiredDate = new Date(authInfo.auth.created_time + (authInfo.auth.expires_in * 1000 / 2));
        // if (expiredDate <= new Date()) {
        //     authInfo = await renewToken(authInfo);
        // }
        return null;
    }
}

async function CallApi(url, method, body) {
    let authInfo = await GetAccessToken();

    if (authInfo === null) {
        await LogOut();
        return { error: true, message: "get access token fail" };
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
        console.log(
            `-------------------------\n\u274c ${response.status} ${response.url}`
        );
    }
    return await response.json();
}

export default {
    LoginAuth,
    GetAuthInfo,
    LogOut,
    CallApi,
};
