import { colorApp, settingApp } from 'public';
import { Loading, LoadingInContent, SafeEra } from 'public/component';
import { HeaderDetail } from 'public/header';
import { getTimeDate } from 'public/Utils';
import React, { Component, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavigationRoot from 'router';
import Item from './components/item';
import { ApiCall } from 'KhoPlus';

export default function LeaveList(props){
    const { dataCheckin } = props?.route?.params || {}
    
    const [listLeave, setListLeave] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fullDate = getTimeDate('dd/mm/yyyy');

    useEffect(() =>{
        getdataLeave()
    }, [])

    async function getdataLeave() {
        const month = getTimeDate('mm/yyyy')
        const currentTime = new Date().getTime()
        const response = await ApiCall.getListOnLeave(month, currentTime)
        const newList = []
        if(response?.data?.length !== 0){
            const listLeave =  response.data
            for (let i = 0; i < listLeave.length; i++) {
                const item = listLeave[i];
                if(item?.list?.length !== 0){
                    item.list.map(e =>{
                        newList.push(e)
                    })
                }
            }
        }
        else{
            newList = []
        }
        setListLeave(newList)
        setIsLoading(false)
    }

    return(
        <SafeEra style={styles.container}>
            <HeaderDetail
                titleHeader='Lịch nghỉ phép'
                description={fullDate}
                onPress={() => NavigationRoot.pop()}
            />

            { isLoading ?
            <View style={styles.loading}>
                <LoadingInContent />
            </View>
            :
            <FlatList 
                data={listLeave}
                keyExtractor={(item, index) => index+""}
                extraData={listLeave.length}
                renderItem={(obj) => <Item data={obj}/>}
                style={styles.list}
            />}
        </SafeEra>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colorApp.white
    },
    loading:{
        width:settingApp.width,
        height:settingApp.width,
        justifyContent:"center",
        alignItems:"center"
    },
    list:{
        flex:1,
        paddingLeft:settingApp.space_16
    }
})