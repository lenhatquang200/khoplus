
import React, { Component, useEffect, useState, } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import NavigationRoot from 'router';
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';

import { screenName } from 'router/screenName';
import TYPE_TAKE from './components/constants';
import { ApiCall } from 'KhoPlus';
import { colorApp, Icon, settingApp, Utils } from 'public';
import { AvatarCustom, HeaderName, SafeEra } from 'public/component';

export default function DetailProfile({ }) {
    const colleague = useSelector(state => state?.app?.colleague)
    const { idcard } = colleague || {}

    const [dataCard, setDataCard] = useState(idcard)
    const fileName = 'image.jpg';

    useEffect(() => {

    }, [colleague])

    const getFileNameFromUri = (uri) => {
        // Sử dụng split('/') để tách các phần của URI
        const uriParts = uri.split('/');
        
        // Lấy phần cuối cùng của mảng là tên file
        return uriParts[uriParts.length - 1];
      };

      const getFileTypeFromUri = (uri) => {
        // Lấy tên file từ URI
        const fileName = uri.split('/').pop();
      
        // Lấy phần đuôi file (extension)
        const fileExtension = fileName.split('.').pop().toLowerCase();
      
        // Đối chiếu extension với các MIME type phổ biến
        const mimeTypes = {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'gif': 'image/gif',
          'bmp': 'image/bmp',
          'pdf': 'application/pdf',
          'txt': 'text/plain',
          'mp4': 'video/mp4',
          'mov': 'video/quicktime',
        };
      
        return mimeTypes[fileExtension] || null;
      };

    async function onGetParams(dataID) {
        console.log('onGetParams', dataID);
        const { type } = dataID
        if (type === TYPE_TAKE.FONT) {
            if (dataID?.idCardInfo) {
                const { idCardInfo } = dataID || {}
                const newData = {
                    address: idCardInfo?.address,
                    code: idCardInfo?.idNumber,
                    // birthday: Utils.formatDateByString(idCardInfo?.dateOfBirth),
                    // date_of_issue: Utils.formatDateByString(idCardInfo?.issueDate),
                    name: idCardInfo?.name,
                    fontCard: idCardInfo?.base64?.base64
                }
                const uri_imge = idCardInfo?.base64?.uri
                const fileInfo = await FileSystem.getInfoAsync(uri_imge);
                console.log('fileInfo', fileInfo);
                if (fileInfo.exists) {
                    const formData = new FormData();
                    formData.append('myFile', {
                        uri: fileInfo?.uri,   // The URI of the photo
                        name: getFileNameFromUri(uri_imge),  // Name of the file (you can customize this)
                        type: getFileTypeFromUri(uri_imge),
                        modificationTime:fileInfo?.modificationTime,
                        size:fileInfo?.size
                    });
                    console.log('formData', formData);
                    const response = await ApiCall.uploadIdCard(formData, colleague?.code, 1)
                    console.log('response', response);
                    setDataCard(newData)
                }
            }
        }
        else {
            if (dataID?.photo?.base64) {
                setDataCard({
                    ...dataCard,
                    backCard: dataID?.photo?.base64
                })
            }
        }
    }

    return (
        <SafeEra style={styles.container} overStatusBar>
            <HeaderName title={"Thông tin cá nhân"} goBack={() => NavigationRoot.pop()} />
            <ScrollView>
                <View style={styles.viewImage}>
                    <AvatarCustom picture={colleague?.photo} />
                    <View style={styles.viewInfo}>
                        <Text style={styles.txt_name}>{colleague?.name}</Text>
                        <Text style={styles.txt_code}>{colleague?.code}</Text>
                    </View>
                </View>

                <View style={styles.view_info_des}>
                    <View style={styles.view_description}>
                        <Icon.icon_Phone color={colorApp.disable} size={18} />
                        <Text style={[styles.txt_code, { marginLeft: 12 }]}>{colleague?.phone}</Text>
                    </View>

                    <View style={styles.view_description}>
                        <Icon.icon_Navigation color={colorApp.disable} size={18} />
                        <Text style={[styles.txt_code, { marginLeft: 12, flexWrap: "wrap" }]}>{colleague?.address}</Text>
                    </View>

                    <View style={styles.view_description}>
                        <Icon.icon_Birthday color={colorApp.disable} size={18} />
                        <Text style={[styles.txt_code, { marginLeft: 12 }]}>{colleague?.birthday || '--'}</Text>
                    </View>
                </View>

                {dataCard &&
                    <View style={styles.view_id_card}>
                        <Text style={[styles.title_id_card]}>{"Số CCCD"}</Text>
                        <Text style={[styles.txt_id_card]}>{dataCard?.code || '--'}</Text>


                        <Text style={[styles.title_id_card, { marginTop: 24 }]}>{"Ngày cấp"}</Text>
                        <Text style={[styles.txt_code]}>{dataCard?.date_of_issue || '--'}</Text>

                        <Text style={[styles.title_id_card, { marginTop: 24 }]}>{"Nơi cấp"}</Text>
                        <Text style={[styles.txt_code]}>{dataCard?.address || '--'}</Text>


                        <View style={styles.view_image_id}>
                            <Text style={[styles.title_id_card,]}>{"Ảnh CCCD"}</Text>

                            <View style={styles.imageCard}>
                                <Text style={[styles.txt_code]}>{"Mặt trước"}</Text>
                                {dataCard?.fontCard ?
                                    <Image
                                        style={{ width: settingApp.width_32, height: 240, marginTop: 12, marginBottom: 12 }}
                                        source={{
                                            uri: `data:image/png;base64, ${dataCard?.fontCard}`,
                                        }}
                                        resizeMode='cover'
                                    /> :
                                    <AntDesign name='idcard' size={220} color={colorApp.disable} />}
                                <TouchableOpacity
                                    onPress={() => NavigationRoot.push(screenName.TAKE_ID_CARD, {
                                        type: TYPE_TAKE.FONT,
                                        onGetParams
                                    })}
                                    style={styles.bt_takeID}>
                                    <Text style={styles.txt_takeID}>{"Chụp mặt trước"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.lineMid} />

                            <View style={styles.imageCard}>
                                <Text style={[styles.txt_code]}>{"Mặt sau"}</Text>

                                {dataCard?.backCard ?
                                    <Image
                                        style={{ width: settingApp.width_32, height: 240, marginTop: 12, marginBottom: 12 }}
                                        source={{
                                            uri: `data:image/png;base64, ${dataCard?.backCard}`,
                                        }}
                                        resizeMode='cover'
                                    /> :
                                    <AntDesign name='creditcard' size={220} color={colorApp.disable} />}
                                <TouchableOpacity
                                    onPress={() => NavigationRoot.push(screenName.TAKE_ID_CARD, {
                                        type: TYPE_TAKE.BACK,
                                        onGetParams
                                    })}
                                    style={styles.bt_takeID}>
                                    <Text style={styles.txt_takeID}>{"Chụp mặt sau"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}

                <View style={styles.footer} />
            </ScrollView>
        </SafeEra>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewImage: {
        width: settingApp.width,
        minHeight: 60,
        backgroundColor: colorApp.white,
        flexDirection: "row",
        padding: 12
    },
    viewInfo: {
        width: settingApp.width - 48 - 80,
        marginLeft: 12,
        justifyContent: "center",
    },
    txt_name: {
        fontSize: 20,
        fontWeight: "600",
        color: colorApp.colorText
    },
    txt_code: {
        fontSize: 14,
        fontWeight: "400",
        color: colorApp.colorPlaceText
    },
    view_info_des: {
        width: settingApp.width,
        minHeight: 60,
        backgroundColor: colorApp.white,
        padding: 12
    },
    view_description: {
        flexDirection: "row",
        width: settingApp.width_32 - 12,
        minHeight: 30,
        alignItems: "center",
        marginLeft: 12
    },
    view_id_card: {
        width: settingApp.width,
        minHeight: 60,
        backgroundColor: colorApp.white,
        marginTop: 12,
        padding: 12
    },
    title_id_card: {
        fontSize: 16,
        color: colorApp.colorText,
        fontWeight: "600"
    },
    txt_id_card: {
        fontSize: 16,
        color: colorApp.colorPlaceText,
    },
    view_image_id: {
        width: settingApp.width_32,
        minHeight: 60,
        backgroundColor: colorApp.white,
        marginTop: 24
    },
    imageCard: {
        width: settingApp.width_32,
        minHeight: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        width: settingApp.width,
        height: 60,
        backgroundColor: colorApp.white
    },
    bt_takeID: {
        width: settingApp.width_32 / 2.5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorApp.light_blue,
        borderRadius: 4,
    },
    txt_takeID: {
        fontSize: 16,
        color: colorApp.white,
        fontWeight: "600"
    },
    lineMid: {
        width: settingApp.width,
        height: 40
    }
})