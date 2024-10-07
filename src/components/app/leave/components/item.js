import { LinearGradient } from 'expo-linear-gradient';
import { colorApp, settingApp } from 'public';
import { SafeEra } from 'public/component';
import CONSTANTS from 'public/CONSTANTS';
import { HeaderDetail } from 'public/header';
import { getTimeDate, isEmptyObject } from 'public/Utils';
import React, { Component, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavigationRoot from 'router';

export default function Item(props) {
    const { item } = props?.data || {}
    const [colorLeave, setColorLeave] = useState(colorApp.nonCheckin)
    const [lineColor, setLineColor] = useState(colorApp.noneLeave)

    useEffect(() => {
        getColorLeave(item)
    }, [item])


    function getColorLeave(item) {
        const { value } = item
        switch (value) {
            case CONSTANTS.FULL_CHECKIN:
                setLineColor("#BF3EFF")
                setColorLeave(colorApp.leaveFullDay)
                break;
            case CONSTANTS.MORNING_CHECKIN:
                setLineColor(colorApp.checkinMorningDay)
                setColorLeave(colorApp.leaveMorningDay)
                break;
            case CONSTANTS.AFTERNOON_CHECKIN:
                setLineColor(colorApp.light_blue)
                setColorLeave(colorApp.leaveAffterDay)
                break;
            default:
                setColorLeave(colorApp.nonCheckin)
                setLineColor(colorApp.nonCheckin)
                break;
        }
    }


    return (
        <View style={[styles.linear, {
                backgroundColor: colorLeave
            }]}
        >
            <View style={[styles.line, { backgroundColor: lineColor }]} />
            <View style={styles.container}>
                <Text style={styles.txt_date}>
                    <Text>{item?.time_show || '--'}</Text>
                    <Text>{` - ${item?.name}` || '--'}</Text>
                </Text>

                <Text style={styles.txt_name_user}>{item?.user?.name || '--'}</Text>

                <Text style={styles.txt_store}>{item?.user?.store?.name || '--'}</Text>
            </View>
        </View>


    )
}
const styles = StyleSheet.create({
    linear: {
        width: settingApp.width_32,
        minHeight: 120,
        marginBottom: 5,
        borderRadius: 8,
    },
    container: {
        width: settingApp.width_32,
        minHeight: 60,
        overflow: "hidden",
        padding: 12
    },
    line: {
        width: 6,
        height: 120,
        position: "absolute",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    txt_date: {
        fontSize: 16,
        color: colorApp.colorText
    },
    txt_name_user:{
        fontSize:20,
        marginTop:6,
        fontWeight:"500"
    },
    txt_store:{
        fontSize: 14,
        color: colorApp.colorPlaceText,
        marginTop:6
    }
})