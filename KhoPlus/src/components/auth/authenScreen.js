import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Alert,
  Text,
} from "react-native";
import { settingApp, imageApp, Component, colorApp } from "../../public";
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

  useEffect(() => {
    setTimeout(() => {
      getAthenInfo();
    }, 1500);
  }, []);

  useEffect(() => {
    if (props?.route?.params?.isLogout == true) {
    }
  }, [props]);

  function dispatchColluegue(response) {
    setInfoUser(response);
    dispatch(actions.getColleague(response));
    props.navigation.navigate(screenName.TAB_STACK);
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
    console.log("parrmaaaaa", param);
    setLoginFail(false);
    const response = await KhoPlusApi.LoginAuth(param);
    if (response?.access_token) {
      dispatch(actions.authApp(response));
      dispatchColluegue(response.user);
    } else {
      setInfoUser({ login: { ...param } });
      setLoginFail(true);
      Alert.alert("", "Số điện thoại hoặc mật khẩu không đúng", [
        { text: "OK", onPress: () => setLoading(false) },
      ]);
    }
  }

  return (
    <View behavior="padding" style={styles.container}>
      {isLoading ? (
        <Splash />
      ) : (
        <ScrollView
          scrollEnabled={false}
          keyboardDismissMode="on-drag"
          style={styles.view_scroll}
        >
          <View style={styles.view_logo}>
            <Image
              source={imageApp.logoWhiteApp}
              style={{ resizeMode: "stretch" }}
            />
          </View>

          <View style={styles.view_login}>
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
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.green_004,
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
    height: height * 0.8,
    alignItems: "center",
    borderRadius: 62,
    paddingTop: 62,
    ...settingApp.shadow_Top,
  },
  view_scroll: {
    backgroundColor: colorApp.green_primary,
    height: settingApp.height,
    paddingTop: settingApp.statusBarHeight,
  },
});
