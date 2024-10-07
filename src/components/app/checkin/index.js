import React, { useEffect, useState } from 'react';
import {  StyleSheet } from 'react-native';
import {  SafeEra } from 'public/component';
import { colorApp, settingApp } from 'public';
import { getTimeDate } from 'public/Utils';
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
        backgroundColor:colorApp.white
    }
})