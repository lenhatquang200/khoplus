import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Alert, AppState } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from "expo-camera"
import * as ImagePicker from 'expo-image-picker';

import { colorApp, Icon, lang, settingApp } from 'public';
import NavigationRoot from 'router';
import { useIsFocused } from '@react-navigation/native';


const { width } = settingApp
const qrSize = width * 0.7; // Kích thước khung quét QR
const borderLength = 50
const color = colorApp.blue_primary
const thickness = 10;
const borderRadius = 30
const _top = settingApp.height * 0.3

const ScanDomain = (props) => {
  const { navigation, dataLogin } = props?.route?.params || {}
  
  useEffect(() => {
    navigation?.setOptions({
      onGetParams: onSetParamScan,
    });
  }, [navigation]);

  const [permission, requestPermission] = useCameraPermissions();
  const isPremissionGranted = Boolean(permission?.granted)
  const isFocused = useIsFocused()

  const qrLock = useRef(false)

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


  function onSetParamScan(linkScan){
    const { route } = props
    route?.params?.onGetParams && route?.params?.onGetParams({
      dataLogin,
      linkScan
    });
    NavigationRoot?.pop()
  }
    
  function handleScanner(result) {
    if(result){
      onSetParamScan(result)
    } else{
      Alert.alert("Thông báo", "Có lỗi khi quét QR, vui lòng thử lại", [
        {
          text: lang.close,
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  }

  async function onSelectImage(){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (result && result.assets[0].uri) {
        try {
          const scannedResults = await Camera.scanFromURLAsync(result?.assets[0].uri)
          const dataQR = scannedResults[0]?.data;
          if(dataQR){
            onSetParamScan(dataQR)
          } else{
            Alert.alert("Lỗi", "Bạn cần chọn hình ảnh có mã QR code", [
              {
                text: lang.close,
                onPress: () => null,
                style: "cancel",
              },
            ]);
          }
        } catch (error) {
          Alert.alert("Lỗi", "Bạn cần chọn hình ảnh có mã QR code", [
            {
              text: lang.close,
              onPress: () => null,
              style: "cancel",
            },
          ]);
        }
      }
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
                handleScanner(data)
              }, 500);
            }
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          >
        
         <View style={styles.overlay}>
            <View style={[styles.top_left_radius,]}></View>
            <View style={[styles.top_right_radius,]}></View>
            <View style={[styles.bottom_left_radius]}></View>
            <View style={[styles.bottom_right_radius]}></View>
            <Text style={styles.instructionText}>
              {'Di chuyển mã QR vào trong khung để quét'}
            </Text>
        </View>

        <TouchableOpacity 
          onPress={() => NavigationRoot.pop()}
          style={styles.buttonBack}>
          <Text style={styles.txtGoback}>{'Quay lại'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onSelectImage}
          style={styles.buttonImage}>
          <Icon.icon_Image />
        </TouchableOpacity>

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
    bottom:settingApp.height * 0.2,
    width:settingApp.width
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
    top: _top, 
    left: 80, 
    borderColor: color, 
    borderTopWidth: thickness, 
    borderLeftWidth: thickness, 
    borderTopLeftRadius: borderRadius 
  },
  bottom_left_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength,
    top: _top + 180,
    left: 80, 
    borderColor: color, 
    borderBottomWidth: thickness, 
    borderLeftWidth: thickness, 
    borderBottomLeftRadius: borderRadius 
  },
  top_right_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    top: _top, 
    right: 80, 
    borderColor: color,
    borderTopWidth: thickness, 
    borderRightWidth: thickness, 
    borderTopRightRadius: borderRadius 
  },
  bottom_right_radius:{
    position: 'absolute', 
    height: borderLength, 
    width: borderLength, 
    bottom: _top + 110, 
    right:  80, 
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
    left:60,
    bottom:80,
    justifyContent:"center",
    alignItems:'center',
    zIndex:2
  },
  txtGoback:{
    fontSize:14,
    color:colorApp.colorText,
    fontWeight:"500"
  },
  buttonImage:{
    width:120,
    height:50,
    borderRadius:25,
    backgroundColor:colorApp.white_opacity_05,
    position:"absolute",
    bottom:80,
    right:60,
    justifyContent:"center",
    alignItems:'center',
    zIndex:2
  }
});
export default ScanDomain;