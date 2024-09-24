import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, AppState, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions, Camera } from "expo-camera"
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import settingApp from 'public/settingApp';
import colorApp from 'public/colorApp';
import NavigationRoot from 'router';
import * as Icon from "../icon"
import lang from "../locate";

const { width } = settingApp
const qrSize = width * 0.7; // Kích thước khung quét QR
const borderLength = 50
const color = colorApp.blue_primary
const thickness = 10;
const borderRadius = 30
const padding =  70

const QRCodeScanner = ({
  onResult,
  isBack = false
}) => {

  const [permission, requestPermission] = useCameraPermissions();
  const isPremissionGranted = Boolean(permission?.granted)
  const isFocused = useIsFocused()

  const qrLock = useRef(false)
  const appState = useRef(AppState?.currentState);

  useEffect(() => {
    qrLock.current = false

  }, [])

  useEffect(() => {
    if (isFocused) {
      qrLock.current = false
      requestPermission()
    }
  }, [isFocused])

  function handleQRCode(data) {
    if (onResult) {
      onResult(data)
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
        if(dataQR ){
          handleQRCode(dataQR)
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
              handleQRCode(data)
            }, 500);
          }
        }}

        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >

        <View style={styles.overlay}>
          <View style={{
            width: settingApp.width,
            height: settingApp.width / 1.5,
            marginBottom: 150,
          }}>
            <View style={[styles.top_left_radius,]}></View>
            <View style={[styles.top_right_radius,]}></View>
            <View style={[styles.bottom_left_radius]}></View>
            <View style={[styles.bottom_right_radius]}></View>
          </View>

          {/* Hướng dẫn */}

        </View>

        <Text style={styles.instructionText}>
          {'Di chuyển mã QR vào trong khung để quét'}
        </Text>
        {isBack && <TouchableOpacity
          onPress={() => NavigationRoot.pop()}
          style={styles.buttonBack}>
          <Text style={styles.txtGoback}>{'Quay lại'}</Text>
        </TouchableOpacity>}

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
    position: "absolute",
    bottom: settingApp.height * 0.2,
    width: settingApp.width
  },
  scannedText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  top_left_radius: {
    position: 'absolute',
    height: borderLength,
    width: borderLength,
    top: 0,
    left: padding,
    borderColor: color,
    borderTopWidth: thickness,
    borderLeftWidth: thickness,
    borderTopLeftRadius: borderRadius
  },
  bottom_left_radius: {
    position: 'absolute',
    height: borderLength,
    width: borderLength,
    bottom: 0,
    left: padding,
    borderColor: color,
    borderBottomWidth: thickness,
    borderLeftWidth: thickness,
    borderBottomLeftRadius: borderRadius
  },
  top_right_radius: {
    position: 'absolute',
    height: borderLength,
    width: borderLength,
    top: 0,
    right: padding,
    borderColor: color,
    borderTopWidth: thickness,
    borderRightWidth: thickness,
    borderTopRightRadius: borderRadius
  },
  bottom_right_radius: {
    position: 'absolute',
    height: borderLength,
    width: borderLength,
    bottom: 0,
    right: padding,
    borderColor: color,
    borderBottomWidth: thickness,
    borderRightWidth: thickness,
    borderBottomRightRadius: borderRadius
  },
  buttonBack: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: colorApp.white,
    position: "absolute",
    left: 50,
    bottom: 80,
    justifyContent: "center",
    alignItems: 'center',
    zIndex: 2
  },
  txtGoback: {
    fontSize: 14,
    color: colorApp.colorText,
    fontWeight: "500"
  },
  buttonImage:{
    width:120,
    height:50,
    borderRadius:25,
    backgroundColor:colorApp.white_opacity_05,
    position:"absolute",
    bottom:80,
    right:50,
    justifyContent:"center",
    alignItems:'center',
    zIndex:2
  }
});

export default QRCodeScanner;