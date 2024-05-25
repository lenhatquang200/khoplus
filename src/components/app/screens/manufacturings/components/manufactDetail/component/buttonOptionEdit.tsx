import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { colorApp, lang } from 'public';

export default function ButtonOptionEdit(props: any) {
    return (
        <View style={styles.view_bottom_button}>
            <TouchableOpacity
                onPress={() => props?.onEdit(true)}
                style={[styles.bt_update, {
                    borderColor: colorApp.green_004,
                }]}
            >
                <Text style={[styles.txt_button, {
                    color: colorApp.green_004

                }]}>{lang.edit}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props?.onDelete(false)}
                style={[styles.bt_update, {
                    borderColor: colorApp.red,
                }]}
            >
                <Text style={[styles.txt_button, {
                    color: colorApp.red
                }]}>{lang.delete}</Text>
            </TouchableOpacity>
        </View>
    )
}