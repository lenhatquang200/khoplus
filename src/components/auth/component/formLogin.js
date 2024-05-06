import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { settingApp, lang, colorApp } from "../../../public";

import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

const { width } = settingApp;
const WIDTH_TEXT_INPUT = Number(width * 0.8);
const BROWSER = "browser";
const SUPPORT = "support";

const URL_BROWSER = `https://web.khoplus.com/`;
export default function FromLogin(props) {
  const { infoUser, isLoginFail, isLogout, resetLogOut } = props || {};
  const [userLogin, setUserLogin] = useState({
    phone: "",
    password: "",
  });
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (infoUser?.login?.phone) {
      setUserLogin({
        ...userLogin,
        phone: infoUser?.login?.phone,
      });
    }
    if (isLoginFail == true) {
      setLogin(false);
    }
  }, [infoUser, isLoginFail]);

  useEffect(() => {
    if (isLogout == true) {
      setUserLogin({
        phone: "",
        password: "",
      });
      setLogin(false);
      resetLogOut;
    }
  }, [isLogout]);

  function isPhoneNumber(number) {
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
  }

  function pressBt() {
    setLogin(true);
    const { phone } = userLogin || {};
    if (phone.trim().length < 10 && !isPhoneNumber(phone)) {
      Alert.alert("Số điện thoại không đúng", "", [
        { text: "OK", onPress: () => setLogin(false) },
      ]);
    } else {
      props.onLogin(userLogin);
    }
  }

  async function _onPressOption(type) {
    const supported = await Linking.canOpenURL(URL_BROWSER);
    switch (type) {
      case BROWSER:
        if (supported) {
          await Linking.openURL(URL_BROWSER);
        }
        break;
      case SUPPORT:
        Alert.alert("Bạn cần hổ trợ", "Liên hệ cho quản trị viên", {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        });
        break;
      default:
        console.log("Error");
        break;
    }
  }

  function button_support(icon, type) {
    return (
      <TouchableOpacity
        onPress={() => _onPressOption(type)}
        style={styles.bt_support}
      >
        {icon}
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={styles.form_login}
    >
      {/* input user name */}
      <View>
        <Text style={styles.txt_title}>{lang.userName}</Text>
        <TextInput
          editable={!isLogin}
          style={[styles.text_input, { marginBottom: 15 }]}
          placeholder={lang?.placeHolderUserName}
          value={userLogin?.phone}
          keyboardType="number-pad"
          onChangeText={(text) => setUserLogin({ ...userLogin, phone: text })}
          inputMode="numeric"
          placeholderTextColor={colorApp.colorPlaceText}
        />
      </View>
      {/* input password */}
      <View>
        <Text style={styles.txt_title}>{lang.password}</Text>
        <TextInput
          editable={!isLogin}
          style={styles.text_input}
          placeholder={lang.placeHolderPass}
          secureTextEntry={true}
          onChangeText={(text) =>
            setUserLogin({ ...userLogin, password: text })
          }
          placeholderTextColor={colorApp.colorPlaceText}
          value={userLogin?.password}
        />
      </View>
      {/* Forgot password */}
      <View style={styles.view_forgot}>
        <TouchableOpacity
          onPress={() => _onPressOption(BROWSER)}
          style={styles.button_forgot}
        >
          <Text style={styles.txt_forgot}>{lang.forgotPass}</Text>
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <TouchableOpacity
        disabled={isLogin}
        onPress={() => pressBt()}
        style={styles.view_bt_login}
      >
        <Text style={styles.text_login}>{lang.login}</Text>
        {isLogin ? (
          <ActivityIndicator size={"small"} color={colorApp.green_primary} />
        ) : (
          <Entypo name="login" size={18} color={colorApp.green_primary} />
        )}
      </TouchableOpacity>

      {/* Support */}
      <View style={styles.view_support}>
        {button_support(
          <AntDesign name="earth" size={22} color={colorApp.colorPlaceText} />,
          BROWSER
        )}
        {button_support(
          <MaterialIcons
            name="support-agent"
            size={26}
            color={colorApp.colorPlaceText}
          />,
          SUPPORT
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  text_login: {
    color: colorApp.green_primary,
    fontWeight: "bold",
    fontSize: settingApp.size_20,
    marginRight: 8,
  },
  text_user: {
    fontWeight: "500",
    fontSize: 12,
    color: colorApp.colorPlaceText,
  },
  form_login: {
    justifyContent: "center",
    alignItems: "center",
    // width: settingApp.width,
  },
  text_input: {
    width: WIDTH_TEXT_INPUT,
    height: 38,
    color: colorApp.colorText,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomColor: colorApp.green_primary,
    borderTopColor: colorApp.green_primary,
    borderRightColor: colorApp.green_primary,
    borderLeftColor: colorApp.green_primary,
    borderRadius: 8,
    //backgroundColor: "rgba(60, 179, 85, 0.1)",
    marginTop: 5,
    fontSize: settingApp.size_14,
    paddingLeft: 5,
    fontStyle: "italic",
  },
  view_bt_login: {
    width: settingApp.width * 0.5,
    height: 48,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomColor: colorApp.green_primary,
    borderTopColor: colorApp.green_primary,
    borderRightColor: colorApp.green_primary,
    borderLeftColor: colorApp.green_primary,
    borderRadius: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txt_title: {
    color: colorApp.green_primary,
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "600",
  },
  txt_forgot: {
    color: colorApp.colorText,
    fontSize: settingApp.size_14,
  },
  button_forgot: {
    width: width * 0.3,
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  view_forgot: {
    width: width,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 32,
    marginTop: 12,
  },
  view_support: {
    width: width,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 60,
  },
  bt_support: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "white",
    ...settingApp.shadow,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
