import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colorApp, Icon, settingApp } from "../../../../public";
import { FontAwesome5 } from "@expo/vector-icons";
import { ApiCall } from "KhoPlus";
import { getTimeDate, isEmptyObject } from "public/Utils";
import CONSTANTS from "public/CONSTANTS";
import NavigationRoot from "router";
import { screenName } from "router/screenName";

const infoSize = (settingApp.width_32 / 2) - 8
let dataCheckin = null

const CheckinInfo = (props) => {
  const { colleague , showBottomCheckin, infoCheckToday } = props || {};
  const [colorCheckIn, setColorCheckin] = useState(colorApp.nonCheckin)
  const [titleTime, setTitleTime] = useState('Chấm công');
  const [countRollup, setCountRollup] = useState('0/0')
  const [isLoading, setIsLoading] = useState(true)
  const [disabledCheckin, setDisableCheckin] = useState(false)
  const [pointCheckin, setPointCheking] = useState(0)
  const [infoCheckin, setInfo] = useState(null)
  const [infoLeave, setInfoLeave] = useState(null)
  

  useEffect(() => {
    if (colleague) {
      getCheckin()
    }
  }, []);

  useEffect(() =>{
    if(infoCheckToday?.value){
      getCheckin()
    }
  },[infoCheckToday])

  async function getCheckin() {
    const { code } = colleague || {}
    const time = new Date().getTime()
    const response = await ApiCall.getInfoCheckin(code, time)
    if (response && response?.data) {
      dataCheckin = response?.data
      // xử lý thông tin checkin của ngày hôm nay
      const { info, listOnLeave, listRollup } = response?.data || {}
      setInfo(info)
      countPoint(listRollup)
      countLeave_Func(listOnLeave)
      getCheckinToday(info)
      getlistRollup(listRollup)
    }
    setIsLoading(false)
  }

  function countPoint(listRollup){
    let number = 0
    if(listRollup.length !== 0){
      listRollup.map(item =>{
        if(item && item?.point != 0){
          number = number + item?.point
        }
      })
    }
    setPointCheking(number)
  }

  function countLeave_Func(listOnLeave){
    const currentMonth = getTimeDate('mm/yyyy')
    if(listOnLeave.length !=0 ){
      listOnLeave.map(item =>{
        if(item?.month === currentMonth.toString()){
            setInfoLeave(item)          
        }
      })
    }
  }

  function getlistRollup(listRollup){
    if(listRollup && listRollup?.length !== 0){
      const _listNumber = listRollup.filter(e => e.value !== CONSTANTS.NON_CHECKIN)
      const totalCount = listRollup?.length
      setCountRollup(`${_listNumber?.length}/${totalCount}`)
    }
    else{
      setCountRollup('0/0')
    }
  }

  function getCheckinToday(info){
    if (isEmptyObject(info)) {
      setColorCheckin(colorApp.nonCheckin)
      
    }
    else {
      const { value, time_show } = info
      const timeTitle = time_show.split(' ')[1];
      switch (value) {
        case CONSTANTS.FULL_CHECKIN:
          setColorCheckin(colorApp.checkinFullDay)
          break;
        case CONSTANTS.MORNING_CHECKIN:
          setColorCheckin(colorApp.checkinMorningDay)
          break;
        case CONSTANTS.AFTERNOON_CHECKIN:
          setColorCheckin(colorApp.checkinAffterDay)
          break;
        default: setColorCheckin(colorApp.nonCheckin)
          break;
      }
      setTitleTime(timeTitle)
      setDisableCheckin(true)
    }
  }


  const today = getTimeDate('dd/mm/yyyy')
  const tileCheckin = disabledCheckin ? "Đã chấm công" : "Bạn chưa chấm công"
  return (
    <View style={styles.container}>
    {/* Thông tin chấm công */}
      <TouchableOpacity 
      // disabled={disabledCheckin}
      onPress={() => showBottomCheckin()}
      style={[styles.infoToday, { backgroundColor: colorCheckIn }]}>
      <View style={styles.viewAlarm}>
        <View style={styles.alarm}>
            <FontAwesome5
              name="calendar-check"
              color={colorApp.white}
              size={20}
            />
          </View>
          <Text style={styles.dayMonth}>{today}</Text>
      </View>
        

        <>
          <Text style={styles.txtCheckinToday}>{tileCheckin}</Text>
          <Text style={styles.txtCheckinToday}>{infoCheckin?.name || ''}</Text>
        </>

        <View style={[styles.view_txt_checkin,{
            marginTop: disabledCheckin ? 0 : 20,
        }]}>
          <Text style={styles.txtCheckin}>{titleTime}</Text>
          {!disabledCheckin && <Icon.arrow_Right color={settingApp.white} />}
        </View>
        
      </TouchableOpacity>

      <View style={styles.infoOther}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => NavigationRoot.push(screenName.CHECKIN, {
            dataCheckin:dataCheckin
          })}
          style={styles.infoList}>
          <Text style={styles.textCheckinList}>{`Lịch chấm công`}</Text>
          <Text style={styles.textCheckinCount}>{countRollup + ' - ' + pointCheckin + ' công'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => NavigationRoot.push(screenName.LEAVE, {
            dataCheckin:dataCheckin
          })}
          style={styles.infoLeave}>
          <Text style={styles.textCheckinList}>{`Nghỉ phép`}</Text>
          <Text style={styles.textCheckinCount}>{`${infoLeave?.amount || 0} lượt - ${infoLeave?.amount || 0} công`}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
export default React.memo(CheckinInfo)
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    minHeight: 80,
    flexDirection: "row",
    marginLeft: settingApp.space_16,
  },
  infoToday: {
    width: infoSize,
    backgroundColor: "#5D478B",
    height: infoSize,
    borderRadius: 12,
    padding: 12,
    ...settingApp.shadow_Top
  },
  infoOther: {
    width: infoSize,
    height: infoSize,
  },
  infoList: {
    width: infoSize,
    minHeigh: (infoSize / 2) - 12,
    backgroundColor: "#E6E6FA",
    marginLeft: 18,
    borderRadius: 12,
    padding: 12
  },
  infoLeave: {
    width: infoSize,
    height: (infoSize / 2) - 12,
    backgroundColor: colorApp.colorLeave,
    marginLeft: 18,
    borderRadius: 12,
    marginTop: 16,
    padding: 12
  },
  alarm: {
    width: 40,
    height: 40,
    backgroundColor: colorApp.white_opacity_02,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtCheckin: {
    fontSize: 22,
    color: colorApp.white,
    fontWeight: "bold",
    lineHeight: 26
  },
  dayMonth: {
    fontSize: 16,
    color: colorApp.white,
    fontWeight: "600",
    marginLeft:8
  },
  view_txt_checkin: {
    flexDirection: "row",
    alignItems: "center",
    width: infoSize,
    height: 40,
    
  },
  textCheckinList: {
    fontSize: 16,
    color: colorApp.colorPlaceText,
  },
  textCheckinCount: {
    fontSize: 16,
    color: colorApp.colorText,
    fontWeight: "600",
    marginTop:5
  },
  txtCheckinToday:{
    fontSize:16,
    color:colorApp.white,
    fontWeight:"500"
  },
  viewAlarm:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:8
  }
});
