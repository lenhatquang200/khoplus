import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleProp, StyleSheet } from 'react-native';
import { HeaderName, AsyncImage } from "public/component"
import { colorApp, lang, settingApp } from 'public';
import { IObjectItem, Iprops } from './common';

export default function ManufactDetail(props:Iprops){
    console.log('ManufactDetail', props);
    const { navigation, route } = props
    const { params } = route || {}

    const [dataItem, setDataItem] = useState(params?.item)
    
    useEffect(() =>{
        console.log('dataItem', dataItem);
        if(params?.item){
            setDataItem(params?.item)
        }
    },[])

    return(
        <View style={styles.container}>
            <HeaderName title={lang?.manufacturings} goBack={() => navigation?.goBack()}/>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >

                {dataItem?.uri && <View style={styles.imageManu}>
                    <AsyncImage size={100}/>
                </View>}

                <Text style={styles.txt_name}>{dataItem?.name || lang.emptyText}</Text>
                <View
                    style={styles.viewPhone}
                >
                    <Text style={styles.txt_phone}>{dataItem?.phone || lang.emptyText}</Text>

                    
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorApp.white
    },
    scrollView:{
        paddingLeft:settingApp.space_16, paddingRight:settingApp.space_16
    },
    imageManu:{
        width: 120,
        height:120,
    },
    txt_name:{
        fontSize:settingApp.size_20,
        fontWeight:"600",
        color:colorApp.colorText
    },
    viewPhone:{
        width:settingApp.width_32,
        height:30,
        justifyContent:'center'
    },
    txt_phone:{
        fontSize:settingApp.size_16,
    }
})

