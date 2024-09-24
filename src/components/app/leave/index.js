import { colorApp, settingApp } from 'public';
import { SafeEra } from 'public/component';
import { HeaderDetail } from 'public/header';
import { getTimeDate } from 'public/Utils';
import React, { Component, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavigationRoot from 'router';
import Item from './components/item';

export default function LeaveList(props){
    const { dataCheckin } = props?.route?.params || {}
    console.log('dataCheckin', dataCheckin);
    
    const [listLeave, setListLeave] = useState([])

    const fullDate = getTimeDate('dd/mm/yyyy');

    useEffect(() => {
        if(dataCheckin  && dataCheckin?.listOnLeave){
            setListLeave(dataCheckin?.listOnLeave)
        }
    },[props])


    return(
        <SafeEra style={styles.container}>
            <HeaderDetail
                titleHeader='Lịch nghỉ phép'
                description={fullDate}
                onPress={() => NavigationRoot.pop()}
            />

            <FlatList 
                data={listLeave}
                keyExtractor={(item, index) => index+""}
                extraData={listLeave.length}
                renderItem={(obj) => <Item data={obj}/>}
            />
        </SafeEra>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingLeft:settingApp.space_16,
        paddingRight:settingApp.space_16,
        backgroundColor:colorApp.white
    }
})