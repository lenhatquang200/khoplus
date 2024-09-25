import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { colorApp, imageApp, settingApp, ToastShow } from "../../../public";
import HeaderHome from "./component/headerHome";
import { AttendanceBottomSheet, SafeEra } from "public/component";
import { ApiCall } from "KhoPlus";
import ChartReport from "./component/chartReport";
import CheckinInfo from "./component/CheckinInfo";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const colleague = useSelector((state) => state?.app?.colleague);
  const [infoCheckToday, setInfoToday] = useState(null)

  const bottomSheetRef = useRef(null);


  const handleSelectOption = async (option) => {
    const { value, timekeeping } = option;
    const { code } = colleague
    const response = await ApiCall.timekeepingToday(code, value, timekeeping )
    if(response && response?.data?.info){
      setInfoToday(response?.data?.info)
      bottomSheetRef.current?.close(); 
    }
    else{
      ToastShow("Chấm công thất bại. Vui lòng thử lại")
    }
    // setSelectedOption(option);
    // bottomSheetRef.current?.close(); 
  };

 

  return (
    <SafeEra style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewBanner}>
          <Image source={imageApp.bannerHome} style={{width:settingApp.width_32, height:160, borderRadius:8,}} resizeMode={"cover"} />
        </View>
        <HeaderHome colleague={colleague} />
        <CheckinInfo  
          colleague={colleague} 
          showBottomCheckin={() => bottomSheetRef?.current?.open()}
          infoCheckToday={infoCheckToday}
        />    
        <ChartReport colleague={colleague} />

        <View 
          style={{
            width:settingApp.width,
            height:60
          }}
        />

        <AttendanceBottomSheet 
          ref={bottomSheetRef} onSelect={handleSelectOption}
          colleague={colleague}  
        />
      </ScrollView>
    </SafeEra>

  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colorApp.white_snow
  },
  statusBar: {
    width: settingApp.width,
    height: settingApp.statusBarHeight,
  },

  viewBanner:{
    width: settingApp.width,
    height:162,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    overflow:'hidden',
    marginTop:24
  }
});
