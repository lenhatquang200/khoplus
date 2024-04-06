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

import Svg, { ClipPath, Ellipse } from "react-native-svg";
import * as FileSystems from "expo-file-system";
import { Asset } from "expo-asset";
import { FontAwesome } from "@expo/vector-icons";

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

  const [keyboardPading, setKeyboardPading] = useState(120);
  const [infoUser, setInfoUser] = useState(colleague);

  useEffect(() => {
    loadDatabase().catch((e) => console.log("error", e));
    const timeOut = setTimeout(() => {
      getAthenInfo();
      clearTimeout(timeOut);
    }, 500);
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardPading(300);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardPading(120);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function dispatchColluegue(response) {
    setLoading(false);
    setInfoUser(response);
    dispatch(actions.getColleague(response));
    props.navigation.navigate("TabStack");
  }

  async function getAthenInfo() {
    setLoading(true);
    const auth = await KhoPlusApi.GetAuthInfo();
    if (auth?.id) {
      dispatchColluegue(auth);
    } else {
      setLoading(false);
    }
  }

  async function _onLogin(param) {
    setLoading(true);
    const response = await KhoPlusApi.LoginAuth(param);
    if (response?.access_token) {
      const { user = {} } = response;
      dispatch(actions.authApp(response));
      dispatchColluegue(response.user);
    } else {
      setLoading(false);
      Alert.alert("", "Số điện thoại hoặc mật khẩu không đúng", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode="on-drag"
        style={{
          backgroundColor: colorApp.green_primary,
          height: settingApp.height,
          paddingTop: settingApp.statusBarHeight,
          //alignItems: "center",
        }}
      >
        <View style={styles.view_logo}>
          <Image
            source={imageApp.logoWhiteApp}
            style={{ resizeMode: "stretch" }}
          />
        </View>

        <View
          style={{
            width: width,
            backgroundColor: settingApp.white,
            height: height * 0.8,
            alignItems: "center",
            borderRadius: 62,
            paddingTop: 62,
            ...settingApp.shadow_Top,
          }}
        >
          <View
            style={{
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
            }}
          >
            <FontAwesome
              name="user-o"
              color={colorApp.green_primary}
              size={35}
            />
          </View>
          <View
            style={{
              width: settingApp.width - 100,
              height: 32,
              justifyContent: "center",
              position: "absolute",
              top: 5,
              left: 52,
              alignItems: "center",
              marginBottom: 5,
            }}
          ></View>

          <FromLogin infoUser={infoUser} onLogin={(param) => _onLogin(param)} />
        </View>
      </ScrollView>

      {isLoading && <Component.Loading />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorApp.green_001,
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
});
