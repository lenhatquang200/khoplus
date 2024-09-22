import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colorApp, Icon, settingApp } from "../../../../public";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const infoSize = (settingApp.width_32/2) - 8
export default function CheckinInfo(props) {
  const { colleague } = props || {};
  const [tilteHello, setTitle] = useState("");
  const [shortName, setShortName] = useState("");

  useEffect(() => {
    console.log('colleague', colleague);
    
  }, []);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');  // Lấy ngày và thêm số 0 nếu < 10
  const month = String(today.getMonth() + 1).padStart(2, '0');  // Lấy tháng (tháng trong JS bắt đầu từ 0)
  const year = today.getFullYear();  // Lấy năm
  return (
    <View style={styles.container}>
        <View style={styles.infoToday}>
            <View style={styles.alarm}>
                <FontAwesome5 
                    name="calendar-check"
                    color={colorApp.white}
                    size={20}
                />
            </View>
            <Text style={styles.dayMonth}>{`${day}/${month}/${year}`}</Text>
            {/* <Text style={styles.txtToday}>{"Hôm nay"}</Text> */}

            <View style={styles.view_txt_checkin}>
                <Text style={styles.txtCheckin}>{"Chấm công"}</Text>
                <Icon.arrow_Right color={settingApp.white} />
            </View>
            
        </View>

        <View style={styles.infoOther}>
            <View style={styles.infoList}>
                <Text style={styles.textCheckinList}>{`Lịch chấm công`}</Text>
                <Text style={styles.textCheckinCount}>{`12/30`}</Text>
            </View>

            <View style={styles.infoLeave}>
                <Text style={styles.textCheckinList}>{`Nghỉ phép`}</Text>
                <Text style={styles.textCheckinCount}>{`0`}</Text>
            </View>
        </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: settingApp.width_32,
    minHeight:80,
    flexDirection: "row",
    marginLeft:settingApp.space_16,
  },
  infoToday:{
    width:infoSize,
    backgroundColor:"#5D478B",
    height:infoSize,
    borderRadius:12,
    padding:12,
    ...settingApp.shadow_Top
  },
  infoOther:{
    width:infoSize,
    height:infoSize,
  },
  infoList:{
    width:infoSize,
    height: (infoSize/2) - 12,
    backgroundColor:"#E6E6FA",
    marginLeft:18,
    borderRadius:12,
    padding:12
  },
  infoLeave:{
    width:infoSize,
    height: (infoSize/2) - 12,
    backgroundColor:"#FFE1FF",
    marginLeft:18,
    borderRadius:12,
    marginTop:16,
    padding:12
  },
  alarm:{
    width: 40,
    height: 40,
    backgroundColor: colorApp.white_opacity_02,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtCheckin:{
    fontSize:22,
    color:colorApp.white,
    fontWeight:"bold",
    lineHeight:26
  },
  dayMonth:{
    fontSize:16,
    marginTop:12,
    color:colorApp.white,
    fontWeight:"600"
  },
  view_txt_checkin:{
    flexDirection:"row",
    alignItems:"center",
    width:infoSize,
    height:40,
    marginTop:20,
  },
  textCheckinList:{
    fontSize:16,
    color:colorApp.colorPlaceText,
  },
  textCheckinCount:{
    fontSize:16,
    color:colorApp.colorText,
    fontWeight:"600"
  }
});
