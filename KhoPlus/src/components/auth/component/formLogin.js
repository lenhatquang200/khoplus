import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import { settingApp, lang, colorApp } from '../../../public';

const WIDTH_TEXT_INPUT = Number(settingApp.width * 0.8);

export default function FromLogin(props) {

    const [userInfo, setUserInfo] = useState({
        phone:'',
        password:'',
    })

    function isPhoneNumber(number) {
        return /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
    }

    function pressBt(){
        const { phone } = userInfo || {}
        if((phone.trim().length < 10) && !isPhoneNumber(phone)){
            Alert.alert('Số điện thoại không đúng', 
            '',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
        else{
            props.onLogin(userInfo)
        }
    }

    return (
        <View style={styles.form_login}>
            <TextInput
                style={[styles.text_input, { marginBottom: 15 }]}
                placeholder={lang.placeHolderUserName}
                value={userInfo.user}
                keyboardType="number-pad"
                onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
                inputMode="numeric"
            />

            <TextInput
                style={styles.text_input}
                placeholder={lang.placeHolderPass}
                secureTextEntry={true}
                onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
            />

            <View style={styles.view_bt_login}>
                <TouchableOpacity
                    onPress={() => pressBt()}
                    style={styles.bt_login}
                >
                    <Text style={styles.text_login}>{lang.login}</Text>
                </TouchableOpacity>

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    text_login:{
        fontWeight: "500", 
        fontSize: 26, 
        color: colorApp.white 
    },
    text_user:{
        fontWeight: "500", 
        fontSize: 12, 
        color: colorApp.colorPlaceText 
    },
    form_login:{
        justifyContent: 'center',
        alignItems: 'center',
        width: settingApp.width,
    },
    text_input: {
        width: WIDTH_TEXT_INPUT,
        height: 45,
        backgroundColor: colorApp.white,
        borderRadius: 16,
        padding: 8,
        fontStyle: 'italic',
        color:colorApp.colorPlaceText
    },
    view_bt_login:{
        width: WIDTH_TEXT_INPUT,
        height: 45,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 35
    }, 
    bt_login:{
        width: settingApp.width * 0.5,
        height: 45,
        backgroundColor: colorApp.colorText,
        borderRadius: 45/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_login:{
        fontWeight: "500", 
        fontSize: 20, 
        color: colorApp.white 
    },
})