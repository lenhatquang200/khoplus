import React, { useState, useEffect, memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { colorApp, lang, settingApp } from 'public'

const { width } = settingApp
const Item = memo((props) => {
    const { obj, onDelete, onUpdate } = props
    const { item } = obj

    return (
        <TouchableOpacity
            onPress={onUpdate}
            style={styles.container}>
            <View style={styles.view_txt}>
                <Text style={styles.txt_name}>{item?.name}</Text>
                <Text style={styles.txt_time}>{item?.formatted_created_at}</Text>
            </View>

            <TouchableOpacity
                onPress={() => onDelete(item)}
                style={styles.bt_delete}
            >
                <Text style={styles.txt_delete}>{lang.delete}</Text>
            </TouchableOpacity>
            <View style={styles.line} />
        </TouchableOpacity>
    )
})

export default Item

const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        minHeight: 80,
        backgroundColor: colorApp.white,
        justifyContent: "center",
    },
    line: {
        width: width,
        height: 8,
        backgroundColor: colorApp.black_opacity_01,
    },
    txt_name: {
        fontSize: settingApp.size_20,
        fontWeight: "600",
        color: colorApp.green_001
    },
    view_txt: {
        width: settingApp.width,
        height: 60,
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 10
    },
    txt_time: {
        fontSize: settingApp.size_14,
        color: colorApp.green_002
    },
    bt_delete: {
        width: 60,
        height: 30,
        backgroundColor: colorApp.red_opacity_03,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        position: "absolute",
        right: 16,
        bottom: 16
    },
    txt_delete: {
        fontSize: settingApp.size_14,
        fontWeight: "500",
        color: colorApp.red,
    },
})