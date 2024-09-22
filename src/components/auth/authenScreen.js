import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LinearGradient } from "expo-linear-gradient";
import { settingApp, imageApp, colorApp, Utils, keyStore } from "../../public";
import actions from "../../state/actions";
import KhoPlusApi from "../../KhoPlus/api/khoplusApi";
import FromLogin from "./component/formLogin";

import { FontAwesome } from "@expo/vector-icons";
import Splash from "./component/splashScreen";
import { screenName } from "../../router/screenName";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = settingApp;

export default function AuthApp(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  const [isLoading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState(colleague);
  const [isLoginFail, setLoginFail] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getAthenInfo();
    }, 500);
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
    const { phone, password, domainUser } = param
    let bodyLogin = {
      password:password,
      phone:phone,
    };
    setLoginFail(false);
    const response = await KhoPlusApi.LoginAuth(bodyLogin, domainUser);
    if (response?.auth) {
      await AsyncStorage.setItem(keyStore.domainName,JSON.stringify(response?.login))
      dispatch(actions.authApp(response));
      dispatchColluegue(response.userInfo);
    } else {
      setInfoUser({ login: { ...param } });
      setLoginFail(true);
      Alert.alert("Sai thông tin", "Số điện thoại hoặc mật khẩu không đúng", [
        { text: "OK", onPress: () => setLoading(false) },
      ]);
    }
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={Platform?.OS === 'ios' ? 0 : -(height * 0.22)}
      scrollEnabled={false}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      className="flex flex-1"
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[colorApp.blue_primary, colorApp.green_primary,]}
        style={styles.background}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.5, y: 1 }}
      >
        {isLoading ? (
          <Splash />
        ) : (
          <View
            style={[
              styles.view_scroll,
              
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
                // {
                //   marginBottom: keyboardVisible ? 350 : 1,
                //   minHeight: keyboardVisible ? height : height * 0.8,
                // },
              ]}
            >
              <FromLogin
                isLoginFail={isLoginFail}
                infoUser={infoUser}
                onLogin={(param) => _onLogin(param)}
                isLogout={isLogout}
                resetLogOut={() => setIsLogout(false)}
                navigation={props.navigation}
              />
            </View>
          </View>
        )}
      </LinearGradient>
    </KeyboardAwareScrollView>
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
    backgroundColor: colorApp.white_snow,
    alignItems: "center",
    borderRadius: 32,
    paddingTop: 40,
    ...settingApp.shadow_Top,
    minHeight:height
  },
  view_scroll: {
    // backgroundColor: colorApp.green_primary,
    minHeight: settingApp.height,
    paddingTop: settingApp.statusBarHeight,
  },

  viewAction:{
        width:settingApp.width_32,
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:22
    },
    txtFogot:{
        fontSize:14,
        color:colorApp.blue_primary,
        fontWeight:"400",
    },
});
