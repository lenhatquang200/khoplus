import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import settingApp from 'public/settingApp';
import colorApp from 'public/colorApp';
import { Icon } from 'public';
import RealTimeClock from './RealTimeClock';
import CONSTANTS from 'public/CONSTANTS';

const AttendanceBottomSheet = forwardRef(({ onSelect, colleague }, ref) => {
  const bottomSheetRef = useRef(null);

  // Snap points cho BottomSheet
  const snapPoints = useMemo(() => ['65%'], []);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  function onPressCheckIn(value){
    const timekeeping = new Date().getTime();
    onSelect({
      value:value,
      timekeeping:timekeeping
    })
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1} // Ban đầu đóng BottomSheet
    >
    <TouchableOpacity 
      onPress={() => bottomSheetRef?.current?.close()}
      style={styles.buttonClose}>
      <Icon.icon_Close />
    </TouchableOpacity>

      <View style={styles.inforStore}>
          <Text style={styles.titleHeader}>{"Bạn đang thực hiện chấm công tại"}</Text>
          <Text style={styles.nameStore}>{colleague?.store?.name || "--"}</Text>
          <RealTimeClock 
            styleTime={styles.styleTime}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonFullDay} onPress={() => onPressCheckIn(CONSTANTS.FULL_CHECKIN)}>
          <Text style={styles.buttonTextFullDay}>Cả ngày</Text>
        </TouchableOpacity>

      <View style={styles.viewOption}>
        <TouchableOpacity style={[styles.buttonOption,{
          borderColor:colorApp.checkinMorningDay
        }]} onPress={() => onPressCheckIn(CONSTANTS.MORNING_CHECKIN)}>
        
            <Text style={[styles.buttonTextOption,{
              color:colorApp.checkinMorningDay
            }]}>Ca Sáng</Text>
        
          </TouchableOpacity>
        
        
          <TouchableOpacity style={[styles.buttonOption,{
            borderColor: colorApp.checkinAffterDay
          }]} onPress={() => onPressCheckIn(CONSTANTS.AFTERNOON_CHECKIN)}>
           
            <Text style={[styles.buttonTextOption,{
              color:colorApp.checkinAffterDay
            }]}>Ca Chiều</Text>
          
          </TouchableOpacity>
      </View>
       
       
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonFullDay:{
    width:settingApp.width_32-64,
    height:80,
    borderWidth:3,
    borderColor:colorApp.checkinFullDay,
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonTextFullDay:{
    color:colorApp.checkinFullDay,
    fontWeight:"600",
    fontSize:20
  },
  buttonOption:{
    width:(settingApp.width_32-84)/ 2,
    height:60,
    borderWidth:3,
    borderColor:colorApp.light_blue,
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
  },
  viewOption:{
    width:settingApp.width_32-64,
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:12
  },
  buttonTextOption:{
    fontWeight:"600",
    fontSize:20
  },
  inforStore:{
    width:settingApp.width,
    minHeight:40,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:24
  },
  titleHeader:{
    fontSize:14,
    color:colorApp.colorText,
    fontWeight:"500",
  },
  nameStore:{
    fontSize:20,
    color:colorApp.blue_primary,
    fontWeight:"500",
    marginTop:10
  },
  buttonClose:{
    position:"absolute",
    top:0,
    right:0,
    width:40,
    height:40,
    zIndex:5
  },
  styleTime:{
    marginTop:12,
    fontSize:18,
    color:colorApp.deepSkyBlue
  }
});

export default AttendanceBottomSheet;
