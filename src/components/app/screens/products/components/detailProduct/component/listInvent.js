import { Icon, colorApp, settingApp } from 'public';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListInvent(props) {
    const { listInvent, units } = props

    function renderInventItem(item) {
        return (
            <View style={styles.item_ivent}>
                <Text style={styles.txt_name_store}>{item?.name}</Text>


                <View style={styles.view_amount}>
                    <Text style={styles.txt_amount}>{"Còn: "}</Text>

                    <Text style={styles.txt_number_amount}>{item?.amount}</Text>
                    <Text style={styles.txt_units}>{` ${units}`}</Text>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <View style={styles.view_store}>
                <Icon.icon_Store size={40} color={colorApp.black_opacity_05} />
                <Text style={styles.txt_store}>{"Đang có hàng tại"}</Text>
            </View>
            {listInvent?.length != 0 && listInvent.map((item, index) => {
                return <View key={index}>
                    {renderInventItem(item)}
                </View>
            })}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        marginTop: 8
    },
    item_ivent: {
        width: settingApp.width,
        minHeight: 60,
        backgroundColor: colorApp.white,
        marginBottom: 8,
        padding: settingApp.space_16,
    },
    txt_name_store: {
        fontSize: 18,
        color: colorApp.green_primary,
        maxWidth: settingApp.width_32 - 80,
        flexWrap: "wrap",
        fontWeight: "600"
    },
    view_amount: {
        width: settingApp.width_32,
        height: 30,
        flexDirection: "row",
        alignItems: "baseline",
        paddingTop: 8
    },
    txt_number_amount: {
        fontSize: 18,
        color: colorApp.colorText,
        fontWeight: "bold"
    },
    txt_amount: {
        fontSize: 14,
        color: colorApp.colorPlaceText
    },
    txt_units: {
        fontSize: 16,
        color: colorApp.green_base
    },
    view_store: {
        width: settingApp.width,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: settingApp.space_16
    },
    txt_store: {
        fontSize: 18,
        color: colorApp.black_opacity_05,
        fontWeight: "bold", marginLeft: 8
    }
})