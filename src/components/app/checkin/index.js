import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AvatarCustom, SafeEra } from 'public/component';
import HeaderCheckin from './component/headerCheckin';
import { useSelector } from 'react-redux';
import { colorApp, Icon, settingApp } from 'public';
import { getDayOfWeek, getTimeDate } from 'public/Utils';
import CalendarCheckin from './component/calendar';
import NavigationRoot from 'router';
import { HeaderDetail } from 'public/header';

export default function Checkin(props) {
    const { dataCheckin } = props?.route?.params || {}
    const [listCheckin, setListCheckin] = useState([])
    const fullDate = getTimeDate('dd/mm/yyyy');

    useEffect(() =>{
        if(dataCheckin && dataCheckin?.listRollup){
            setListCheckin(dataCheckin?.listRollup)
        }
    }, [props])

    return (
        <SafeEra style={styles.container}>
            <HeaderDetail 
                titleHeader='Lịch sử chấm công'
                onPress={() => NavigationRoot.pop()}
                    description={fullDate}
                />
            <CalendarCheckin listCheckin={listCheckin}/>
        </SafeEra>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: settingApp.space_16,
        paddingRight: settingApp.space_16,
        backgroundColor: colorApp.white
    },
    viewDate: {
        width: settingApp.width_32 - 120,
        height: 64,
        justifyContent: "center",
        marginLeft:12
    },
    textTitleHeader: {
        fontSize: 20,
        color: colorApp.colorText,
        fontWeight: "600"
    },
    textDateInfo: {
        fontSize: 14,
        color: colorApp.colorPlaceText,
        lineHeight: 18,
        marginTop: 5
    },
    agendaContainer: {
        width: settingApp.width_32,
    },
    hearderCheckin:{
        flexDirection:"row",
        height:60,
        alignItems:"center",
        marginTop:12
    },
    buttonBack:{
        height:40,
        width:40,
        justifyContent:"center",
        alignItems:"flex-start"
    }
})