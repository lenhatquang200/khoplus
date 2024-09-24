import { LinearGradient } from 'expo-linear-gradient';
import { colorApp, settingApp } from 'public';
import { SafeEra } from 'public/component';
import { HeaderDetail } from 'public/header';
import { getTimeDate } from 'public/Utils';
import React, { Component, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavigationRoot from 'router';

export default function Item(props) {
    const { item } = props?.data || {}
    console.log('itemmmm', item);
    

    return (
        // <LinearGradient
        //     colors={[colorApp.colorLeave, colorApp.white]}
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 1 }}
        //     style={styles.linear}
        // >
        //     <View style={styles.container}>
        //         <Text>{'12331231232'}</Text>
        //     </View>
        // </LinearGradient>
        <View
            style={[styles.linear,{
                backgroundColor:colorApp.lavender
            }]}
        >
        <View style={styles.line}/>
            <View style={styles.container}>
                
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
        overflow:"hidden"
    },
    line:{
        width:6,
        height:120,
        backgroundColor:"#8470FF",
        position:"absolute" ,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    }
})