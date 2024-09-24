import { colorApp, Icon, settingApp } from 'public';
import { AvatarCustom } from 'public/component';
import CONSTANTS from 'public/CONSTANTS';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const defaultValue = {
    colorBackground: colorApp.transparent,
    colorText: colorApp.colorText
}

export default function DetailCheckin(props) {
    const { dataCheckin } = props
    const [data, setDataCheckin] = useState(dataCheckin)

    useEffect(() => {
        if (dataCheckin?.date !== data?.date) {
            console.log('dataaaaaaa', dataCheckin)
            setDataCheckin(dataCheckin)
        }
    }, [dataCheckin])

    function renderInfor() {
        return (
            <View style={styles.container}>
                <View style={[styles.lineStatus, { backgroundColor: data?.colorBackground ? data?.colorBackground : colorApp.disable }]} />

                <View style={styles.infoUser}>
                    <AvatarCustom
                        size={24}
                        name={data?.user?.name}
                        fontSize={12}
                    />
                    <View>
                        <Text style={{
                            fontSize: 18,
                            color: colorApp.colorText,
                            marginLeft: 8
                        }}>{data?.user?.name}</Text>
                    </View>
                </View>

                <View style={styles.infoUser}>
                    <View style={styles.viewIcon}>
                        <Icon.icon_Store size={24} />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        color: colorApp.colorText,
                        marginLeft: 8
                    }}>{data?.user?.store?.name}</Text>
                </View>

                <View style={styles.infoUser}>
                    <View style={styles.viewIcon}>
                        <FontAwesome5
                            name="calendar-check"
                            color={colorApp.black}
                            size={18}
                        />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        color: colorApp.colorText,
                        marginLeft: 8
                    }}>{data?.time_show}</Text>
                </View>

                <View style={styles.infoUser}>
                    <View style={styles.viewIcon}>
                        <MaterialIcons
                            name="access-alarm"
                            color={colorApp.black}
                            size={22}
                        />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        color: colorApp.colorText,
                        marginLeft: 8
                    }}>{data?.name}</Text>
                </View>
            </View>
        )
    }
    let timeSplit= data?.time_show.split(' ')[0]
    return (
        <>
            {data?.value !== CONSTANTS.NON_CHECKIN ?
                renderInfor()
                :
                <View style={styles.container}>
                 <View style={[styles.lineStatus, { backgroundColor: colorApp.disable, height:60 }]} />
                    <View style={{
                        marginLeft:12
                    }}>
                        <Text style={[styles.textInfo, {marginLeft:12}]}>{"Bạn chưa chấm công cho ngày này"}</Text>
                        <View style={styles.viewNonCheckin}>
                            <View style={styles.viewIcon}>
                                <FontAwesome5
                                    name="calendar-check"
                                    color={colorApp.black}
                                    size={18}
                                />
                            </View>
                            <Text style={styles.textInfo}>{timeSplit}</Text>
                        </View>
                    </View>
                </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width_32,
        minHeight: 50,
        marginTop: 24,
    },
    infoUser: {
        width: settingApp.width_32,
        height: 30,
        borderRadius: 12,
        backgroundColor: colorApp.white,
        paddingLeft: 12,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 12,
    },
    viewIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colorApp.white_snow,
        justifyContent: "center",
        alignItems: "center"
    },
    lineStatus: {
        height: settingApp.height * 0.2,
        position: "absolute",
        width: 5,
        zIndex: 2
    },
    textInfo: {
        fontSize: 18,
        color: colorApp.colorText,
    },
    viewNonCheckin:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:12
    }
})