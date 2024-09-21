import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Pressable, Platform, StatusBar, AppState, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera"
import { colorApp, settingApp } from 'public';
import { useIsFocused } from '@react-navigation/native';
import { QRCodeScanner } from 'public/component';

const { width } = settingApp
const ScanDomain = () => {
    
  function handleScanner(result) {
    console.log("handleScanner", result);

  }

  return (
    <QRCodeScanner
      onResult={handleScanner}
      horrizonProps={settingApp.width * 0.2}
      verticalProps={settingApp.height * 0.4}
      isBack={true}
    />
  );
};
export default ScanDomain;