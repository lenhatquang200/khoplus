import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { settingApp, lang, colorApp } from "../../../public";

import { Entypo } from "@expo/vector-icons";
const WIDTH_TEXT_INPUT = Number(settingApp.width * 0.8);

export default function FromLogin(props) {
  //const [infoUser, setInfoUser] = useState(props?.infoUser)
  const [userLogin, setUserLogin] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    const { infoUser } = props;
    if (infoUser?.login?.phone) {
      setUserLogin({
        ...userLogin,
        phone: infoUser?.login?.phone,
      });
    }
  }, [props]);

  function isPhoneNumber(number) {
    return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
  }

  function pressBt() {
    const { phone } = userLogin || {};
    if (phone.trim().length < 10 && !isPhoneNumber(phone)) {
      Alert.alert("Số điện thoại không đúng", "", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      props.onLogin(userLogin);
    }
  }

  return (
    <View style={styles.form_login}>
      <View>
        <Text style={styles.txt_title}>Tên đăng nhập</Text>
        <TextInput
          style={[styles.text_input, { marginBottom: 15 }]}
          placeholder={lang.placeHolderUserName}
          value={userLogin.phone}
          keyboardType="number-pad"
          onChangeText={(text) => setUserLogin({ ...userLogin, phone: text })}
          inputMode="numeric"
          placeholderTextColor={colorApp.colorPlaceText}
        />
      </View>

      <View
        style={{
          marginTop: 16,
        }}
      >
        <Text style={styles.txt_title}>Mật khẩu</Text>
        <TextInput
          style={styles.text_input}
          placeholder={lang.placeHolderPass}
          secureTextEntry={true}
          onChangeText={(text) =>
            setUserLogin({ ...userLogin, password: text })
          }
          placeholderTextColor={colorApp.colorPlaceText}
        />
      </View>
      {/* <View style={styles.view_bt_login}>
        <TouchableOpacity onPress={() => pressBt()} style={styles.bt_login}>
          <Text style={styles.text_login}>{lang.login}</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.view_bt_login}>
        <Text
          style={{
            color: colorApp.green_primary,
            fontWeight: "bold",
            fontSize: settingApp.size_20,
            marginRight: 8,
          }}
        >
          Login
        </Text>
        <Entypo name="login" size={18} color={colorApp.green_primary} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  text_login: {
    fontWeight: "500",
    fontSize: 26,
    color: colorApp.green_primary,
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
    fontSize: settingApp.size_12,
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
  bt_login: {
    width: settingApp.width * 0.5,
    height: 45,
    backgroundColor: colorApp.colorText,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text_login: {
    fontWeight: "500",
    fontSize: 20,
    color: colorApp.white,
  },
  txt_title: {
    color: colorApp.green_primary,
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "600",
  },
});
