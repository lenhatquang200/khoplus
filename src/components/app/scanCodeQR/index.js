import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Pressable, Platform, StatusBar, AppState, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera"
import { colorApp, settingApp } from 'public';
import { useIsFocused } from '@react-navigation/native';
import { QRCodeScanner } from 'public/component';

const { width } = settingApp
const qrSize = width * 0.7; // Kích thước khung quét QR
const ScannerCode = () => {
  return (
        <QRCodeScanner />
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
    borderColor: colorApp.blue_primary, // Màu xanh lá giống MoMo
    backgroundColor: 'transparent',
  },
  instructionText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  scannedText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ScannerCode;