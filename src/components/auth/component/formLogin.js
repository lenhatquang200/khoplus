import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";
import { settingApp, lang, colorApp, Utils, keyStore } from "../../../public";

import { FontAwesome, Feather } from "@expo/vector-icons";
import { screenName } from "router/screenName";
import NavigationRoot from "router";
import AsyncStorage from "@react-native-async-storage/async-storage";

let _user = null
let _pass = null
export default function FromLogin(props) {
    const { infoUser, isLoginFail, isLogout, resetLogOut } = props || {};
    const [userName, setUsername] = useState('');
    const [passWord, setPassword] = useState('')
    const [isLogin, setLogin] = useState(false);
    const [domainUser, setDomain] = useState('')
    const [domainName, setDomainName] = useState('')
    const [replaceLink, setReplaceLink] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const text_input_user = useRef()
    const text_input_pass = useRef()

    useEffect(() => {
        if (domainUser?.trim().length !== 0) {
        }
        return () => {
            _user = null;
            _pass = null;
            setPassword('');
            setUsername('');
            text_input_user?.current?.clear();
            text_input_pass?.current?.clear();
        }
    }, [])

    useEffect(() => {
        if (infoUser?.login?.phone) {
            handleChangeUserName(infoUser?.login?.phone)
        }
        if (isLoginFail == true) {
            setLogin(false);
        }
    }, [infoUser, isLoginFail]);

    useEffect(() => {
        if (isLogout == true) {
            setLogin(false);
            resetLogOut;
            getInfoLogin()
        }
    }, [isLogout]);


    async function getInfoLogin() {
        const resLocal = await AsyncStorage.getItem(keyStore.domainName)
        if (resLocal) {
            const dataLogin = JSON.parse(resLocal)
            dataLogin?.phone && setUsername(dataLogin?.phone)
            dataLogin?.domainUser && setDomain(dataLogin?.domainUser)
        }

    }

    function formatPhoneNumber(value) {
        // Xóa tất cả các ký tự không phải số
        const numericValue = value.replace(/\D/g, '');
        // Kiểm tra độ dài của số điện thoại
        if (numericValue.length <= 4) {
            return numericValue; // Trả về số điện thoại nếu dưới 4 ký tự
        } else if (numericValue.length <= 7) {
            return `${numericValue.slice(0, 4)}-${numericValue.slice(4)}`;
        } else {
            return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 7)}-${numericValue.slice(7, 10)}`;
        }
    }

    const handleChangeUserName = (text) => {
        const formatted = formatPhoneNumber(text);
        _user = text
        setUsername(formatted);
    };

    const handleChangePass = (text) => {
        _pass = text
        setPassword(text);
    }

    const handleChangeDomain = (text) => {
        setDomain(text)
    }

    function ensureHttps(url) {
        // Kiểm tra xem chuỗi có bắt đầu bằng 'http://' hoặc 'https://' không
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          // Thêm 'https://' vào đầu chuỗi
          url = 'https://' + url;
        }
        return url;
      }

    function handleDomain(){
        const inputUrl =  ensureHttps(inputValue)
        const part = inputUrl.split("/")[2].split(".")[0];
        setDomain(inputUrl)
        setDomainName(part)
        setIsEdit(false)
    }

    function onGetParams(data) {
        console.log('onGetParams', data);
        
       
        if (data?.dataQR) {
            const { dataQR, dataLogin } = data
            const resObj = JSON.parse(dataQR)
            setDomain(resObj?.link)
            setDomainName(resObj?.name)
            // dataLogin?.user && setUsername(dataLogin?.user)
            // dataLogin?.pass && setPassword(dataLogin?.pass)
        } else {
            Alert.alert("Lỗi", "Không thể xử lý QR Code", [
                {
                    text: lang.close,
                    onPress: () => null,
                    style: "cancel",
                },
            ]);
        }

    }

    function onScan() {
        NavigationRoot.push(screenName.SCAN_DOMAIN, {
            onGetParams,
            dataLogin: {
                user: _user,
                pass: _pass,
            }
        })
    }

    function onLogin() {
        //  props.navigation.replace(screenName.TAB_STACK);
        //|| !Utils.isPhoneNumber(_user)
        if (userName?.length < 10) {
            Alert.alert("Số điện thoại không đúng", "", [
                { text: "OK", onPress: () => setLogin(false) },
            ]);
        } else if (domainUser?.trim().length == 0) {
            Alert.alert("Lỗi", "Bạn chưa nhập đường dẫn hệ thống.\nBạn có thể quét QR code để xác nhận đường dẫn hệ thống.", [
                { text: "OK", onPress: () => setLogin(false) },
            ]);
        }
        else {
            props.onLogin({
                phone: userName,
                password: _pass,
                domainUser
            });
        }

    }

    function renderInputLink() {
        return (
            <View style={styles.viewInput}>
                <View style={[styles.user, {
                    backgroundColor: "#F0FFF0"
                }]}>
                    <Feather
                        name="link"
                        color={'#5f9EA0'}
                        size={20}
                    />
                </View>
                <TextInput
                    ref={text_input_user}
                    value={domainUser}
                    style={[styles.text_input]}
                    placeholder={lang?.placeHolderDomain}
                    onChangeText={handleChangeDomain}
                />
            </View>
        )
    }

    const _domainValue = domainName?.trim().length !== 0 ? domainName : 'Link hệ thống'
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.titleHeader}>
                <Text style={styles.txtHeader}>{'Đăng nhập'}</Text>
                <Text style={styles.txtHeader_des}>{'Chào mừng bạn quay lại với Hiệp Phát Agri'}</Text>
            </View>

            <View style={styles.container}>
                {/* DOMAIN */}
                {replaceLink && renderInputLink()}
                <View style={styles.viewInput}>
                    <View style={[styles.user, {
                        backgroundColor: "#F0FFF0"
                    }]}>
                        <Feather
                            name="link"
                            color={'#5f9EA0'}
                            size={20}
                        />
                    </View>
                    <Text style={styles.domainName}>{_domainValue}</Text>
                </View>
                {/* Button edit domain */}
                {
                <TouchableOpacity 
                onPress={() => setIsEdit(true)}
                style={styles.buttonEdit}>
                    <Feather
                        name="edit"
                        color={colorApp.disable}
                        size={20}
                    />
                </TouchableOpacity>}

                {/* USERNAME */}
                <View style={styles.viewInput}>
                    <View style={styles.user}>
                        <Feather
                            name="user"
                            color={'#F4A460'}
                            size={20}
                        />
                    </View>
                    <TextInput
                        ref={text_input_user}
                        value={userName}
                        style={[styles.text_input]}
                        placeholder={lang?.placeHolderUserName}
                        onChangeText={handleChangeUserName}
                        keyboardType="number-pad"
                        maxLength={12}
                    />
                </View>

                {/* PASS */}
                <View style={styles.viewInput}>
                    <View style={[styles.user, { backgroundColor: '#E6E6FA' }]}>
                        <Feather
                            name="lock"
                            color={'#9400D3'}
                            size={20}
                        />
                    </View>
                    <TextInput
                        ref={text_input_pass}
                        style={[styles.text_input]}
                        placeholder={lang?.placeHolderPass}
                        onChangeText={handleChangePass}
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonQR}
                onPress={onScan}
            >
                <FontAwesome
                    name="qrcode"
                    color={colorApp.black}
                    size={24}
                />
            </TouchableOpacity>

            <View style={styles.viewAction}>
                <TouchableOpacity>
                    <Text style={styles.txtFogot}>{'Quên mật khẩu ?'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={onLogin}
                >
                    <Text style={styles.txtLogin}>{'Đăng nhập'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewAction_bottom}>
                <Text>{`KhoPlus Version: 1.0.0`}</Text>
            </View>
            
            
            {isEdit && (
                <View style={styles.overlay}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập đường dẫn"
                        value={inputValue}
                        onChangeText={text => setInputValue(text)}
                    />
                    
                    <View style={styles.viewBT_domain}>
                        <TouchableOpacity
                            onPress={handleDomain}
                            style={styles.butActionDomain}
                        >
                            <Text style={styles.text_bt_domain}>{"Lưu"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>  setIsEdit(false)}
                            style={styles.butActionDomain}
                        >
                            <Text style={styles.text_bt_domain}>{"Đóng"}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width_32,
        minHeight: 140,
        backgroundColor: colorApp.white,
        borderRadius: 16,
        justifyContent: 'center'
    },
    titleHeader: {
        width: settingApp.width,
        minHeight: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    txtHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: colorApp.colorText,
    },
    txtHeader_des: {
        fontSize: 14,
        color: colorApp.colorPlaceText,
        marginTop: 8,
        lineHeight: 16
    },
    viewInput: {
        width: settingApp.width_32 - 48,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingTop: 10,
        paddingBottom: 10
    },
    user: {
        width: 40,
        height: 40,
        backgroundColor: '#FFEFD5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_input: {
        width: settingApp.width_32 - 100,
        height: 40,
        marginLeft: 16,
        backgroundColor: colorApp.transparent
    },
    viewAction: {
        width: settingApp.width_32,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24
    },
    txtFogot: {
        fontSize: 14,
        color: colorApp.blue_primary,
        fontWeight: "400",
    },
    buttonLogin: {
        width: 120,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorApp.black,
        borderRadius: 46
    },
    txtLogin: {
        fontSize: 16,
        fontWeight: '600',
        color: colorApp.white
    },
    viewAction_bottom: {
        width: settingApp.width_32,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? -(settingApp.height * 0.15) : -(settingApp.height * 0.1)
    },
    iconButtonBottom: {
        width: 60,
        height: 60,
        backgroundColor: colorApp.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 32
    },
    buttonRepeat: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 16
    },
    viewAction_domain: {
        width: settingApp.width_32,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 12,
    },
    buttonQR: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 16,
        bottom: Platform?.OS === 'ios' ? -130 : 160,
        backgroundColor: colorApp.white,
        zIndex:2,
        ...settingApp.shadow_Top
    },
    domainName:{
        fontSize:14,
        color:colorApp.disable,
        marginLeft:16
    },
    buttonEdit:{
        width:40,
        height:40,
        position:"absolute",
        right:-12,
        top:16
    },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: settingApp.width_32 - 64,
    padding: 20,
    backgroundColor: colorApp.black_opacity_05,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor:colorApp.white
  },
  viewBT_domain:{
    width: settingApp.width_32 - 64,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:24,
    paddingRight:24
  },
  butActionDomain:{
    width:120,
    height:30,
    justifyContent:"center",
    alignItems:"center",
  },
  text_bt_domain:{
    fontSize:16,
    color:colorApp.white,
    fontWeight:"600"
  }
});
