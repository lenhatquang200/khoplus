import { colorApp } from 'public';
import CONSTANTS from 'public/CONSTANTS';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const defaultValue ={
    colorBackground:colorApp.transparent,
    colorText:colorApp.colorText
}

export default function ItemDate(props) {
    const  { state, date, listCheckin } = props
    const [dataDate, setDataDate] = useState({...date, ...defaultValue})

    useEffect(() =>{
        getStateForDate()
    },[])

    function getStateForDate(){
        const { listCheckin, date } = props || {}
        if(listCheckin && listCheckin?.length !== 0){
            listCheckin.map(item =>{
                if(item?.date === date?.day && 
                    item?.month === date?.month &&
                    item?.year === date?.year
                ){
                    let colorBackground = colorApp.transparent
                    let colorText = colorApp.colorText
                    if(item?.value === CONSTANTS.FULL_CHECKIN){
                        colorBackground = colorApp.checkinFullDay
                        colorText = colorApp.white
                    }
                    else if(item?.value === CONSTANTS.MORNING_CHECKIN){
                        colorBackground = colorApp.checkinMorningDay
                    }
                    else if(item?.value === CONSTANTS.AFTERNOON_CHECKIN){
                        colorBackground = colorApp.checkinAffterDay
                    }
                    setDataDate({
                        ...item,
                        colorBackground,
                        colorText
                    })
                }
            })
        }
    }

    return (
        <TouchableOpacity
            onPress={() => props?.handleDateSelected(dataDate)}
            style={[styles.container,{
                backgroundColor:dataDate?.colorBackground ? dataDate?.colorBackground : colorApp.transparent
            }]}
        >
            <Text style={{textAlign: 'center', 
                color: dataDate?.colorText,
            }}>{dataDate.date}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colorApp.transparent,
        justifyContent: "center",
        alignItems: "center"
    }
})