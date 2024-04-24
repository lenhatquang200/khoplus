import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';
import { colorApp, lang } from 'public';

export default function ButtonUpdate(props: any) {
    return (
        <View
            style={styles.view_bottom_button}
        >

            <TouchableOpacity
                onPress={() => props?.updateManufact()}
                style={[styles.bt_update, {
                    borderColor: colorApp.green_001,
                    backgroundColor: colorApp.green_001
                }]}
            >
                <Text style={[styles.txt_button, {
                    color: colorApp.white

                }]}>{lang.update}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props?.onCancel()}
                style={[styles.bt_update, {
                    borderColor: colorApp.red,
                    backgroundColor: colorApp.red
                }]}
            >
                <Text style={[styles.txt_button, {
                    color: colorApp.white
                }]}>{lang.cancel}</Text>
            </TouchableOpacity>
        </View>
    )
}