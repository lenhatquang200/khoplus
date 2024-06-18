import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { LinearBackGround } from "public/component";
import { colorApp, settingApp } from "public";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRcode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearBackGround />
      <View style={{}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colorApp.white,
            marginBottom: 16,
          }}
        >
          {"Di chuyển camera vào vừa tầm với mã QR"}
        </Text>
      </View>
      <View
        style={{
          width: settingApp.width * 0.8,
          height: settingApp.width * 0.8,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: settingApp.width * 0.8,
            height: settingApp.width * 0.8,
            borderRadius: 16,
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: colorApp.white,
          marginTop: 16,
          textAlign: "center",
        }}
      >
        {
          "Có thể scan mã QR cho việc tạo phiếu bán hàng, kiểm kho, nhập kho,..."
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
