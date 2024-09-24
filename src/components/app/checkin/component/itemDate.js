import { colorApp, Utils } from 'public';
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
    const [isCurrent, setIscurrent] = useState(false)

    useEffect(() =>{
        getStateForDate()
        checkCurrentDate()
    },[listCheckin])

    function checkCurrentDate(){
        const currentD = Number(Utils.getTimeDate('dd'))
        const currentM = Utils.getTimeDate('mm')
        const currentY = Number(Utils.getTimeDate("yyyy"))
        let newMonth = date?.month < 10 ? `0${date?.month}` : date?.month
        if(currentD === date?.day && currentM === newMonth && currentY === date?.year){
            setIscurrent(true)
        }
        else{
            setIscurrent(false)
        }
    }

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
        else{
            setDataDate({...defaultValue, date:date?.day})
        }
    }

    return (
        <TouchableOpacity
            onPress={() => props?.handleDateSelected(dataDate)}
            style={[styles.container,{
                backgroundColor:dataDate?.colorBackground ? dataDate?.colorBackground : colorApp.transparent,
                borderColor: isCurrent ? colorApp.red_001 : dataDate?.colorBackground,
                borderWidth: isCurrent ? 3 : 0
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