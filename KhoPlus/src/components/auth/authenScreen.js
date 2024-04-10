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

import * as FileSystems from "expo-file-system";
import { Asset } from "expo-asset";
import { FontAwesome } from "@expo/vector-icons";
import Splash from "./component/splashScreen";
import { screenName } from "../../router/screenName";

const { width, height } = settingApp;

const loadDatabase = async () => {
  const dbName = "khoplusDB.db";
  const dbAsset = require("../../../khoplusDB.db");

  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePatch = `${FileSystems.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystems.getInfoAsync(dbFilePatch);
  if (!fileInfo.exists) {
    await FileSystems.makeDirectoryAsync(
      `${FileSystems.documentDirectory}SQLite`,
      {
        intermediates: true,
      }
    );
    await FileSystems.downloadAsync(dbUri, dbFilePatch);
  }
};

export default function AuthApp(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app);

  const [isLoading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState(colleague);
  const [isLoginFail, setLoginFail] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (infoUser) {
        getAthenInfo();
      }
    }, 1500);
  }, []);

  function dispatchColluegue(response) {
    setInfoUser(response);
    dispatch(actions.getColleague(response));
    props.navigation.navigate(screenName.TAB_STACK);
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
    setLoginFail(false);
    const response = await KhoPlusApi.LoginAuth(param);
    if (response?.access_token) {
      dispatch(actions.authApp(response));
      dispatchColluegue(response.user);
    } else {
      setLoginFail(true);
      Alert.alert("", "Số điện thoại hoặc mật khẩu không đúng", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }

  function content() {
    return (
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
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {isLoading ? <Splash /> : content()}
    </KeyboardAvoidingView>
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
