import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AvatarCustom, SafeEra } from 'public/component';
import { settingApp } from 'public';

export default function HeaderCheckin(props){
    console.log('HeaderCheckin', props);
    
    return (
        <View style={styles.container}>
            <AvatarCustom 
                size={30} 
                name={props?.colleague?.name}
                picture=""
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:40,
        width:settingApp.width_32,
        justifyContent:"center"
    }
})