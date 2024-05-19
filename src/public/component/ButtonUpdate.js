import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorApp from "public/colorApp";
import settingApp from "public/settingApp";
import lang from "public/locate";

export default function Buttonupdate({
    onPress,
    style,
    styleText,
    lable,
    isDisable,
}) {
    lable = lable || lang.update;

    const [isActiveBT, setActiveBT] = useState(false);

    useEffect(() => {
        setActiveBT(isDisable)
    }, [isDisable]);

    return (
        <View
            style={[
                styles.view_bt_update,
                {
                    opacity: isDisable ? 0.3 : 1,
                },
            ]}
        >
            <TouchableOpacity
                disabled={isDisable}
                onPress={onPress}
                style={[styles.view_Add, { ...style }]}
            >
                <Text style={[styles.txt_save, { ...styleText }]}>{lable}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    view_Add: {
        minWidth: settingApp.width / 2,
        maxWidth: settingApp.width_32,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: colorApp.blue_primary,
        borderRadius: 16,
        ...settingApp.shadow_Item,
    },
    txt_save: {
        fontSize: settingApp.size_22,
        fontWeight: "600",
        color: colorApp.white,
    },
    view_bt_update: {
        width: settingApp.width,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 32,
        backgroundColor: "transparent",
    },
});
