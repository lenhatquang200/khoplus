import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import { settingApp, imageApp, Component, colorApp, Utils } from "../../public";
import actions from "../../state/actions";
import KhoPlusApi from "../../KhoPlus/api/khoplusApi";
import FromLogin from "./component/formLogin";

import { FontAwesome } from "@expo/vector-icons";
import Splash from "./component/splashScreen";
import { screenName } from "../../router/screenName";

const { width, height } = settingApp;

export default function AuthApp(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  const [isLoading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState(colleague);
  const [isLoginFail, setLoginFail] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getAthenInfo();
    }, 1500);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (props?.route?.params?.isLogout) {
      setIsLogout(props?.route?.params?.isLogout);
    }
  }, [props]);

  function dispatchColluegue(response) {
    setInfoUser(response);
    dispatch(actions.getColleague(response));
    props.navigation.replace(screenName.TAB_STACK);
    setLoading(false);
    setLoginFail(false);
  }

  async function getAthenInfo() {
    const auth = await KhoPlusApi.GetAuthInfo();
    if (auth?.userInfo) {
      dispatchColluegue(auth?.userInfo);
    } else {
      setLoading(false);
    }
  }

  async function _onLogin(param) {
    let bodyLogin = {
      ...param,
      phone: Utils.formatPhoneNumber(param?.phone),
    };
    setLoginFail(false);
    const response = await KhoPlusApi.LoginAuth(bodyLogin);
    if (response?.auth) {
      dispatch(actions.authApp(response));
      dispatchColluegue(response.user);
    } else {
      setInfoUser({ login: { ...param } });
      setLoginFail(true);
      Alert.alert("Sai thông tin", "Số điện thoại hoặc mật khẩu không đúng", [
        { text: "OK", onPress: () => setLoading(false) },
      ]);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={[styles.container]}
    >
      {isLoading ? (
        <Splash />
      ) : (
        <View
          style={[
            styles.view_scroll,
            {
              height: keyboardVisible ? height * 1.5 : height,
            },
          ]}
        >
          <View style={styles.view_logo}>
            <Image
              source={imageApp.logoWhiteApp}
              style={{ resizeMode: "stretch" }}
            />
          </View>

          <View
            style={[
              styles.view_login,
              {
                marginBottom: keyboardVisible ? 350 : 1,
                minHeight: keyboardVisible ? height : height * 0.8,
              },
            ]}
          >
            <View style={styles.view_profile}>
              <FontAwesome
                name="user-o"
                color={colorApp.green_primary}
                size={35}
              />
            </View>
            <FromLogin
              isLoginFail={isLoginFail}
              infoUser={infoUser}
              onLogin={(param) => _onLogin(param)}
              isLogout={isLogout}
              resetLogOut={() => setIsLogout(false)}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.white,
  },
  text_user: {
    fontWeight: "500",
    fontSize: 12,
    color: colorApp.colorPlaceText,
  },
  view_logo: {
    alignItems: "center",
    justifyContent: "center",
    height: settingApp.height * 0.3,
  },
  form_login: {
    justifyContent: "center",
    alignItems: "center",
    width: settingApp.width,
  },
  view_profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colorApp.white,
    ...settingApp.shadow_Top,
    position: "absolute",
    top: -30,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  view_login: {
    width: width,
    backgroundColor: settingApp.white,
    alignItems: "center",
    borderRadius: 62,
    paddingTop: 62,
    ...settingApp.shadow_Top,
  },
  view_scroll: {
    backgroundColor: colorApp.green_primary,
    minHeight: settingApp.height,
    paddingTop: settingApp.statusBarHeight,
  },
});
