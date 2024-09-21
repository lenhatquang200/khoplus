import React, { useEffect, useRef } from 'react';
import { View, Text,StyleSheet, Platform, StatusBar, AppState, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera"

import { useIsFocused } from '@react-navigation/native';
import settingApp from 'public/settingApp';
import colorApp from 'public/colorApp';
import NavigationRoot from 'router';

const { width } = settingApp
const qrSize = width * 0.7; // Kích thước khung quét QR
const borderLength = 50
const color = colorApp.blue_primary
const thickness = 10;
const borderRadius = 30
const horrizon = settingApp.width * 0.2
const vertical = settingApp.height * 0.3

const QRCodeScanner = ({
  onResult, 
  verticalProps = vertical, 
  horrizonProps,
  isBack = false
}) => {
  
  const [permission, requestPermission] = useCameraPermissions();
  const isPremissionGranted = Boolean(permission?.granted)
  const isFocused = useIsFocused()

  const qrLock = useRef(false)
  const appState = useRef(AppState?.currentState);

  useEffect(() =>{
    qrLock.current = false
    
  },[])

  useEffect(() => {
    if(isFocused){
      qrLock.current = false
      requestPermission()
    }
  }, [isFocused])

  function handleQRCode(data) {
    if(onResult){
      onResult(data)
    }
    // Linking.openURL(data)
  }

  return (
    <View style={styles.container}>
      {Platform?.OS === "android" ? <StatusBar hidden /> : null}
      
      <CameraView
          style={StyleSheet.absoluteFillObject}
          facing='back'
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(async () => {
                handleQRCode(data)
              }, 500);
            }
          }}
        >
        <TouchableOpacity 
        onPress={() => NavigationRoot.pop()}
        style={styles.buttonBack}>
          <Text style={styles.txtGoback}>{'Quay lại'}</Text>
        </TouchableOpacity>
         <View style={styles.overlay}>
          {/* Khung quét QR */}
          {/* <View style={styles.qrContainer}>
          </View> */}

          <View style={[styles.top_left_radius,]}></View>
          <View style={[styles.top_right_radius,]}></View>
          <View style={[styles.bottom_left_radius, { bottom: verticalProps, left: horrizonProps}]}></View>
          <View style={[styles.bottom_right_radius, { bottom: verticalProps, right: horrizonProps} ]}></View>

          {/* Hướng dẫn */}
          <Text style={styles.instructionText}>
            Di chuyển mã QR vào trong khung để quét
          </Text>
        </View>
        </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    width: qrSize,
    height: qrSize,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colorApp.blue_primary,
    backgroundColor: 'transparent',
  },
  instructionText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    position:"absolute",
    bottom:settingApp.height * 0.2
  },
  scannedText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  top_left_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    top: vertical, 
    left: horrizon, 
    borderColor: color, 
    borderTopWidth: thickness, 
    borderLeftWidth: thickness, 
    borderTopLeftRadius: borderRadius 
  },
  bottom_left_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    bottom: vertical, 
    left: horrizon, 
    borderColor: color, 
    borderBottomWidth: thickness, 
    borderLeftWidth: thickness, 
    borderBottomLeftRadius: borderRadius 
  },
  top_right_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    top: vertical, 
    right: horrizon, 
    borderColor: color,
    borderTopWidth: thickness, 
    borderRightWidth: thickness, 
    borderTopRightRadius: borderRadius 
  },
  bottom_right_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    bottom: vertical, 
    right:  horrizon, 
    borderColor: color, 
    borderBottomWidth: thickness, 
    borderRightWidth: thickness, 
    borderBottomRightRadius: borderRadius 
  },
  buttonBack:{
    width:120,
    height:50,
    borderRadius:25,
    backgroundColor:colorApp.white,
    position:"absolute",
    left:24,
    bottom:60,
    justifyContent:"center",
    alignItems:'center',
    zIndex:2
  },
  txtGoback:{
    fontSize:14,
    color:colorApp.colorText,
    fontWeight:"500"
  }
});

export default QRCodeScanner;