import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AvatarCustom, SafeEra } from 'public/component';
import HeaderCheckin from './component/headerCheckin';
import { useSelector } from 'react-redux';
import { colorApp, Icon, settingApp } from 'public';
import { getDayOfWeek, getTimeDate } from 'public/Utils';
import CalendarCheckin from './component/calendar';
import NavigationRoot from 'router';

export default function Checkin(props) {
    const { dataCheckin } = props?.route?.params
    const [listCheckin, setListCheckin] = useState([])
    
    const colleague = useSelector(state => state?.app?.colleague)
    const fullDate = getTimeDate('dd/mm/yyyy');
    const toDay = getDayOfWeek()

    useEffect(() =>{
        if(dataCheckin && dataCheckin?.listRollup){
            setListCheckin(dataCheckin?.listRollup)
        }
    }, [props])

    return (
        <SafeEra style={styles.container}>
            <View style={styles.hearderCheckin}>
                <TouchableOpacity
                    onPress={() => NavigationRoot?.pop()}
                    style={styles.buttonBack}
                >
                    <Icon.icon_Back/>
                </TouchableOpacity>

                <AvatarCustom 
                    size={30} 
                    name={colleague?.name}
                    picture=""
                />
                <View style={styles.viewDate}>
                    <Text style={styles.textTitleHeader}>{"Lịch sử chấm công"}</Text>
                    <Text style={styles.textDateInfo}>{`${toDay} ${fullDate}`}</Text>
                </View>
            </View>
            
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