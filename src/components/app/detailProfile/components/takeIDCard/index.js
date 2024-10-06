import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colorApp, settingApp } from 'public';
import { useIsFocused } from '@react-navigation/native';
import NavigationRoot from 'router';
import { CameraView } from "expo-camera";
import { Camera, CameraType} from 'expo-camera/legacy';
import TYPE_TAKE from '../constants';

const { height, width } = settingApp

export default function TakeIDCard(props) {
    const { route } = props
    const { type } = route?.params || {}

    const [hasPermission, setHasPermission] = useState(null);
    const [scaning, setScanning] = useState(false);
    const [startScan,setStartScan] = useState(false)
    const [permission, requestPermission] = Camera?.useCameraPermissions();
    const [photoCard, setPhotoCard] = useState(null)

    const cameraRef = useRef()
    const translateY = useRef(new Animated.Value(-100)).current;

    const qrLock = useRef(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        qrLock.current = false
    }, [])

    useEffect(() => {
        const startAnimation = () => {
          translateY.setValue(-100);
          Animated.timing(translateY, {
            toValue: 500,
            duration: 2000,
            useNativeDriver: true,
          }).start(() => startAnimation());
        };
    
        startAnimation();
      }, [translateY]);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    useEffect(() => {
        if (isFocused) {
            qrLock.current = false
        }
    }, [isFocused])

    const handleBarCodeScanned = async ({ data }) => {
        if (scaning && data && !qrLock?.current) {
            qrLock.current = true
            const fields = data?.split('|');
            if (fields?.length !== 7) {
                throw new Error("Dữ liệu không hợp lệ");
            }
            const idCardInfo = {
                idNumber: fields[0],              // Mã số định danh cá nhân
                additionalId: fields[1],          // Mã số khác (nếu có)
                name: fields[2],                  // Tên
                dateOfBirth: fields[3],           // Ngày sinh
                gender: fields[4],                // Giới tính
                address: fields[5],               // Địa chỉ
                issueDate: fields[6], 
                base64:photoCard             // Ngày cấp hoặc ngày hết hạn
            };
            setStartScan(false)
            route?.params?.onGetParams && route?.params?.onGetParams({
                idCardInfo,
                type
            });
            NavigationRoot?.pop()
        }
    };

    

    const startScanning = async () => {
        setStartScan(true)
        const options = { base64: false, quality: 0.8 };
        const photo = await cameraRef?.current?.takePictureAsync(options);
        console.log("startScanning", photo);
        if(type == TYPE_TAKE.FONT){
            const idCardInfo = {
                idNumber: 1,              // Mã số định danh cá nhân
                additionalId: 2,          // Mã số khác (nếu có)
                name: 3,                  // Tên
                dateOfBirth: 4,           // Ngày sinh
                gender: 5,                // Giới tính
                address: 6,               // Địa chỉ
                issueDate: 7, 
                base64:photo             // Ngày cấp hoặc ngày hết hạn
            };
            route?.params?.onGetParams && route?.params?.onGetParams({
                idCardInfo,
                type
            });
            NavigationRoot?.pop()
            // setPhotoCard(photo)
            // setScanning(true);
        }
        else{
            setStartScan(false)
            route?.params?.onGetParams && route?.params?.onGetParams({
                photo,
                type
            });
            NavigationRoot?.pop()
        }
    };

    if (permission === null ||  hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            
            {scaning ?
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                >
                <View style={styles.overlay}>
                    <View style={styles.rectangleContainer}>
                        <Animated.View style={[styles.rectangle, { transform: [{ translateY }]}]}/>
                    </View>
                </View>
                </BarCodeScanner>
                :
                <Camera ref={cameraRef} style={StyleSheet.absoluteFillObject} type={CameraType.back}/>
            }
            <View style={styles.overlayTop}></View>
            <View style={styles.overlayBottom}></View>
            <View style={styles.overlayLeft}></View>
            <View style={styles.overlayRight}></View>

            {/* Khu vực chính giữa để scan */}
            <View style={styles.scanningArea}></View>

            {!scaning && !startScan && <TouchableOpacity
                onPress={() => startScanning()}
                style={styles.buttonScan}>
                <Text style={styles.txtScan}>{'Bắt đầu quét'}</Text>
            </TouchableOpacity>}

            <TouchableOpacity
                onPress={() => NavigationRoot.pop()}
                style={styles.buttonBack}>
                <Text style={styles.txtGoback}>{'Quay lại'}</Text>
            </TouchableOpacity>
            {startScan && <Text style={styles.instructionText_scaning}>{`Hãy giữ cố định khung hình cho đến khi quét xong`}</Text>}
            <Text style={styles.instructionText}>{`Đưa CCCD vào khung hình, giữ cố định\nsau đó nhấn "Bắt đầu quét"`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanner: {
        flex: 1,
    },
    overlayTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.35,
        backgroundColor: 'white',
    },
    overlayBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.35,
        backgroundColor: 'white',
    },
    overlayLeft: {
        position: 'absolute',
        top: height * 0.15,
        bottom: height * 0.15,
        left: 0,
        width: 12,
        backgroundColor: 'white',
    },
    overlayRight: {
        position: 'absolute',
        top: height * 0.15,
        bottom: height * 0.15,
        right: 0,
        width: 12,
        backgroundColor: 'white',
    },
    scanningArea: {
        position: 'absolute',
        left: 12,
        right: 12,
        top: height * 0.35,
        bottom: height * 0.35,
        borderColor: colorApp.blue_primary,
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
    instructionText: {
        marginTop: 20,
        fontSize: 18,
        color: colorApp.colorText,
        textAlign: 'center',
        position: "absolute",
        bottom: settingApp.height * 0.2,
        width: settingApp.width
    },
    buttonBack: {
        width: 120,
        height: 50,
        borderRadius: 25,
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 2,
        top: 60
    },
    txtGoback: {
        fontSize: 14,
        color: colorApp.colorText,
        fontWeight: "500"
    },
    buttonScan:{
        width: 150,
        height: 50,
        borderRadius: 12,
        position: "absolute",
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 2,
        backgroundColor:colorApp.white_opacity_05,
    },
    txtScan:{
        fontSize:18,
        color:colorApp.white,
        borderRadius:12,
    },
    overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    width: settingApp.width_32,
    height: settingApp.height * 0.29,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: 1,
    position: 'absolute',
    top: 0,
    backgroundColor:colorApp.blue_primary
  },
  instructionText_scaning:{
    fontSize: 18,
    color: colorApp.colorText,
    textAlign: 'center',
    position:"absolute",
    top:settingApp.height * 0.28
  }
});
