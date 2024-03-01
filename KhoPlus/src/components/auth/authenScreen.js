import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import { settingApp, imageApp } from '../../public'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

const WIDTH_TEXT_INPUT = Number(settingApp.width * 0.8);

export default function AuthApp() {

    const [keyboardPading, setKeyboardPading] = useState(120);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardPading(300);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardPading(120);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);


    return (
        <KeyboardAvoidingView
            behavior="position"
            style={styles.container}
        >
            <ScrollView
                scrollEnabled={false}
                style={{
                    backgroundColor: settingApp.green_primary,
                    height: settingApp.height,
                    paddingTop: keyboardPading
                }}
            >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: settingApp.height * 0.3
                }}>
                    <Image source={imageApp.logoWhiteApp} style={{ resizeMode: "stretch" }} />
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: settingApp.width,
                    }}>

                    <TextInput
                        style={[styles.text_input, { marginBottom: 15 }]}
                        placeholder="Domain"
                        placeholderTextColor={settingApp.colorPlaceText}
                    />

                    <TextInput
                        style={[styles.text_input, { marginBottom: 15 }]}
                        placeholder="Tên đăng nhập"
                        placeholderTextColor={settingApp.colorPlaceText}
                    />

                    <TextInput

                        style={styles.text_input}
                        placeholder="Mật khẩu"
                        placeholderTextColor={settingApp.colorPlaceText}
                    />

                    <View style={styles.view_remem}>
                        <TouchableOpacity
                            style={styles.bt_reme}
                        >
                            <View
                                style={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: settingApp.white,
                                    borderRadius: 8,
                                }}
                            />
                        </TouchableOpacity>

                        <Text style={styles.rememText}>Ghi nhớ đăng nhập</Text>
                    </View>


                    <View style={styles.view_bt_login}>
                        <TouchableOpacity
                            style={styles.bt_login}
                        >
                            <Text style={[{ fontWeight: "500", fontSize: 26, color: settingApp.white }]}>Đăng nhập</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: settingApp.green_primary,
    },
    view_remem:{
        width: WIDTH_TEXT_INPUT,
        height: 45,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex_start",
        marginTop: 5
    },
    rememText: {
        fontStyle: 'italic',
        color: settingApp.white
    },
    bt_reme:{
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: 'center'
    },
    text_input: {
        width: WIDTH_TEXT_INPUT,
        height: 45,
        backgroundColor: settingApp.white,
        borderRadius: 16,
        padding: 8,
        fontStyle: 'italic',
    },
    view_bt_login:{
        width: WIDTH_TEXT_INPUT,
        height: 45,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 15
    }, 
    bt_login:{
        width: settingApp.width * 0.6,
        height: 60,
        backgroundColor: settingApp.colorText,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})