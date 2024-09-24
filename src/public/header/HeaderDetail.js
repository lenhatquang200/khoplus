import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AvatarCustom } from 'public/component';
import settingApp from 'public/settingApp';
import colorApp from 'public/colorApp';
import { useSelector } from 'react-redux';
import { Icon } from 'public';


export default function HeaderDetail({
    titleHeader = "Header",
    description = '',
    onPress
}){
    const colleague = useSelector(state => state?.app?.colleague)

    return(
        <View style={styles.hearderCheckin}>
                <TouchableOpacity
                    onPress={onPress ? onPress : null}
                    style={styles.buttonBack}
                >
                    <Icon.icon_Back/>
                </TouchableOpacity>

                <AvatarCustom 
                    size={30} 
                    name={colleague?.name || ''}
                    picture=""
                />
                <View style={styles.viewDate}>
                    <Text style={styles.textTitleHeader}>{titleHeader}</Text>
                    <Text style={styles.textDateInfo}>{description}</Text>
                </View>
            </View>
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