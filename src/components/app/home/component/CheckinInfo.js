import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colorApp, Icon, settingApp, Utils } from "../../../../public";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { getInfoCheckin } from "KhoPlus/api/apiCall";
import { ApiCall } from "KhoPlus";
import { getTimeDate, isEmptyObject } from "public/Utils";
import CONSTANTS from "public/CONSTANTS";

const infoSize = (settingApp.width_32 / 2) - 8
const CheckinInfo = (props) => {
  const { colleague } = props || {};
  const [colorCheckIn, setColorCheckin] = useState(colorApp.nonCheckin)
  const [titleTime, setTitleTime] = useState('Chấm công');
  const [countLeave, setCountLeave] = useState(0)
  const [countRollup, setCountRollup] = useState('0/0')

  useEffect(() => {
    if (colleague) {
      getCheckin()
    }
    getColorCheckin()
  }, []);

  function getColorCheckin() {

  }

  async function getCheckin() {
    const { code } = colleague || {}
    const time = new Date().getTime()
    const response = await ApiCall.getInfoCheckin(code, time)
    const timeTime = getTimeDate(true)
    if (response && response?.data) {
      // xử lý thông tin checkin của ngày hôm nay
      const { info, listOnLeave, listRollup } = response?.data || {}
      const _leave = listOnLeave?.length ? listOnLeave?.length : 0
      setCountLeave(_leave)
      getCheckinToday(info)
      getlistRollup(listRollup)
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
    }
  }

  const today = getTimeDate('dd/mm/yyyy')  // Lấy năm
  return (
    <View style={styles.container}>
      <View style={[styles.infoToday, { backgroundColor: colorCheckIn }]}>
        <View style={styles.alarm}>
          <FontAwesome5
            name="calendar-check"
            color={colorApp.white}
            size={20}
          />
        </View>
        <Text style={styles.dayMonth}>{today}</Text>

        <View style={styles.view_txt_checkin}>
          <Text style={styles.txtCheckin}>{titleTime}</Text>
          <Icon.arrow_Right color={settingApp.white} />
        </View>

      </View>

      <View style={styles.infoOther}>
        <View style={styles.infoList}>
          <Text style={styles.textCheckinList}>{`Lịch chấm công`}</Text>
          <Text style={styles.textCheckinCount}>{countRollup}</Text>
        </View>

        <View style={styles.infoLeave}>
          <Text style={styles.textCheckinList}>{`Nghỉ phép`}</Text>
          <Text style={styles.textCheckinCount}>{countLeave}</Text>
        </View>
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
    height: (infoSize / 2) - 12,
    backgroundColor: "#E6E6FA",
    marginLeft: 18,
    borderRadius: 12,
    padding: 12
  },
  infoLeave: {
    width: infoSize,
    height: (infoSize / 2) - 12,
    backgroundColor: "#FFE1FF",
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
    marginTop: 12,
    color: colorApp.white,
    fontWeight: "600"
  },
  view_txt_checkin: {
    flexDirection: "row",
    alignItems: "center",
    width: infoSize,
    height: 40,
    marginTop: 20,
  },
  textCheckinList: {
    fontSize: 16,
    color: colorApp.colorPlaceText,
  },
  textCheckinCount: {
    fontSize: 18,
    color: colorApp.colorText,
    fontWeight: "600",
    marginTop:5
  }
});
